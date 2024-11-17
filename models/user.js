import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
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
  },
  {
    timestamps: false,
  }
);

// Hash password before saving a user
User.beforeCreate(async (user) => {
  if (user.changed("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

// Optional: Add a method to compare password during login
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default User;
