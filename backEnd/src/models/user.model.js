import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  totalScore: {
    type: Number,
    default: 0
  }
},
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;