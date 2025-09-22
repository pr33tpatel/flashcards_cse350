import React from "react";

const TerminalBox = ({ title, children, className = "" }) => {
  return (
    <div className={`relative border-2 border-green-800 bg-black/50 ${className}`}>
      {title && <div className="absolute -top-3 left-4 px-2 bg-black border border-green-800 text-xs font-bold text-green-500 uppercase tracking-widest">{title}</div>}
      <div className="p-6">{children}</div>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500 -mt-0.5 -ml-0.5"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500 -mt-0.5 -mr-0.5"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500 -mb-0.5 -ml-0.5"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500 -mb-0.5 -mr-0.5"></div>
    </div>
  );
};

export default TerminalBox;
