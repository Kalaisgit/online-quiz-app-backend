import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // Import auth routes
import sequelize from "./config/db.js";
import { authMiddleware } from "./middleware/authMiddleware.js"; // Adjust the import path

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows handling JSON requests

// Routes
app.use("/api/auth", authRoutes); // Set up the /api/auth routes for user authentication

// Example of a protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

const PORT = process.env.PORT || 5001; // Use a different port if 5001 is in use

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
