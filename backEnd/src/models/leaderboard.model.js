import mongoose from "mongoose";

const leaderBoardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    quizDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model("Leaderboard",  leaderBoardSchema)

export default Leaderboard;
