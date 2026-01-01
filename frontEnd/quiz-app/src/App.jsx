import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import QuizPage from "./pages/QuizPage";
import QuizQuestionPage from "./pages/QuizQuestionPage";
import QuizResultPage from "./pages/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import LeaderboardPage from "./pages/LeaderboardPage";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Routes WITH Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>

        {/* Auth pages (no navbar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Quiz pages (navbar hidden automatically) */}
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:sessionId"
          element={
            <ProtectedRoute>
              <QuizQuestionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:sessionId/result"
          element={
            <ProtectedRoute>
              <QuizResultPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:sessionId/review"
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

    </div>
  );
}
