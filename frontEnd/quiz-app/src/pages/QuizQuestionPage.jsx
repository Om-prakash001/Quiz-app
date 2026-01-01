import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/useQuizStore.js";
import QuizQuestionHint from "../components/QuizQuestionHint";
import Navbar from "../components/Navbar.jsx";
import axios from "../lib/axios.js";

export default function QuizQuestionPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const {
    questions,
    currentIndex,
    answers,
    loading,
    timeLeft,
    setSession,
    saveAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    tick,
    submitQuiz,
    resetQuiz,
  } = useQuizStore();

  const currentQuestion = questions[currentIndex];
  const [error, setError] = useState(null);

  const getSelectedOption = (questionId) => {
    const answer = answers.find(a => String(a.questionId) === String(questionId));
    return answer?.selectedOption ?? null;
  };

  const isAnswered = (questionId) =>
    answers.some(a => String(a.questionId) === String(questionId) && a.selectedOption !== null);

  /*  RESTORE SESSION */
  useEffect(() => {
    const restore = async () => {
      if (!sessionId) {
        navigate("/quiz");
        return;
      }
      try {
        const res = await axios.get(`/quiz/session/${sessionId}`);
        if (!res?.data?.sessionId) {
          resetQuiz();
          navigate("/quiz");
          return;
        }

        setSession({
          sessionId: res.data.sessionId,
          questions: res.data.questions,
          answers: res.data.answers,
          currentIndex: 0,
          timeLeft: res.data.duration,
        });
      } catch (err) {
        console.error("Restore session failed:", err.message);
        resetQuiz();
        navigate("/quiz");
      }
    };
    restore();
  }, [sessionId, navigate, resetQuiz, setSession]);

  /* TIMER */
  useEffect(() => {
    if (!questions.length) return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [questions.length, tick]);

  useEffect(() => {
    if (timeLeft === 0 && sessionId) {
      // Auto-submit
      submitQuiz()
        .then(() => navigate(`/quiz/${sessionId}/result`))
        .catch(err => setError(err.message || "Failed to submit quiz"));
    }
  }, [timeLeft, submitQuiz, navigate, sessionId]);

  const handleSelect = (optionIndex) => {
    if (!currentQuestion) return;
    saveAnswer(currentQuestion._id, optionIndex);
  };

  const handleSubmit = async () => {
    try {
      await submitQuiz();
      navigate(`/quiz/${sessionId}/result`);
    } catch (err) {
      setError(err.message || "Failed to submit quiz");
    }
  };

  /*  LOADING & ERROR */
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading quiz...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-600 text-lg font-semibold mb-4">{error}</p>
        <button
          onClick={() => navigate("/quiz")}
          className="px-6 py-3 bg-[#015055] text-white rounded-xl font-semibold hover:opacity-90 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">No questions available.</div>;
  }

  /* PROGRESS */
  const attemptedCount = questions.filter(q => isAnswered(q._id)).length;
  const progressPercent = Math.round((attemptedCount / questions.length) * 100);
  const hasAnsweredCurrent = getSelectedOption(currentQuestion._id) !== null;

  /* RENDER  */
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0e6363]/90 to-[#ECF4F4] flex items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-4">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-500">
              Q {currentIndex + 1} / {questions.length}
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#015055] text-white text-sm font-semibold">
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>

          {/* Progress */}
          <div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#015055] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-xs text-gray-500 text-right mt-1">{attemptedCount} / {questions.length} answered</p>
          </div>

          {/* Question */}
          <h1 className="text-xl font-bold text-gray-800">{currentQuestion.questionText}</h1>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const selected = getSelectedOption(currentQuestion._id) === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border font-medium transition-all ${selected ? "border-[#015055] bg-[#e6f3f3]" : "border-gray-200 hover:border-[#015055]"}`}
                >
                  <span className="mr-2 font-bold text-[#015055]">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Question Panel */}
          <div className="flex flex-wrap gap-2 justify-center">
            {questions.map((q, idx) => (
              <button
                key={q._id}
                onClick={() => goToQuestion(idx)}
                className={`w-8 h-8 rounded-full text-xs font-bold ${idx === currentIndex ? "bg-[#E1F396] text-white" : isAnswered(q._id) ? "bg-[#015055] text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="px-6 py-2 border rounded-xl disabled:opacity-40"
            >
              Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-[#015055] text-white rounded-xl font-bold"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={!hasAnsweredCurrent}
                className="px-8 py-2 bg-[#015055] text-white rounded-xl font-bold disabled:opacity-40"
              >
                Next
              </button>
            )}
          </div>
        </div>

        <QuizQuestionHint question={currentQuestion} />
      </div>
    </>
  );
}
