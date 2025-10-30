import React, { useState, useEffect } from "react";
import { BookOpen, Brain, FileText, Upload, CheckCircle, XCircle, Sparkles, ChevronRight, RotateCcw, ArrowLeft, Terminal, Cpu, Code } from "lucide-react";
import TerminalBox from "./components/TerminalBox.jsx";
import TerminalButton from "./components/TerminalButton.jsx";
import { THEMES } from "./utils/theme";
import DashboardView from "./views/DashboardView.jsx";
import ProcessingView from "./views/ProcessingView.jsx";
import UploadView from "./views/UploadView.jsx";

export default function App() {
  const [view, setView] = useState("upload"); // 'upload', 'processing', 'dashboard'
  const [inputText, setInputText] = useState("");

  const [currentTheme, setCurrentTheme] = useState("red");
  const theme = THEMES[currentTheme]; // Helper object for current theme

  // Data States
  const [summaryPoints, setSummaryPoints] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Quiz Logic States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Demo content
  const demoText = `
The Mitochondria is often referred to as the "powerhouse of the cell". It is a double-membrane-bound organelle found in most eukaryotic organisms. Some cells in some multicellular organisms may lack mitochondria (for example, mature mammalian red blood cells).

The outer membrane describes the organelle's surface, while the inner membrane contains folds called cristae. These folds increase the surface area available for chemical reactions.

The primary function of mitochondria is to generate large quantities of energy in the form of adenosine triphosphate (ATP). In addition to supplying cellular energy, mitochondria are involved in other tasks, such as signaling, cellular differentiation, and cell death, as well as maintaining the control of the cell cycle and cell growth.
  `;

  const handleFileUpload = () => {
    // Simulate file reading
    setInputText(demoText.trim());
  };

  const generateMaterial = async () => {
    if (!inputText) return;

    setView("processing");

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update state with Real AI data
      setSummaryPoints(data.summary);
      setQuizQuestions(data.quiz);

      // Reset quiz state
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizCompleted(false);
      setSelectedAnswer(null);
      setIsCorrect(null);

      setView("dashboard");
    } catch (error) {
      console.error("Error generating study material:", error);
      alert("Something went wrong! Please ensure the server is running.");
      setView("upload"); // Go back to upload on error
    }
  };

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return; // Prevent changing answer

    setSelectedAnswer(index);
    const correct = index === quizQuestions[currentQuestionIndex].correct;
    setIsCorrect(correct);

    if (correct) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const resetApp = () => {
    setView("upload");
    setInputText("");
    setSummaryPoints([]);
    setQuizQuestions([]);
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-black font-mono text-green-500 selection:bg-green-500 selection:text-black overflow-x-hidden">
      {/* Background Grid Effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 50, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 50, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>

      <div className="relative z-10">
        {view === "upload" && <UploadView inputText={inputText} setInputText={setInputText} onUploadDemo={handleFileUpload} onGenerate={generateMaterial} />}

        {view === "processing" && <ProcessingView />}

        {view === "dashboard" && (
          <DashboardView
            inputText={inputText}
            summaryPoints={summaryPoints}
            quizQuestions={quizQuestions}
            currentQuestionIndex={currentQuestionIndex}
            score={score}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            quizCompleted={quizCompleted}
            onAnswerClick={handleAnswerClick}
            onNextQuestion={nextQuestion}
            onResetQuiz={resetQuiz}
            onResetApp={resetApp}
          />
        )}
      </div>
    </div>
  );
}
