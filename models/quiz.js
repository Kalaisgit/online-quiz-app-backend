import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Quiz = sequelize.define(
  "Quiz",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
  },
  { timestamps: false }
);

// Associations
Quiz.associate = (models) => {
  Quiz.hasMany(models.Question, {
    foreignKey: "quizId",
    as: "questions", // Ensure the alias here is 'questions'
  });
};

export default Quiz;
