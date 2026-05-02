import pool from '../config/database.js';

export const getDailyTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date().toISOString().split('T')[0];
    
    const { rows } = await pool.query(
      'SELECT * FROM daily_focus WHERE user_id = $1 AND date = $2',
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
    
    const { rows: result } = await pool.query(
      'INSERT INTO daily_focus (user_id, task_text, is_completed, date) VALUES ($1, $2, false, $3) RETURNING id',
      [userId, taskText, today]
    );
    
    res.json({ success: true, data: { id: result[0].id, task_text: taskText, is_completed: false } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskText, isCompleted } = req.body;
    
    await pool.query(
      'UPDATE daily_focus SET task_text = $1, is_completed = $2 WHERE id = $3',
      [taskText, isCompleted ? true : false, id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};