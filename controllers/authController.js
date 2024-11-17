import User from "../models/user.js"; // Import the User model

// User Registration Handler
export const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if all fields are provided
    if (!username || !password || !role) {
      return res.status(400).json({
        message:
          "Please provide all required fields (username, password, role)",
      });
    }

    // Create new user, password will be hashed by the beforeCreate hook
    const newUser = await User.create({
      username,
      password, // The password will be automatically hashed by the beforeCreate hook in the model
      role,
    });

    // Return a success response with the newly created user (excluding password)
    const userResponse = { ...newUser.toJSON() };
    delete userResponse.password; // Don't send the password in the response

    res
      .status(201)
      .json({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
