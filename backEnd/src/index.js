import express from "express";
import authRoutes from "./routes/auth.route.js";
import quizRoutes from "./routes/quiz.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.error("Server stopped because DB connection failed.");
    process.exit(1);
  });
