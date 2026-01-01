import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { useQuizStore } from "../store/useQuizStore";

import { FaCheckCircle, FaTimesCircle, FaEye, FaRedo, FaTrophy} from "react-icons/fa";

import StatCard from "../components/StatCard";

export default function ReviewPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      navigate("/quiz", { replace: true });
      return;
    }

    const fetchReview = async () => {
      try {
        const res = await axios.get(`/quiz/review/${sessionId}`);
        setQuestions(res.data.questions || []);
        setAnswers(res.data.answers || []);
      } catch (err) {
        console.error("Failed to fetch review:", err);
        navigate("/quiz", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading review...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No review data found
      </div>
    );
  }

  const totalQuestions = questions.length;

  const correct = answers.filter((ans) => {
    const q = questions.find((q) => String(q._id) === String(ans.questionId));
    return q && ans.selectedOption === q.correctAnswer;
  }).length;

  const wrong = totalQuestions - correct;
  const accuracy = Math.round((correct / totalQuestions) * 100);

  const getUserAnswerIndex = (questionId) => {
    const a = answers.find((ans) => String(ans.questionId) === String(questionId));
    return a?.selectedOption ?? null;
  };

  return (
    <div className="min-h-screen bg-[#E1F396]/10 px-4 py-10 flex flex-col items-center">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-10 text-[#015055]">
        Answer Review
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-4xl">
        <StatCard
          primary
          icon={<FaCheckCircle className="text-white" size={28} />}
          label="Correct"
          value={`${correct} / ${totalQuestions}`}
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
      <div className="my-6 h-px bg-[#015055]/20 w-full max-w-4xl" />

      {/* Questions */}
      <div className="w-full max-w-4xl space-y-4">
        {questions.map((q, idx) => {
          const userIndex = getUserAnswerIndex(q._id);
          const isCorrect = userIndex === q.correctAnswer;

          return (
            <div
              key={q._id}
              className="bg-white rounded-2xl shadow p-5 flex gap-4"
            >
              {isCorrect ? (
                <FaCheckCircle className="text-green-500 mt-1" />
              ) : (
                <FaTimesCircle className="text-red-500 mt-1" />
              )}

              <div>
                <p className="font-semibold text-[#015055]">
                  {idx + 1}. {q.questionText}
                </p>

                <p className="text-sm mt-2">
                  <span className="font-medium">Your Answer:</span>{" "}
                  <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                    {userIndex !== null
                      ? q.options[userIndex]
                      : "Not Answered"}
                  </span>
                </p>

                {!isCorrect && (
                  <p className="text-sm text-green-600 mt-1">
                    <span className="font-medium">Correct Answer:</span>{" "}
                    {q.options[q.correctAnswer]}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex gap-4 mt-10">
        {/* Restart */}
      <button
        onClick={() => {
          resetQuiz();
          navigate("/quiz");
        }}
        className="mt-10 px-6 py-3 rounded-xl bg-[#E1F396]/70 text-[#015055] font-semibold flex items-center gap-2 hover:bg-[#E1F396]/90 transition"
      >
        <FaRedo />
        Restart Quiz
      </button>
      {/* Leaderboard */}
      <button
        onClick={() => navigate("/leaderboard")}
        className="mt-10 px-6 py-3 rounded-xl bg-[#E1F396]/70 text-[#015055] font-semibold flex items-center gap-2 hover:bg-[#E1F396]/90 transition"
      >
        <FaTrophy />
        Leaderboard
      </button>
      <div/>
    </div>
  </div>
  );
}
