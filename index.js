import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // Import auth routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows handling JSON requests

// Routes
app.use("/api/auth", authRoutes); // Set up the /api/auth routes for user authentication

const PORT = process.env.PORT || 5001; // Use a different port if 5000 is in use

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
