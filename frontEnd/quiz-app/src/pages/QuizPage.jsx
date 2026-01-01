import { useState } from "react";
import { useQuizStore } from "../store/useQuizStore";
import { useNavigate } from "react-router-dom";
import { SiJavascript, SiReact, SiExpress, SiMongodb } from "react-icons/si";
import QuizInstructionPanel from "../components/QuizInstructionPanel.jsx";

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const startQuiz = useQuizStore((state) => state.startQuiz);
  const loading = useQuizStore((state) => state.loading);
  const navigate = useNavigate();

  const categories = [
    { name: "javascript", icon: <SiJavascript /> },
    { name: "react", icon: <SiReact /> },
    { name: "express", icon: <SiExpress /> },
    { name: "mongodb", icon: <SiMongodb /> },
  ];

  const handleStart = async () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    try {
      const sessionId = await startQuiz(selectedCategory, 300);
      if (!sessionId) {
        alert("No questions available for this category!");
        return;
      }
      navigate(`/quiz/${sessionId}`);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to start quiz.");
      console.error("Quiz start error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e6363]/90 to-[#ECF4F4] p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">

        {/* right Left: Quiz Instructions */}
        <div className="md:w-1/3 flex flex-col justify-start">
          <QuizInstructionPanel className="text-sm p-4" />
        </div>

        {/* left Right: Quiz Categories */}
        <div className="md:w-2/3 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-10 flex flex-col items-center space-y-10">
          
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-[#015055] mb-2">Choose Your Quiz</h1>
            <p className="text-gray-600 text-lg">Select a category and start your challenge</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`group flex items-center gap-5 p-6 rounded-2xl border transition-all duration-300
                  ${selectedCategory === cat.name
                    ? "border-[#015055] bg-[#E1F396]/70 shadow-lg scale-[1.03]"
                    : "border-gray-200 bg-white hover:shadow-md hover:-translate-y-1"
                  } w-full`}
              >
                <div
                  className={`h-14 w-14 flex items-center justify-center rounded-full text-3xl
                    ${selectedCategory === cat.name
                      ? "bg-[#015055] text-white"
                      : "bg-[#E1F396] text-[#015055]"
                    }`}
                >
                  {cat.icon}
                </div>
                <span className="text-xl font-semibold capitalize text-[#222222]">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleStart}
            disabled={loading}
            className="px-12 py-4 rounded-2xl text-lg font-semibold text-white bg-[#015055] hover:scale-105 hover:opacity-95 transition disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Starting Quiz..." : "Start Quiz"}
          </button>

        </div>
      </div>
    </div>
  );
}
