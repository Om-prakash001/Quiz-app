import { create } from "zustand";
import axios from "../lib/axios";

export const useLeaderboardStore = create((set) => ({
  // State
  leaderboard: [],
  loading: false,
  error: null,

  fetchLeaderboard: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/quiz/leaderboard/top");
      set({ leaderboard: res.data || [], loading: false });
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      set({ error: err.message || "Failed to fetch leaderboard", loading: false });
    }
  },
}));
