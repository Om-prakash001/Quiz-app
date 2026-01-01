import { FaBrain, FaLayerGroup, FaTrophy, FaChartLine } from "react-icons/fa";

export default function LeftAuthPanel() {
  return (
    <div
      className="hidden md:flex w-1/2 flex-col justify-center
      px-12 py-16 text-white
      bg-gradient-to-br from-[#015055] via-[#15484c] to-[#012f33] md:pl-12 lg:pl-20"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10">
        <FaBrain className="text-4xl text-[#E1F396]" />
        <h1 className="text-3xl font-extrabold tracking-tight">QuizMaster</h1>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold leading-snug mb-4">
        Test your knowledge.
        Compete with confidence.
      </h2>

      {/* Short Description */}
      <p className="text-white/80 text-md max-w-md mb-8">
        A clean, focused platform to practice quizzes, track progress, and sharpen your skills — all without distractions.
      </p>

      {/* Features List */}
      <ul className="space-y-3 text-white/90 text-md">
        <li className="flex items-center gap-3">
          <FaLayerGroup className="text-[#E1F396] text-base" />
          Organized topic-wise quizzes
        </li>
        <li className="flex items-center gap-3">
          <FaTrophy className="text-[#E1F396] text-base" />
          Real-time leaderboards
        </li>
        <li className="flex items-center gap-3">
          <FaChartLine className="text-[#E1F396] text-base" />
          Detailed performance insights
        </li>
      </ul>

      {/* Tagline */}
      <p className="text-[#E1F396] text-sm tracking-wide mt-12">
        Learn • Play • Compete
      </p>
    </div>
  );
}
