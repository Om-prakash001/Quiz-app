import { create } from "zustand";
import axios from "../lib/axios";

export const useQuizStore = create((set, get) => ({
  sessionId: null,
  questions: [],
  answers: [], // [{ questionId, selectedOption }]
  currentIndex: 0,
  timeLeft: 0,
  loading: false,
  submitted: false,
  score: 0,
  totalQuestions: 0,
  correctAnswers: [], // [{ id, correctAnswer }]

  /* START QUIZ */
  startQuiz: async (category, duration = 300) => {
    set({ loading: true });

    try {
      const res = await axios.post("/quiz/start", { category, duration });

      if (!res.data?.sessionId) throw new Error("Invalid start quiz response");

      set({
        sessionId: res.data.sessionId,
        questions: res.data.questions || [],
        answers: [],
        currentIndex: 0,
        timeLeft: duration,
        submitted: false,
        score: 0,
        totalQuestions: 0,
        correctAnswers: [],
        loading: false,
      });

      return res.data.sessionId;
    } catch (error) {
      console.error("Failed to start quiz", error);
      set({ loading: false });
      return null;
    }
  },

  /* RESTORE SESSION */
  setSession: (data) => {
    if (!data?.sessionId) return;
    set({
      sessionId: data.sessionId,
      questions: data.questions || [],
      answers: data.answers || [],
      currentIndex: data.currentIndex || 0,
      timeLeft: data.timeLeft ?? 0,
      submitted: data.submitted || false,
      score: data.score || 0,
      totalQuestions: data.totalQuestions || 0,
      correctAnswers: data.correctAnswers || [],
      loading: false,
    });
  },

  /* SAVE ANSWER */
  saveAnswer: async (questionId, selectedOption) => {
    const { sessionId, answers } = get();
    if (!sessionId) return;

    // update local state 
    const updatedAnswers = [...answers];
    const index = updatedAnswers.findIndex(
      (a) => String(a.questionId) === String(questionId)
    );
    if (index !== -1) updatedAnswers[index].selectedOption = selectedOption;
    else updatedAnswers.push({ questionId, selectedOption });

    set({ answers: updatedAnswers });


    try {
      await axios.post("/quiz/save-answer", {
        sessionId,
        questionId,
        selectedOption,
      });
    } catch (err) {
      console.error("Failed to save answer:", err.response?.data || err.message);
    }
  },

  /* NAVIGATION */
  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) set({ currentIndex: currentIndex + 1 });
  },
  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) set({ currentIndex: currentIndex - 1 });
  },
  goToQuestion: (index) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) set({ currentIndex: index });
  },

  /* TIMER */
  tick: async () => {
    const { timeLeft } = get();
    if (timeLeft > 0) set({ timeLeft: timeLeft - 1 });
    else if (!get().submitted) await get().submitQuiz(); // auto-submit when time is up
  },

  /* SUBMIT QUIZ */
  submitQuiz: async () => {
    const { sessionId } = get();
    if (!sessionId) return;

    try {
      const res = await axios.post("/quiz/submit", { sessionId });

      set({
        submitted: true,
        score: res.data.score,
        totalQuestions: res.data.totalQuestions,
        correctAnswers: res.data.questions.map((q) => ({
          id: q._id,
          correctAnswer: q.correctAnswer,
        })),
      });
    } catch (error) {
      console.error("Quiz submission failed:", error.response?.data || error.message);
      throw error;
    }
  },

  /* RESET QUIZ */
  resetQuiz: () => {
    set({
      sessionId: null,
      questions: [],
      answers: [],
      currentIndex: 0,
      timeLeft: 0,
      submitted: false,
      score: 0,
      totalQuestions: 0,
      correctAnswers: [],
      loading: false,
    });
  },

  /* FETCH ONGOING SESSION */
  fetchSession: async (sessionId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/quiz/session/${sessionId}`);
      const data = res.data;
      set({
        sessionId: data.sessionId,
        questions: data.questions,
        answers: data.answers || [],
        timeLeft: data.duration ?? 0,
        submitted: data.isCompleted,
        score: data.isCompleted ? data.answers.filter((a, i) => {
          return a.selectedOption === data.questions[i].correctAnswer;
        }).length : 0,
        totalQuestions: data.questions.length,
        correctAnswers: data.isCompleted
          ? data.questions.map((q) => ({ id: q._id, correctAnswer: q.correctAnswer }))
          : [],
        currentIndex: 0,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch session:", err.response?.data || err.message);
      set({ loading: false });
    }
  },
}));
