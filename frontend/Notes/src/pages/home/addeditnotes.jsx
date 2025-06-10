import React, { useState } from "react";
import InputTag from "../../components/input/inputTags";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInst";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes, showToastMessage }) => {
  const [title, seTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const AddNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Added !!!");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated...");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter your Content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      AddNewNote();
    }
  };

  return (
    <div className="relative bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-2xl mx-auto transition-all duration-500">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-2 rounded-full bg-gray-400 hover:bg-red-500 text-white transition-all hover:scale-110"
      >
        <MdClose className="text-xl" />
      </button>

      <h2 className="text-2xl font-bold mb-6 text-slate-700 dark:text-gray-200 text-center">
        {type === "edit" ? "Edit Note" : "Add New Note"}
      </h2>

      <div className="flex flex-col gap-3 mb-5">
        <label className="text-sm font-medium text-slate-600 dark:text-gray-300">TITLE</label>
        <input
          type="text"
          className="text-base text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          placeholder="Enter title"
          value={title}
          onChange={({ target }) => seTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <label className="text-sm font-medium text-slate-600 dark:text-gray-300">CONTENT</label>
        <textarea
          className="text-base text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          placeholder="Write your note here..."
          rows={8}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="text-sm font-medium text-slate-600 dark:text-gray-300">TAGS</label>
        <InputTag tags={tags} setTags={setTags} />
      </div>

      {error && (
        <p className="text-red-600 text-center text-sm font-medium mt-2 transition-all duration-300">
          {error}
        </p>
      )}

      <button
        onClick={handleAddNote}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
