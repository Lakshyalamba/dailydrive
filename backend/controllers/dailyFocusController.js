import pool from '../config/database.js';

export const getDailyTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date().toISOString().split('T')[0];
    
    const [rows] = await pool.execute(
      'SELECT * FROM daily_focus WHERE user_id = ? AND date = ?',
      [userId, today]
    );
    
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { userId, taskText } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const [result] = await pool.execute(
      'INSERT INTO daily_focus (user_id, task_text, is_completed, date) VALUES (?, ?, 0, ?)',
      [userId, taskText, today]
    );
    
    res.json({ success: true, data: { id: result.insertId, task_text: taskText, is_completed: 0 } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskText, isCompleted } = req.body;
    
    await pool.execute(
      'UPDATE daily_focus SET task_text = ?, is_completed = ? WHERE id = ?',
      [taskText, isCompleted ? 1 : 0, id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};