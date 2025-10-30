import React, { useState } from "react";
import { ArrowLeft, ChevronRight, CheckCircle, XCircle, Brain, RotateCcw, BookOpen } from "lucide-react";
import TerminalBox from "../components/TerminalBox";
import TerminalButton from "../components/TerminalButton";

const DashboardView = ({ inputText, summaryPoints, quizQuestions, currentQuestionIndex, score, selectedAnswer, isCorrect, quizCompleted, onAnswerClick, onNextQuestion, onResetQuiz, onResetApp }) => {
  // We keep the "Tab" state inside the Dashboard, as the App doesn't need to know about it
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-mono">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8 border-b-2 border-green-900 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={onResetApp} className="text-green-700 hover:text-green-400 hover:underline transition-colors flex items-center gap-1 text-sm uppercase">
            <ArrowLeft className="w-4 h-4" />
            ../BACK
          </button>
          <div>
            <div className="text-green-800 text-xs uppercase tracking-wider">Current Directory</div>
            <h1 className="text-xl font-bold text-green-400"></h1>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-900"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-900"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="col-span-1 space-y-2">
          {["notes", "summary", "quiz"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-200 uppercase text-sm tracking-wider flex items-center justify-between group ${
                activeTab === tab ? "border-green-500 bg-green-900/20 text-green-400 pl-6" : "border-green-900 text-green-700 hover:text-green-500 hover:border-green-600 hover:pl-5"
              }`}
            >
              <span>{tab}</span>
              {activeTab === tab && <ChevronRight className="w-4 h-4 animate-pulse" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-3">
          <TerminalBox className="min-h-[500px]" title={`VIEWING: ${activeTab.toUpperCase()}`}>
            {activeTab === "notes" && (
              <div className="animate-in fade-in duration-300">
                <div className="prose prose-invert max-w-none text-green-300 leading-relaxed font-mono whitespace-pre-line text-sm">{inputText}</div>
              </div>
            )}

            {activeTab === "summary" && (
              <div className="animate-in fade-in duration-300">
                <div className="space-y-4">
                  {summaryPoints.map((point, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex-shrink-0 text-green-600 group-hover:text-green-400 transition-colors font-bold select-none">[{String(idx + 1).padStart(2, "0")}]</div>
                      <p className="text-green-300 group-hover:text-green-100 transition-colors text-sm leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "quiz" && (
              <div className="animate-in fade-in duration-300 max-w-2xl mx-auto">
                {!quizCompleted ? (
                  <>
                    <div className="flex justify-between items-end mb-8 border-b border-green-900 pb-4">
                      <div>
                        <span className="text-green-700 text-xs uppercase block mb-1">Question Sequence</span>
                        <span className="text-2xl text-green-400 font-bold">
                          {String(currentQuestionIndex + 1).padStart(2, "0")}
                          <span className="text-green-800 text-lg"> / {String(quizQuestions.length).padStart(2, "0")}</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-green-700 text-xs uppercase block mb-1">Current Score</span>
                        <span className="text-xl text-green-400 font-bold">{score * 100} PTS</span>
                      </div>
                    </div>

                    <h3 className="text-lg text-green-100 mb-8 leading-relaxed border-l-2 border-green-600 pl-4 py-2 bg-green-900/10">{quizQuestions[currentQuestionIndex].question}</h3>

                    <div className="space-y-3">
                      {quizQuestions[currentQuestionIndex].options.map((option, idx) => {
                        let btnClass = "w-full p-4 text-left border transition-all duration-200 flex justify-between items-center group relative overflow-hidden ";

                        if (selectedAnswer === null) {
                          btnClass += "border-green-900 hover:border-green-500 hover:bg-green-900/20 text-green-400";
                        } else if (selectedAnswer === idx) {
                          btnClass += isCorrect ? "border-green-500 bg-green-500 text-black font-bold" : "border-red-500 bg-red-900/50 text-red-500";
                        } else if (idx === quizQuestions[currentQuestionIndex].correct && selectedAnswer !== null) {
                          btnClass += "border-green-500 text-green-500 animate-pulse";
                        } else {
                          btnClass += "border-green-900/50 text-green-800 opacity-50";
                        }

                        return (
                          <button key={idx} onClick={() => onAnswerClick(idx)} disabled={selectedAnswer !== null} className={btnClass}>
                            <span className="flex items-center gap-3 relative z-10">
                              <span className="text-xs opacity-50 font-bold">[{String.fromCharCode(65 + idx)}]</span>
                              {option}
                            </span>

                            {selectedAnswer === null && <div className="absolute inset-0 bg-green-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>}

                            {selectedAnswer === idx && (isCorrect ? <CheckCircle className="w-5 h-5 relative z-10" /> : <XCircle className="w-5 h-5 relative z-10" />)}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="mt-8 flex justify-end">
                        <TerminalButton primary onClick={onNextQuestion}>
                          {currentQuestionIndex < quizQuestions.length - 1 ? "NEXT_SEQUENCE >>" : "FINALIZE_REPORT"}
                        </TerminalButton>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-block p-6 border-2 border-green-500 rounded-full mb-6 relative">
                      <Brain className="w-16 h-16 text-green-500" />
                      <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-green-400 mb-2 tracking-tight">ANALYSIS COMPLETE</h2>
                    <div className="text-green-700 mb-8 font-mono">
                      Final Accuracy: <span className="text-green-400 font-bold">{Math.round((score / quizQuestions.length) * 100)}%</span>
                    </div>

                    <div className="flex justify-center gap-4">
                      <TerminalButton onClick={onResetQuiz}>
                        <RotateCcw className="w-4 h-4" />
                        RETRY
                      </TerminalButton>
                      <TerminalButton primary onClick={() => setActiveTab("summary")}>
                        <BookOpen className="w-4 h-4" />
                        REVIEW_LOGS
                      </TerminalButton>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TerminalBox>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
