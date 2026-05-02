-- DailyDrive Database Schema for PostgreSQL

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  profile_photo VARCHAR(255),
  streak_days INT DEFAULT 0,
  total_points INT DEFAULT 0,
  courses_completed INT DEFAULT 0,
  member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_email ON password_reset_tokens(email);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(20) NOT NULL CHECK (category IN ('fitness', 'study', 'wellness')),
  weekly_completed INT DEFAULT 0,
  weekly_goal INT DEFAULT 5,
  current_progress INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, category)
);

-- User goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_title VARCHAR(100) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('fitness', 'study', 'wellness')),
  target_value INT NOT NULL,
  current_value INT DEFAULT 0,
  deadline DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(20) NOT NULL CHECK (category IN ('fitness', 'study', 'wellness')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User courses table (enrollments)
CREATE TABLE IF NOT EXISTS user_courses (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress INT DEFAULT 0,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, course_id)
);

-- Completed modules table
CREATE TABLE IF NOT EXISTS completed_modules (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id INT NOT NULL,
  module_id INT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  points_earned INT DEFAULT 10,
  UNIQUE (user_id, course_id, module_id)
);

-- Unlocked courses table
CREATE TABLE IF NOT EXISTS unlocked_courses (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id INT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, course_id)
);

-- Community posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(20) DEFAULT 'general' CHECK (category IN ('general', 'fitness', 'study', 'wellness')),
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User activities table
CREATE TABLE IF NOT EXISTS user_activities (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(20) NOT NULL CHECK (category IN ('fitness', 'study', 'wellness')),
  activity_type VARCHAR(50) NOT NULL,
  duration_minutes INT NOT NULL,
  points INT DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User streaks table
CREATE TABLE IF NOT EXISTS user_streaks (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  current_streak INT DEFAULT 0,
  last_activity_date DATE,
  date DATE,
  has_activity BOOLEAN DEFAULT FALSE,
  UNIQUE (user_id, date)
);

-- Recent activities table
CREATE TABLE IF NOT EXISTS recent_activities (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(20) NOT NULL CHECK (activity_type IN ('course', 'workout', 'meditation', 'goal')),
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily focus table
CREATE TABLE IF NOT EXISTS daily_focus (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_text VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_date ON daily_focus(user_id, date);

-- Insert default courses
INSERT INTO courses (title, description, category) VALUES
('Introduction to Fitness', 'Learn the basics of staying fit.', 'fitness'),
('React Mastery', 'Deep dive into React.js framework.', 'study'),
('Mindfulness 101', 'Techniques for stress management.', 'wellness')
ON CONFLICT DO NOTHING;

-- Insert default data for testing
INSERT INTO users (username, email, password_hash, streak_days, total_points, courses_completed) VALUES
('John Doe', 'john@example.com', '$2b$10$example_hash', 5, 150, 2),
('Jane Smith', 'jane@example.com', '$2b$10$example_hash', 3, 80, 1)
ON CONFLICT DO NOTHING;

-- Insert default progress data
INSERT INTO user_progress (user_id, category, weekly_completed, weekly_goal, current_progress) VALUES
(1, 'fitness', 3, 5, 60),
(1, 'study', 4, 7, 80),
(1, 'wellness', 2, 3, 40),
(2, 'fitness', 2, 4, 50),
(2, 'study', 5, 6, 85),
(2, 'wellness', 1, 2, 25)
ON CONFLICT DO NOTHING;

-- Insert default goals
INSERT INTO user_goals (user_id, goal_title, category, target_value, current_value) VALUES
(1, 'Complete 20 workouts', 'fitness', 20, 12),
(1, 'Study 50 hours', 'study', 50, 35),
(1, 'Meditate 30 days', 'wellness', 30, 18),
(2, 'Run 100km', 'fitness', 100, 45),
(2, 'Read 10 books', 'study', 10, 6),
(2, 'Practice mindfulness daily', 'wellness', 30, 15)
ON CONFLICT DO NOTHING;