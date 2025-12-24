import { Check } from "lucide-react";
import React from "react";

const SaveAction = ({ onSave, disabled }) => {
  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm transition-all
        ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 active:scale-95"
        }
      `}
    >
      <span>Done</span>
      <Check size={16} />
    </button>
  );
};

export default SaveAction;
