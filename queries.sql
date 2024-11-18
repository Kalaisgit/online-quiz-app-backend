CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Teacher', 'Student') NOT NULL
);

CREATE TABLE Quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,         -- Auto-incrementing primary key for each quiz
  title VARCHAR(255) NOT NULL,               -- Title of the quiz
  description TEXT,                          -- Description of the quiz (optional)
  duration INT NOT NULL,                     -- Duration of the quiz in minutes
  startDate DATETIME NOT NULL,               -- Start date and time of the quiz
  endDate DATETIME NOT NULL                  -- End date and time of the quiz
);



CREATE TABLE Questions (
  id INT AUTO_INCREMENT PRIMARY KEY,         -- Auto-incrementing primary key for each question
  text VARCHAR(255) NOT NULL,                 -- The text of the question
  type VARCHAR(50) NOT NULL,                  -- Type of question (e.g., multiple choice, true/false)
  correctAnswer VARCHAR(255) NOT NULL,        -- The correct answer for the question (could be the answer ID)
  quizId INT NOT NULL,                        -- Foreign key linking to the Quiz table
  FOREIGN KEY (quizId) REFERENCES Quizzes(id) ON DELETE CASCADE -- Foreign key constraint
);


CREATE TABLE Answers (
  id INT AUTO_INCREMENT PRIMARY KEY,          -- Auto-incrementing primary key for each answer
  text VARCHAR(255) NOT NULL,                  -- Answer text
  isCorrect BOOLEAN DEFAULT FALSE,             -- Mark whether this is the correct answer
  questionId INT NOT NULL,                     -- Foreign key linking to the Questions table
  FOREIGN KEY (questionId) REFERENCES Questions(id) ON DELETE CASCADE  -- Foreign key constraint
);



