import express from "express";
import { registerUser } from "../controllers/authController.js"; // Import the registration handler

const router = express.Router();

// Define the registration route
router.post("/register", registerUser);

export default router;
