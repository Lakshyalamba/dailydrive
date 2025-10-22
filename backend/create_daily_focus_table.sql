CREATE TABLE IF NOT EXISTS daily_focus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  task_text VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_date (user_id, date)
);