import React from "react";
import { Initials } from "../../utils/helper";

const Profile = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-4 px-4 py-1 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg transition-all duration-500">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 dark:bg-sky-500 text-white dark:text-gray-100 rounded-full text-xl font-bold shadow-inner dark:shadow-[0_0_12px_rgba(100,200,255,0.4)] transition-all duration-500">
        {Initials(userInfo?.fullname)}
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {userInfo?.fullname}
        </p>
        <button
          onClick={onLogout}
          className="mt-1 text-xs text-blue-600 dark:text-sky-400 hover:underline hover:scale-105 transition-transform duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
