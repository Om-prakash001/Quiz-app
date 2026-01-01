import { useNavigate } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import { RxLapTimer } from "react-icons/rx";
import { IoTrophy, IoRocketSharp } from "react-icons/io5";

export default function HomePage() {
  const navigate = useNavigate();

  // Features array can be extended easily
  const features = [
    {
      icon: <GiBrain size={28} />,
      title: "Smart Questions",
      desc: "Hand-picked questions to test real understanding",
    },
    {
      icon: <RxLapTimer size={28} />,
      title: "Timed Quiz",
      desc: "Beat the clock and sharpen your speed",
    },
    {
      icon: <IoTrophy size={28} />,
      title: "Leaderboard",
      desc: "Compete with others and rank at the top",
    },
  ];

  // Centralized CTA handler
  const handleNavigate = (path) => {
    if (!path) return;
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e6363]/90 to-[#ECF4F4] flex items-start justify-center px-4 pt-10 ">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-sm max-w-5xl w-full p-10 md:p-10 overflow-hidden">

        {/* Hero */}
        <div className="text-center mb-8 sm:mb-8 md:mb-10">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full bg-[#E1F396] text-[#015055]">
            <span className="inline-flex items-center gap-2">
              <IoRocketSharp className="w-4 h-4" />
              Learn • Compete • Win
            </span>
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#015055] mb-4 tracking-tight leading-tight">
            Ultimate Quiz Challenge
          </h1>

          <p className="text-[#222222]/70 text-lg max-w-2xl mx-auto">
            Test your knowledge, race against time, and climb the leaderboard.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 sm:mb-8 md:mb-10">
          {features.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl border border-[#015055]/10 p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mx-auto mb-5 h-14 w-14 flex items-center justify-center rounded-full bg-[#E1F396] text-[#015055] text-2xl group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg text-[#222222] mb-2">{item.title}</h3>
              <p className="text-[#222222]/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-4 sm:mt-6">
          <button
            onClick={() => handleNavigate("/quiz")}
            className="inline-flex items-center justify-center bg-[#015055] hover:scale-105 hover:opacity-95 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
          >
            Go to Quiz
          </button>
        </div>

      </div>
    </div>
  );
}
