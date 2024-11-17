import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

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

console.log("Database Name:", process.env.DB_NAME);
console.log("Database User:", process.env.DB_USER);
console.log("Database Host:", process.env.DB_HOST);
console.log("Database Port:", process.env.DB_PORT);
console.log("App Port:", process.env.PORT);

export default sequelize;
