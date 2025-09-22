import React from "react";

const ProcessingView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] font-mono">
      <div className="w-64">
        <div className="mb-2 text-green-500 text-xs flex justify-between">
          <span>PROCESSING</span>
          <span>[busy]</span>
        </div>
        <div className="h-2 bg-green-900/30 w-full overflow-hidden border border-green-800">
          <div className="h-full bg-green-500 animate-[pulse_1s_ease-in-out_infinite] w-full origin-left"></div>
        </div>
        <div className="mt-4 space-y-1 text-xs text-green-600">
          <div className="animate-[fade-in_0.5s_ease-out_0.1s_both]">{">"} Parsing text buffer...</div>
          <div className="animate-[fade-in_0.5s_ease-out_0.8s_both]">{">"} Identifying key entities...</div>
          <div className="animate-[fade-in_0.5s_ease-out_1.5s_both]">{">"} Generating quiz vector matrix...</div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingView;
