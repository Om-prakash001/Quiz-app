import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";
import { useQuizStore } from "../store/useQuizStore";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrophy,
  FaEye,
  FaRedo,
} from "react-icons/fa";

import StatCard from "../components/StatCard.jsx";

export default function ResultPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const fetchResult = async () => {
      try {
        const res = await axios.get(`/quiz/result/${sessionId}`);
        setResult(res.data);
      } catch (err) {
        console.error("Result fetch failed:", err);
        navigate("/quiz", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading result...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Result not found
      </div>
    );
  }

  const { totalQuestions, score } = result;
  const accuracy = Math.round((score / totalQuestions) * 100);
  const wrong = totalQuestions - score;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e6363]/90 to-[#ECF4F4] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow p-8">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-10 text-[#015055]">
          Quiz Result
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            primary
            icon={<FaCheckCircle className="text-white" size={28} />}
            label="Score"
            value={`${score} / ${totalQuestions}`}
          />

          <StatCard
            icon={<FaEye className="text-[#015055]" size={28} />}
            label="Accuracy"
            value={`${accuracy}%`}
          />

          <StatCard
            icon={<FaTimesCircle className="text-red-500" size={28} />}
            label="Wrong"
            value={wrong}
          />
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-[#015055]/20 w-full" />

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate(`/quiz/${sessionId}/review`)}
            className="py-4 rounded-xl bg-[#015055]/90 text-white font-semibold hover:bg-[#015055]/80 transition"
          >
            Review Questions
          </button>

          <button
            onClick={() => navigate("/leaderboard")}
            className="py-4 rounded-xl border border-[#015055]/30 text-[#015055] font-semibold flex items-center justify-center gap-2 hover:bg-[#E1F396]/20 transition"
          >
            <FaTrophy size={20} />
            Leaderboard
          </button>

          <button
            onClick={() => {
              resetQuiz();
              navigate("/quiz");
            }}
            className="py-4 rounded-xl bg-[#E1F396]/70 text-[#015055] font-semibold flex items-center justify-center gap-2 hover:bg-[#E1F396]/90 transition"
          >
            <FaRedo size={20} />
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
