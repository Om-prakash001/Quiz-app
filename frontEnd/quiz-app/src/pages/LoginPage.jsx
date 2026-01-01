import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../lib/axios.js";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/auth/login", formData);
      await checkAuth();
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#0e6363]/90 to-[#ECF4F4]">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl
        rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#015055] p-6 text-center">
          <h1 className="text-2xl font-bold text-white">QuizMaster</h1>
          <p className="text-sm text-[#E1F396] mt-1">
            Learn • Play • Compete
          </p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-[#015055]">
            Welcome back
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Login to continue your quiz journey
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="font-medium text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 mt-1.5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border pl-10 px-4 py-3 mt-2
                    focus:outline-none focus:ring-2 focus:ring-[#015055]/40"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-medium text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 mt-1" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border pl-10 px-4 py-3 mt-2
                    focus:outline-none focus:ring-2 focus:ring-[#015055]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#015055] py-3 text-white
                font-semibold hover:opacity-95 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-[#015055]">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
