import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Passinput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="flex items-center mb-4 border border-purple-600 rounded-xl px-4 bg-transparent">

      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 text-yellow-100 placeholder-yellow-400 outline-none"
      />
      {isShowPassword ? (
        <EyeOff
          size={20}
          className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
          onClick={() => setIsShowPassword(false)}
        />
      ) : (
        <Eye
          size={20}
          className="text-yellow-300 hover:text-yellow-400 cursor-pointer"
          onClick={() => setIsShowPassword(true)}
        />
      )}
    </div>
  );
};

export default Passinput;
