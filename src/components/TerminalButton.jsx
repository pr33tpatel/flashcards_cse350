import React from "react";

const TerminalButton = ({ onClick, disabled, children, primary }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 font-mono text-sm tracking-wider uppercase transition-all duration-150 relative group w-full
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"}
        ${
          primary
            ? "bg-green-600 text-black font-bold border-2 border-green-400 hover:bg-green-500 hover:shadow-[4px_4px_0px_0px_rgba(0,255,0,0.2)]"
            : "bg-black text-green-500 border-2 border-green-700 hover:border-green-400 hover:text-green-400 hover:shadow-[4px_4px_0px_0px_rgba(0,100,0,0.5)]"
        }
      `}
    >
      <div className="flex items-center gap-2 justify-center">{children}</div>
    </button>
  );
};

export default TerminalButton;
