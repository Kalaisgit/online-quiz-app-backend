import User from "../models/user.js"; // Import the User model

// User Registration Handler
export const registerUser = async (req, res) => {
  try {
    console.log(req.body); // Log request body to verify input
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await User.create({ username, password, role });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
