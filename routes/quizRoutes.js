// routes/quizRoutes.js
import express from "express";
import {
  createQuizWithQuestions,
  getAllQuizzes,
  getQuizById,
} from "../controllers/quizController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // Import auth middleware

const router = express.Router();

// Route to create a new quiz with questions - Protected with authMiddleware
router.post("/create", authMiddleware, createQuizWithQuestions);

// Route to get all quizzes (publicly accessible)
router.get("/", getAllQuizzes);

// Route to get a specific quiz by ID (publicly accessible)
router.get("/:id", getQuizById);

export default router;
