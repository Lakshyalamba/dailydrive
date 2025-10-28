-- DailyDrive Database Schema for TiDB

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  profile_photo VARCHAR(255),
  streak_days INT DEFAULT 0,
  total_points INT DEFAULT 0,
  courses_completed INT DEFAULT 0,
  member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token (token),
  INDEX idx_email (email)
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category ENUM('fitness', 'study', 'wellness') NOT NULL,
  weekly_completed INT DEFAULT 0,
  weekly_goal INT DEFAULT 5,
  current_progress INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_category (user_id, category)
);

-- User goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  category ENUM('fitness', 'study', 'wellness') NOT NULL,
  target_value INT NOT NULL,
  current_value INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Completed modules table
CREATE TABLE IF NOT EXISTS completed_modules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  module_id INT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  points_earned INT DEFAULT 10,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_course_module (user_id, course_id, module_id)
);

-- Unlocked courses table
CREATE TABLE IF NOT EXISTS unlocked_courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_course (user_id, course_id)
);

-- Community posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category ENUM('general', 'fitness', 'study', 'wellness') DEFAULT 'general',
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Recent activities table
CREATE TABLE IF NOT EXISTS recent_activities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  activity_type ENUM('course', 'workout', 'meditation', 'goal') NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default data for testing
INSERT IGNORE INTO users (username, email, password_hash, streak_days, total_points, courses_completed) VALUES
('John Doe', 'john@example.com', '$2b$10$example_hash', 5, 150, 2),
('Jane Smith', 'jane@example.com', '$2b$10$example_hash', 3, 80, 1);

-- Insert default progress data
INSERT IGNORE INTO user_progress (user_id, category, weekly_completed, weekly_goal, current_progress) VALUES
(1, 'fitness', 3, 5, 60),
(1, 'study', 4, 7, 80),
(1, 'wellness', 2, 3, 40),
(2, 'fitness', 2, 4, 50),
(2, 'study', 5, 6, 85),
(2, 'wellness', 1, 2, 25);

-- Insert default goals
INSERT IGNORE INTO user_goals (user_id, name, category, target_value, current_value) VALUES
(1, 'Complete 20 workouts', 'fitness', 20, 12),
(1, 'Study 50 hours', 'study', 50, 35),
(1, 'Meditate 30 days', 'wellness', 30, 18),
(2, 'Run 100km', 'fitness', 100, 45),
(2, 'Read 10 books', 'study', 10, 6),
(2, 'Practice mindfulness daily', 'wellness', 30, 15);