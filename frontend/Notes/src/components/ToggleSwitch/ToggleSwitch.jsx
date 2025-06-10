import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleSwitch = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-night-purple focus:ring-offset-2 ${isDark ? 'bg-[#a259f7]' : 'bg-[#35A29F]'}`}
    >
      <span
        className={`absolute left-2 text-yellow-400 text-sm transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
      >
        <FaSun size={14} />
      </span>
      <span
        className={`absolute right-2 text-yellow-400 text-sm transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      >
        <FaMoon size={14} />
      </span>
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-night-glass shadow-md transition-transform duration-300 ${isDark ? 'translate-x-8' : 'translate-x-1'}`}
      />
    </button>
  );
};

export default ToggleSwitch;
