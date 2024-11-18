// controllers/quizController.js
import db from "../models/sequelize.js";

const { Quiz, Question } = db;

export const createQuizWithQuestions = async (req, res) => {
  try {
    const { title, description, duration, startDate, endDate, questions } =
      req.body;

    // Ensure userId is available from the decoded token (authMiddleware)
    const userId = req.user.userId; // This will be set by the authMiddleware

    if (
      !title ||
      !description ||
      !duration ||
      !startDate ||
      !endDate ||
      !Array.isArray(questions) || // Ensure questions is an array
      questions.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);

    // Validate date format
    if (isNaN(startDateParsed.getTime()) || isNaN(endDateParsed.getTime())) {
      return res.status(400).json({ message: "Invalid start or end date." });
    }

    // Create Quiz
    const quiz = await Quiz.create({
      title,
      description,
      duration,
      startDate: startDateParsed,
      endDate: endDateParsed,
      userId, // Get userId from authenticated user
    });

    // Create Questions
    for (const question of questions) {
      try {
        await Question.create({
          ...question,
          quizId: quiz.id, // Associate the question with the created quiz
        });
      } catch (err) {
        console.error("Error creating question:", err);
      }
    }

    res.status(201).json({
      message: "Quiz created successfully with questions",
      quiz: quiz.toJSON(), // Return the quiz object without sequelize metadata
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({
      message: "Error creating quiz with questions",
      error: error.message,
    });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    // Get all quizzes along with their associated questions
    const quizzes = await Quiz.findAll({
      include: [
        {
          model: Question,
          as: "questions", // Alias must match in the Quiz model association
        },
      ],
    });

    res.json({
      message: "Quizzes fetched successfully",
      quizzes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching quizzes",
      error: error.message,
    });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findByPk(quizId, {
      include: [
        {
          model: Question,
          as: "questions", // Alias must match in the Quiz model association
        },
      ],
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json({
      message: "Quiz fetched successfully",
      quiz,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching quiz",
      error: error.message,
    });
  }
};
