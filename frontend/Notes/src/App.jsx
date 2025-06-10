import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-purple-900 to-black relative overflow-hidden font-sans text-yellow-100">

      {/* Floating glowing purple-yellow blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Watermark images with glowing effect */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="../src/assets/pen.png"
          alt="Pen Watermark"
          className="absolute right-[70%] top-[15%] w-[350px] opacity-40 transition-transform duration-1000 ease-in-out hover:scale-150 hover:rotate-[360deg] filter drop-shadow-[0_0_10px_yellow]"
        />
        <img
          src="../src/assets/notepad.png"
          alt="Notepad Watermark"
          className="absolute left-[70%] bottom-[10%] w-[500px] opacity-40 transition-transform duration-1000 ease-in-out hover:scale-150 hover:rotate-[360deg] filter drop-shadow-[0_0_10px_yellow]"
        />
      </div>

      {/* Main Card Content with glass & glow */}
      <div className="relative z-10 px-6 py-12 rounded-3xl backdrop-blur-md bg-white/10 border border-purple-300/20 shadow-2xl text-center max-w-xl hover:shadow-[0_0_30px_yellow] transition-all duration-500">

        <h1 className="text-5xl italic md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-purple-400 to-yellow-300 animate-fade-in drop-shadow-[0_0_15px_purple]">
          <span>Note Maker</span>
        </h1>

        <p className="mb-8 text-lg md:text-xl text-purple-200 font-semibold animate-fade-in animation-delay-200">
          Organize your thoughts with a touch of magic and glow.
        </p>

        <div className="space-y-4 animate-fade-in animation-delay-400">
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-3 bg-gradient-to-tr from-yellow-400 via-purple-500 to-yellow-400 text-slate-900 rounded-full hover:scale-110 hover:shadow-[0_0_30px_purple] transform transition-all duration-500 font-bold text-lg hover:bg-violet-800"
          >
            Get Started
          </button>
          <p className="text-sm text-purple-300 mt-4 font-bold">
            Join thousands of glowing minds 🌟
          </p>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 text-purple-200 text-sm z-10 font-semibold">
        <span>Best</span>
        <span>•</span>
        <span>Secure</span>
        <span>•</span>
        <span>Wordsmith</span>
      </div>
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Add effect to handle dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-night-black' : 'bg-highlight'}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
