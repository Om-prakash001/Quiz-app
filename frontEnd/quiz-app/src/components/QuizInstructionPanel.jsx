import { MdInfoOutline, MdOutlineAccessTime, MdCheckCircleOutline, MdWarningAmber, MdOutlineAssignment } from "react-icons/md";

export default function QuizInstructionPanel() {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 h-full">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MdInfoOutline className="text-blue-600" size={22} />
        <h2 className="text-xl font-semibold text-gray-800">
          Quiz Instructions
        </h2>
      </div>

      {/* Quiz Format */}
      <section className="mb-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <MdCheckCircleOutline size={16} className="text-green-600" />
          Quiz Format
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Multiple-choice questions only.</li>
          <li>• Four options per question.</li>
          <li>• Questions shown one at a time.</li>
        </ul>
      </section>

      {/* Time Rules */}
      <section className="mb-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <MdOutlineAccessTime size={16} className="text-orange-600" />
          Time Rules
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Countdown timer for each question.</li>
          <li>• Unanswered questions auto-submitted.</li>
        </ul>
      </section>

      {/* Important Rules */}
      <section className="mb-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <MdWarningAmber size={16} className="text-red-600" />
          Important
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Submitted answers cannot be changed.</li>
          <li>• Refreshing may submit current progress.</li>
        </ul>
      </section>

      {/* Evaluation / Scoring */}
      <section>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <MdOutlineAssignment size={16} className="text-purple-600" />
          Evaluation
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Each question = 1 mark.</li>
          <li>• No negative marking.</li>
          <li>• Score shown after submission.</li>
        </ul>
      </section>

    </div>
  );
}
