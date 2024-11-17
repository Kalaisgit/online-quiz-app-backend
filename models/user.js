import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("teacher", "student"),
    allowNull: false,
  },
});

// Hash password before saving a user
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password with bcrypt
  user.password = hashedPassword; // Set the hashed password in the user instance
});

// Optional: Add a method to compare password during login
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare plaintext password with the stored hash
};

export default User;
