import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthStore();

  // Wait until auth check finishes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in
  return children;
}
