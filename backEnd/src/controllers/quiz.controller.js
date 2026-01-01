import QuizSession from "../models/quizSession.model.js";
import Question from "../models/question.model.js";
import Leaderboard from "../models/leaderboard.model.js";
import User from "../models/user.model.js";

// Start Quiz
export const startHandler = async (req, res) => {
  console.log("Authenticated user:", req.user);
  console.log("Request body:", req.body);
  try {
    const userId = req.user._id;
    const { duration = 300, category } = req.body; // default 5 minutes

    const query = category ? { category } : {};

    // get question based on category
    let questions = await Question.find(query).lean();

    if (!questions.length) {
      return res
        .status(404)
        .json({ message: "No questions available for this category" });
    }

    //function to shuffle array
    function shuffleArray(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

    // shuffle question order
    questions = shuffleArray(questions);

    // fetched _id field of all question
    const questionIds = questions.map((q) => q._id);

    // Remove correctOption before sending to frontend
    const sanitizedQuestions = questions.map(
      ({ correctAnswer, ...rest }) => rest
    );

    // create a quiz session
    const quizSession = await QuizSession.create({
      user: userId,
      questions: questionIds,
      duration,
      answers: questionIds.map((id) => ({
        questionId: id,
        selectedOption: null,
      })),
    });

    return res.status(201).json({
      message: "Quiz Started",
      sessionId: quizSession._id,
      questions: sanitizedQuestions,
    });
  } catch (error) {
    console.error("Start Quiz Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const saveAnswerHandler = async (req, res) => {
  try {
    const { sessionId, questionId, selectedOption } = req.body;

    const session = await QuizSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.isCompleted) {
      return res.status(400).json({ message: "quiz already submitted" });
    }

    const answerIndex = session.answers.findIndex(
      (a) => a.questionId.toString() === questionId
    );

    if (answerIndex === -1) {
      return res
        .status(400)
        .json({ message: "Question not found in session " });
    }
    session.answers[answerIndex].selectedOption = selectedOption;

    await session.save();

    return res.status(200).json({ message: "Answer saved sucessfully" });
  } catch (error) {
    console.error("Save Answer Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Submit Quiz
export const submitHandler = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await QuizSession.findById(sessionId).populate("questions");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.isCompleted) {
      return res.status(400).json({ message: "Quiz already submitted" });
    }

    // Calculate score
    let score = 0;
    const questionMap = {};
    session.questions.forEach((q) => {
      questionMap[q._id.toString()] = q;
    });

    session.answers.forEach((answer) => {
      const q = questionMap[answer.questionId.toString()];
      if (q && answer.selectedOption === q.correctAnswer) {
        score += 1;
      }
    });

    // Update session
    session.score = score;
    session.isCompleted = true;
    session.endedAt = new Date();
    await session.save();

    // Save / Update leaderboard
    // Optional: keep only highest score per user
    const existingEntry = await Leaderboard.findOne({ user: session.user });
    if (existingEntry) {
      if (score > existingEntry.score) {
        existingEntry.score = score;
        existingEntry.quizDate = new Date();
        await existingEntry.save();
      }
    } else {
      await Leaderboard.create({
        user: session.user,
        score,
      });
    }

    // Update user's totalScore (optional)
    await User.findByIdAndUpdate(session.user, {
      $inc: { totalScore: score },
    });

    // Return result + correct answers (for result page)
    return res.status(200).json({
      message: "Quiz Submitted",
      sessionId: session._id,
      score,
      totalQuestions: session.questions.length,
      questions: session.questions.map((q) => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer, // only after submit
      })),
      answers: session.answers,
    });
  } catch (error) {
    console.error("Submit Quiz Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getSessionHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await QuizSession
      .findById(id)
      .populate("questions")
      .lean();

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    let questions;

    if (session.isCompleted) {
      // AFTER SUBMIT → include correctAnswer
      questions = session.questions;
    } else {
      // BEFORE SUBMIT → hide correctAnswer
      questions = session.questions.map(({ correctAnswer, ...rest }) => rest);
    }

    return res.status(200).json({
      sessionId: session._id,
      questions,
      answers: session.answers,
      duration: session.duration,
      startedAt: session.createdAt,
      isCompleted: session.isCompleted,
    });
  } catch (error) {
    console.error("Get Session Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getResultHandler = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    const session = await QuizSession.findOne({
      _id: sessionId,
      user: userId,
    }).populate("questions");

    if (!session) {
      return res.status(404).json({ message: "Result not found" });
    }

    const totalQuestions = session.questions.length;

    let score = 0;
    session.answers.forEach((a) => {
      const q = session.questions.find(
        (q) => q._id.toString() === a.questionId.toString()
      );
      if (q && q.correctAnswer === a.selectedOption) {
        score++;
      }
    });

    res.status(200).json({
      totalQuestions,
      score,
    });
  } catch (err) {
    console.error("Result error:", err);
    res.status(500).json({ message: "Failed to load result" });
  }
};


export const getReviewHandler = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    const session = await QuizSession.findOne({
      _id: sessionId,
      user: userId,
    })
      .populate("questions")
      .lean();

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({
      questions: session.questions,
      answers: session.answers,
    });

  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({ message: "Failed to load review" });
  }
};



export const getLeaderboardHandler = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.aggregate([
      {
        $group: {
          _id: "$user",
          score: { $max: "$score" },
          createdAt: { $max: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          name: "$user.username",
          score: 1,
          createdAt: 1
        }
      },
      { $sort: { score: -1 } },
      { $limit: 3 }
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

