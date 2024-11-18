import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Question = sequelize.define(
  "Question",
  {
    text: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    correctAnswer: { type: DataTypes.STRING, allowNull: false },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Quiz", key: "id" },
    },
  },
  { timestamps: false }
);

// Associations
Question.associate = (models) => {
  Question.belongsTo(models.Quiz, {
    foreignKey: "quizId",
    as: "quiz", // Optional, if you'd like to access Quiz from a question
  });
};

export default Question;
