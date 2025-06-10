require("dotenv").config();
const config = require("./config.json");

const mongoose = require("mongoose");
mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./models/user-model");
const Note = require("./models/notes-model");
const { authenticateToken } = require("./utilities");

const app = express();
const clientOrigin = "http://localhost:5173"

// Middleware setup
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json()); // For parsing JSON bodies

// Test route
app.get("/", (req, res) => {
  res.json({ data: "hellieo worlds" })
})

// Create Account API
app.post("/create-account", async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body);

  // Validations
  if (!fullname) return res.status(400).json({ error: true, message: "full name is required" });
  if (!email) return res.status(400).json({ error: true, message: "Email is required" });
  if (!password) return res.status(400).json({ error: true, message: "Password is required" });

  const isUser = await User.findOne({ email });
  if (isUser) return res.json({ error: true, message: "user already exists" });

  const user = new User({ fullname, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3d" });

  return res.json({ error: false, user, accessToken, message: "Registration was a success" });
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validations
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password) return res.status(400).json({ message: "Password is required" });

  const userInfo = await User.findOne({ email });

  if (!userInfo) return res.status(400).json({ message: "User not found" });

  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3d" });

    return res.json({ error: false, message: "Login successful!!", email, accessToken });
  } else {
    return res.status(400).json({ error: true, message: "invalid credentials" });
  }
});

// Get User API
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) return res.status(401).json({ error: true, message: "user not found" });

  return res.json({
    user: {
      fullname: isUser.fullname,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn
    },
    message: ""
  });
});

// Add Note API
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  // Validations
  if (!title) return res.status(400).json({ error: true, message: "Title is required" });
  if (!content) return res.status(400).json({ error: true, message: "Content is required" });

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id
    });
    await note.save();

    return res.json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "internal server error" });
  }
});

// Edit Note API (Fixed isPinned problem here!)
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags && typeof isPinned === "undefined") {
    return res.status(400).json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) return res.status(400).json({ error: true, message: "Note not found" });

    // Only update if fields are provided
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (typeof isPinned !== "undefined") note.isPinned = isPinned;

    await note.save();

    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "internal server problem" });
  }
});

// Get All Notes API (Pinned Notes sorted first)
app.get("/getall-notes/", authenticateToken, async (req, res) => {
  const user = req.user.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({ error: false, notes, message: "All notes fetched" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// Delete Note API
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({ error: false, message: "Note deleted!!!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});

// Update isPinned Only API (Fixed!)
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) return res.status(400).json({ error: true, message: "Note not found" });

    note.isPinned = typeof isPinned !== "undefined" ? isPinned : note.isPinned;

    await note.save();

    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "internal server problem" });
  }
});

// Search Notes API
app.get("/search-notes/", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: true, message: "Type the query" });

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } }
      ]
    });

    return res.json({ error: false, notes: matchingNotes, message: "Matching notes found" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));

module.exports = app;
