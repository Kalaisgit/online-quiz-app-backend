import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to check if the request has a valid JWT token
export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
