import { create } from "zustand";
import axios from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true, // app start

  //  Check auth on app refresh
  checkAuth: async () => {
    try {
      set({ loading: true})
      const res = await axios.get("/auth/me");
      set({ user: res.data, isAuthenticated: true, loading: false });
    } catch (err) {
      // not authenticated
      set({ user: null, isAuthenticated: false, loading: false });
      console.warn("User not authenticated:", err.response?.status);
    }
  },

  //  Signup
  signup: async (formData) => {
    set({ loading: true });
    try {
      await axios.post("/auth/signup", formData); 
      // fetch user after signup
      const res = await axios.get("/auth/me");
      set({
        user: res.data,
        isAuthenticated: true,
        loading: false,
      });
      return true;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  //  Login
  login: async (formData) => {
    set({ loading: true });
    try {
      await axios.post("/auth/login", formData); // cookie set
      // fetch user after login
      const res = await axios.get("/auth/me");
      set({
        user: res.data,
        isAuthenticated: true,
        loading: false,
      });
      return true;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  //  Logout
  logout: async () => {
    try {
      await axios.post("/auth/logout"); // clears cookie
    } catch (error) {
      console.log("Logout error", error);
    }
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  },
}));
