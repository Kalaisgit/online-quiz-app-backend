import { Sequelize } from "sequelize";

// Use environment variables for sensitive data
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Disable logging for cleaner output
  }
);

export default sequelize;
