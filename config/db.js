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
    port: process.env.DB_PORT || 3306, // Default to port 3306
  }
);

export default sequelize;
