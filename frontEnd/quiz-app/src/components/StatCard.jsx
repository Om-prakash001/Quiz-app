// skeleton/StatCard.jsx
export default function StatCard({ icon, label, value, primary }) {
  return (
    <div
      className={`rounded-2xl p-6 text-center transition ${
        primary
          ? "bg-[#015055]/90 shadow-md"
          : "bg-[#E1F396]/20 border border-[#015055]/20 shadow-sm"
      }`}
    >
      <div
        className={`flex justify-center mb-3 w-14 h-14 items-center rounded-full ${
          primary ? "bg-[#E1F396]" : "bg-[#E1F396]/40"
        } mx-auto text-2xl`}
      >
        {icon}
      </div>
      <p className={`text-sm ${primary ? "text-white" : "text-[#015055]"}`}>
        {label}
      </p>
      <p
        className={`text-2xl font-bold ${
          primary ? "text-white" : "text-[#015055]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
