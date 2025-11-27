import React from "react";
import { Code, Cpu } from "lucide-react";
import TerminalBox from "../components/TerminalBox";
import TerminalButton from "../components/TerminalButton";
import AsciiArt from "../components/AsciiArt";

const UploadView = ({ inputText, setInputText, onUploadDemo, onGenerate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-in fade-in duration-700">
      <div className="w-full max-w-3xl">
        <div className="mb-12 font-mono">
          <div className="mt-3 transform hover:scale-110 transition-transform duration-300">
            <AsciiArt />
          </div>

          <div className="text-green-200 text-sm mb-2">System Status: ONLINE</div>
          <h1 className="text-5xl md:text-6xl font-black text-green-500 mb-2 tracking-tighter itmes-baseline gap-2">
            FlashCards
            <span className="animate-pulse">_</span>
          </h1>
          <p className="text-green-700 text-lg uppercase tracking-widest border-l-4 border-green-900 pl-4">AI-Powered Knowledge Extraction Protocol</p>
        </div>

        <TerminalBox title="INPUT_STREAM">
          <textarea
            className="w-full h-48 bg-black/50 border border-green-900 p-4 text-green-400 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 outline-none resize-none font-mono placeholder-green-900 text-sm leading-relaxed"
            placeholder="// Paste lecture notes ..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex-1">
              <TerminalButton onClick={onUploadDemo}>
                <Code className="w-4 h-4" />
                EXAMPLE_DATA.dat
              </TerminalButton>
            </div>
            <div className="flex-1">
              <TerminalButton primary onClick={onGenerate} disabled={!inputText}>
                <Cpu className="w-4 h-4" />
                EXECUTE_ANALYSIS
              </TerminalButton>
            </div>
          </div>
        </TerminalBox>

        {/* <div className="mt-4 text-center text-green-800 text-xs font-mono">v1.0.7 stable // waiting for input stream</div> */}
      </div>
      <div className="fixed bottom-3 left-0 w-full bg-black/50 text-green-800 text-center text-sm font-mono">
        <p>CSE 350 Final Project</p>
      </div>
    </div>
  );
};

export default UploadView;
