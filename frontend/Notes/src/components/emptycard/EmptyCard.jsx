import React from "react";

const EmptyCard = ({ imgsource, message, className = "" }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20 transition-colors duration-500">
            <img
                src={imgsource}
                alt="Add some Notes"
                className="w-60 transition-all duration-500 ease-in-out dark:blur-sx hover:scale-120 hover:rotate-[360deg] filter dark:drop-shadow-[0_0_40px_white]"
            />
            <p className={`w-4/5 sm:w-1/2 mt-5 text-center font-medium text-2xl text-gray-700 dark:text-gray-300 ${className}`}>
                {message}
            </p>
        </div>
    );
};

export default EmptyCard;
