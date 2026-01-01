import { useEffect } from "react";
import { useLeaderboardStore } from "../store/useLeaderboardStore";

export default function LeaderboardPage() {
  const { leaderboard: leaders, fetchLeaderboard, loading, error } = useLeaderboardStore();

  useEffect(() => {
    fetchLeaderboard(); // fetch leaderboard on mount
  }, [fetchLeaderboard]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Loading leaderboard...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-red-500 text-lg">
        {error}
      </p>
    );
  }

  if (!leaders.length) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        No leaderboard data yet!
      </p>
    );
  }

  // THEME COLORS
  const topColors = [
    "bg-[#E1F396]/70",
    "bg-[#E1F396]/40",
    "bg-[#E1F396]/30",
  ];

  const topEmojis = ["🏆", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a0c439]/30 to-[#ECF4F4] ">
      <div className="max-w-5xl mx-auto px-4 py-10 ">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#015055]">
          Leaderboard
        </h1>

        {/* MOBILE */}
        <div className="space-y-3 md:hidden">
          {leaders.map((user, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 shadow-md flex justify-between items-center transition transform hover:scale-105 ${
                idx < 3 ? topColors[idx] : "bg-white border border-[#015055]/20"
              }`}
            >
              <div className="flex items-center gap-3">
                {idx < 3 && <span className="text-xl">{topEmojis[idx]}</span>}
                <div>
                  <p className="text-sm text-[#015055]/70">
                    Rank #{idx + 1}
                  </p>
                  <p className="text-lg font-semibold text-[#015055]">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-[#015055]">
                  {user.score} / 20
                </p>
                <p className="text-xs text-[#015055]/60">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex flex-col gap-4">
          {leaders.map((user, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center p-4 rounded-xl shadow-md transition transform hover:scale-105 ${
                idx < 3 ? topColors[idx] : "bg-white border border-[#015055]/20"
              }`}
            >
              <div className="flex items-center gap-4">
                {idx < 3 && <span className="text-2xl">{topEmojis[idx]}</span>}
                <p className="font-semibold text-lg text-[#015055]">
                  {user.name}
                </p>
              </div>

              <div className="flex items-center gap-8">
                <p className="font-bold text-lg text-[#015055]">
                  #{idx + 1}
                </p>
                <p className="font-semibold text-[#015055]">
                  {user.score} / 20
                </p>
                <p className="text-[#015055]/60">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
