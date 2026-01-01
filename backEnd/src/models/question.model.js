import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },

  options: {
    type: [String], // array of 4 options
    required: true,
    validate: (v) => v.length === 4
  },

  correctAnswer: {
    type: Number, // index: 0, 1, 2, 3, 
    required: true,
    min: 0,
    max: 3
  },

  category: {
    type: String,
    default: "general"
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },
},
  { timestamps: true}
);

const Question = mongoose.model("Question", questionSchema);

export default Question;