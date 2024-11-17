import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js"; // Import the registration handler and login handler

const router = express.Router();

// Define the registration route
router.post("/register", registerUser);

router.post("/login", loginUser); // Login a user

export default router;
