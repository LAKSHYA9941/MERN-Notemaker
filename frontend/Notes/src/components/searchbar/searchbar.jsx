import React from "react";
import { IoCloseCircle } from "react-icons/io5"; // Close icon (for clear search)

const Search = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <form className="relative w-full max-w-sm">
            <input
                value={value}
                onChange={onChange}
                type="text"
                id="navbar-search"
                className="w-full py-2 pl-10 pr-8 text-sm text-black dark:text-white border border-gray-400 dark:border-gray-600 rounded-full bg-slate-100 dark:bg-night-glass focus:ring-accent focus:border-accent transition duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Search notes..."
                onKeyDown={handleSearch}
            />
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-600 dark:text-gray-300"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 19l-4-4m0-7a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            {/* Clear Icon */}
            {value && (
                <div
                    onClick={onClearSearch}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
                >
                    <IoCloseCircle size={20} />
                </div>
            )}
        </form>
    );
};

export default Search;
