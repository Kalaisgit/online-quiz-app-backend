import sequelize from "../config/db.js"; // Import your Sequelize instance
import Quiz from "./quiz.js";
import Question from "./question.js";

// Initialize models
const models = {
  Quiz,
  Question,
};

// Register associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Export models and Sequelize instance
export default {
  ...models,
  sequelize, // Sequelize instance
};
