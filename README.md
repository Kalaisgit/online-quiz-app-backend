Step 1:
I have created 2 folders namely,
-> frontend
-> backend
and a README.md file.

Step 2:
cd into backend -> npm init -y ,
followed by installing the npm packages
npm express sequelize mysql2 jsonwebtoken bcrypt dotenv cors

Step 3:
For macOS:
In terminal,
Install via Homebrew

3.1->I have Homebrew installed, I installed MySQL by running the following commands in the
Terminal,

brew update
brew install mysql

3.2->Start MySQL:

Once the installation is complete, start the MySQL service with,
brew services start mysql

3.3->Secure MySQL Installation:

Run the security script to set the root password and remove insecure default settings,

mysql_secure_installation

3.4->Verify Installation:

Connect to MySQL with,

mysql -u root -p
Enter the root password when prompted to access the MySQL shell.(I have medium level complexity password setup)

Step 4:(in terminal, mysql> prompt)

4.1-> CREATE DATABASE quiz_app;
4.2-> SHOW DATABASES;

Step 5:

5.1-> After creating a database, we can switch to our db,
USE quiz_app;
5.2-> Create Table - Defining table and specify the structure,

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50),
password VARCHAR(255)
);

Step 6: EXIT;

Step 7:
Created folders and files inside backend folder,

mkdir config controllers models routes middleware

backend/
├── config/ # For DB connection and configuration
├── controllers/ # For controller files (auth, quiz)
├── models/ # For Sequelize models (user, question, answer, sequelize)
├── routes/ # For route files (auth, quiz)
├── middleware/ # For middleware files (auth validation)

cd config
touch db.js
cd ..
cd controllers
touch authController.js
touch quizController.js
cd ..
cd models
touch user.js question.js answer.js sequelize.js
cd ..
cd routes
touch authRoutes.js quizRoutes.js
cd ..
cd middleware
touch authMiddleware.js
cd ..

In backend folder -> touch .env index.js

Backend folder structure must look like this:
backend/
│
├── config/
│ └── db.js # Database connection and Sequelize setup
│
├── controllers/  
│ └── authController.js # Handles user registration, login, and JWT
│ └── quizController.js # Handles quiz-related logic (CRUD for questions, getting quizzes, etc.)
│
├── models/
│ ├── user.js # Sequelize model for the user table
│ ├── question.js # Sequelize model for the quiz question table
│ ├── answer.js # Sequelize model for the answers to the questions
│ └── sequelize.js # Sequelize initialization and model associations
│
├── routes/
│ ├── authRoutes.js # Routes for authentication (register, login)
│ └── quizRoutes.js # Routes for quiz CRUD operations (create, read, etc.)
│
├── middleware/
│ └── authMiddleware.js # Middleware to protect routes and verify JWTs
│
├── .env # Environment variables (DB credentials, JWT secret)
├── index.js # Main entry point for the backend server (Express setup)
└── package.json # Project dependencies and scripts

Step 8:
Set up the .env file(stored all the sensitive info in this file)
DB_NAME=quiz_app
DB_USER=root
DB_PASSWORD=mypassword
DB_HOST=localhost

Step 9:
in backend/config/db.js ,

step 9.1:
import { Sequelize } from 'sequelize';

Sequelize is a Node.js ORM (Object-Relational Mapping) lib that provides an easy way to interact with SQL databases (like MySQL, PostgreSQL, etc.). Here, i have imported the Sequelize class from the library to create an instance that represents the database connection.

step 9.2:
Creating a Sequelize Instance,

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
host: process.env.DB_HOST,
dialect: 'mysql',
logging: false,
});
MySQL database:

process.env.DB_NAME: This accesses the environment variable DB_NAME, which is the name of your MySQL database (e.g., quiz_app).

process.env.DB_USER: This accesses the environment variable DB_USER, which is the username used to connect to your database (e.g., root).

process.env.DB_PASSWORD: This accesses the environment variable DB_PASSWORD, which is the password for the database user (e.g., password123).

process.env.DB_HOST: This accesses the environment variable DB_HOST, which is the host or address of your database server (e.g., localhost or the IP address of a remote server).

dialect: 'mysql': This specifies the type of database i am using. In this case, it's MySQL.

logging: false: This is an optional configuration. By setting logging to false, I disable Sequelize's default logging behavior (which outputs SQL queries to the console). This can keep output cleaner, especially in production environments. If you want to log SQL queries, you can set this to true or provide a custom logging function.
