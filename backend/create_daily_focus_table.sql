CREATE TABLE IF NOT EXISTS daily_focus (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  task_text VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_user_date ON daily_focus(user_id, date);