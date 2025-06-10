import React from "react";
import { MdOutlinePushPin, MdDelete, MdCreate } from "react-icons/md";
import moment from "moment";

const Notecard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote, className = "" }) => {
  return (
    <div
      className={`relative border rounded-xl p-5 m-2 shadow-md hover:drop-shadow-2xl transition-all ease-in-out duration-300 transform hover:-translate-y-1
        bg-white dark:bg-night-black
        text-slate-900 dark:text-zinc-50
        border-accent dark:border-night-yellow        
        dark:hover:shadow-[0_0_25px_4px_rgba(255,255,150,0.5)]
        `} // Moving glow in dark mode
    >

      {/* Pin Icon */}
      <div
        className="group absolute top-4 right-4 cursor-pointer 
        p-2 bg-white dark:bg-night.glass rounded-full shadow-md 
        border border-slate-200 dark:border-night.purple
        dark:shadow-[0_0_8px_2px_rgba(0,191,255,0.6)]
        transition-all duration-300 hover:scale-105 hover:shadow-lg 
        dark:hover:shadow-[0_0_10px_2px_rgba(0,191,255,0.6)]"
        onClick={onPinNote}
        title="Pin Note"
      >
        <MdOutlinePushPin
          className={`w-6 h-6 dark:text-blue-300 transition-all duration-300
            ${isPinned
              ? 'text-yellow-500 dark:text-blue-700'
              : 'text-slate-300 dark:text-zinc-200 group-hover:text-cyan-600'}`}
        />
      </div>

      {/* Title & Date */}
      <div className="mb-2">
        <h6 className="font-semibold text-lg text-slate-800 dark:text-zinc-50 drop-shadow-[0_0_3px_rgba(255,255,200,0.8)]">
          {title}
        </h6>
        <span className="text-sm text-slate-500 dark:text-purple-200 dark:drop-shadow-[0_0_3px_rgba(180,100,255,0.8)]">
          {moment(date).format('Do MMM YYYY')}
        </span>
      </div>

      {/* Content */}
      <p className="text-sm text-slate-600 dark:text-zinc-50 mt-3 leading-relaxed drop-shadow-[0_0_2px_rgba(255,255,200,0.7)]">
        {content?.slice(0, 100)}{content?.length > 100 && '...'}
      </p>

      {/* Tags & Actions */}
      <div className="flex items-center justify-between mt-4">
        {/* Tags */}
        <div className="text-xs text-slate-400 dark:text-yellow-200 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-zinc-200 dark:bg-purple-700/30 rounded-full text-slate-500 dark:text-yellow-200 
              hover:bg-slate-200 dark:hover:bg-purple-700/60 transition dark:drop-shadow-[0_0_2px_rgba(255,215,0,0.6)]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 text-lg">
          {/* Edit */}
          <div
            className="group relative p-2 rounded-full bg-white dark:bg-night.glass shadow-inner hover:shadow-lg hover:scale-105 transition-all duration-300
            border border-slate-200 dark:border-purple-500 cursor-pointer
            dark:shadow-[0_0_10px_2px_rgba(0,255,0,0.4)]"
            title="Edit"
            onClick={onEdit}
          >
            <MdCreate className="w-6 h-6 text-slate-600 dark:text-green-300 group-hover:text-green-500 dark:drop-shadow-[0_0_5px_rgba(0,255,0,0.7)] transition-all duration-300" />
          </div>

          {/* Delete */}
          <div
            className="group relative p-2 rounded-full bg-white dark:bg-night.glass shadow-inner hover:shadow-lg hover:scale-105 transition-all duration-300
            border border-slate-200 dark:border-purple-500 cursor-pointer
            dark:shadow-[0_0_10px_2px_rgba(255,0,0,0.4)]"
            title="Delete"
            onClick={onDelete}
          >
            <MdDelete className="w-6 h-6 text-slate-600 dark:text-red-300 group-hover:text-red-500 dark:drop-shadow-[0_0_5px_rgba(255,0,0,0.7)] transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notecard;
