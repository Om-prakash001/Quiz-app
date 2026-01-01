import mongoose from "mongoose";

const quizSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],

  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      selectedOption: {
        type: Number, // index of selected option like 0-3
        default: null,
      },
    },
  ],

  score: {
    type: Number,
    default: 0,
  },

  startedAt: {
    type: Date,
    default: Date.now,
  },

  endedAt: {
    type: Date,
    default: null,
  },

  duration:{
    type: Number, //in seconds : e.g, 300 seconds = 5 mins
    required: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  }
},
  {timestamps: true}
);

const QuizSession = mongoose.model("QuizSession", quizSessionSchema);

export default QuizSession;
