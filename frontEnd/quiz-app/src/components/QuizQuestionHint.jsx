export default function QuizQuestionHint() {
  return (
    <div className="hidden md:flex flex-col fixed right-4 top-24 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-4 space-y-3 z-50">
      <h2 className="text-sm font-bold text-gray-800">Legend / Hints</h2>

      <div className="space-y-1 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#015055] rounded-full"></span> Attempted
        </div> 
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-gray-200 rounded-full border border-gray-300"></span> Not Attempted
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3
          bg-[#E1F396] rounded-full"></span> Current
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-2">
        Use this panel to see which questions you have attempted and navigate easily.
      </p>
    </div>
  );
}
