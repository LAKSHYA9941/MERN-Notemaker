import React from "react";
import Profile from "../cards/Profileinfo";
import { useNavigate } from "react-router-dom";
import Search from "../searchbar/searchbar";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Navbar = ({ userInfo, onSearchNote, darkMode, toggleDarkMode }) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <nav className="bg-primary dark:bg-night-black backdrop-blur-sm flex justify-between items-center shadow-xl dark:shadow-glow-white px-8 py-4 gap-8 transition-colors duration-300 w-full">
            {/* Logo / Brand */}
            <h2 className="text-3xl text-zinc-50 dark:text-night-ice drop-shadow-xl font-extrabold tracking-wide dark:drop-shadow-[0_0_8px_rgba(224,247,250,0.7)]">
                Note Maker
            </h2>

            {/* Searchbar - given more width and space */}
            <div className="flex-1 mx-10 max-w-lg">
                <Search
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
            </div>

            {/* Toggle & Profile - properly spaced */}
            <div className="flex items-center gap-6">
                <ToggleSwitch isDark={darkMode} onToggle={toggleDarkMode} />
                <Profile userInfo={userInfo} onLogout={onLogout} />
            </div>
        </nav>
    );
};

export default Navbar;
