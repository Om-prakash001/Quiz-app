import express from 'express';
import {startHandler, saveAnswerHandler, submitHandler, getSessionHandler, getResultHandler, getReviewHandler,  getLeaderboardHandler} from "../controllers/quiz.controller.js"
import { authMiddleware} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/start',authMiddleware,  startHandler);
router.post('/save-answer', authMiddleware, saveAnswerHandler);
router.post('/submit', authMiddleware, submitHandler);

router.get('/session/:id', authMiddleware, getSessionHandler);

router.get('/result/:sessionId', authMiddleware, getResultHandler);

router.get('/review/:sessionId', authMiddleware, getReviewHandler);
router.get('/leaderboard/top', authMiddleware, getLeaderboardHandler);

export default router;

