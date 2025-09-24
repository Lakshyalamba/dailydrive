import pool from '../config/database.js';

export const getUserGoals = async (req, res) => {
  const userId = req.user.id;

  try {
    const [goals] = await pool.execute(
      'SELECT id, goal_title, category, target_value, current_value, deadline, is_completed, created_at FROM user_goals WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    const goalsWithProgress = goals.map(goal => ({
      ...goal,
      progress_percentage: Math.round((goal.current_value / goal.target_value) * 100)
    }));

    res.json({ goals: goalsWithProgress });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get goals' });
  }
};

export const createGoal = async (req, res) => {
  const { goal_title, category, target_value, deadline } = req.body;
  const userId = req.user.id;

  if (!goal_title || !category || !target_value || !deadline) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!['fitness', 'study', 'wellness'].includes(category)) {
    return res.status(400).json({ error: 'Category must be fitness, study, or wellness' });
  }

  if (target_value <= 0) {
    return res.status(400).json({ error: 'Target value must be greater than 0' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO user_goals (user_id, goal_title, category, target_value, current_value, deadline, is_completed, created_at) VALUES (?, ?, ?, ?, 0, ?, FALSE, NOW())',
      [userId, goal_title, category, target_value, deadline]
    );

    const [newGoal] = await pool.execute(
      'SELECT id, goal_title, category, target_value, current_value, deadline, is_completed, created_at FROM user_goals WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Goal created successfully',
      goal: {
        ...newGoal[0],
        progress_percentage: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

export const updateGoal = async (req, res) => {
  const { goalId } = req.params;
  const { current_value } = req.body;
  const userId = req.user.id;

  if (current_value < 0) {
    return res.status(400).json({ error: 'Current value cannot be negative' });
  }

  try {
    const [goals] = await pool.execute(
      'SELECT target_value FROM user_goals WHERE id = ? AND user_id = ?',
      [goalId, userId]
    );

    if (goals.length === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    const isCompleted = current_value >= goals[0].target_value;

    const [result] = await pool.execute(
      'UPDATE user_goals SET current_value = ?, is_completed = ? WHERE id = ? AND user_id = ?',
      [current_value, isCompleted, goalId, userId]
    );

    const [updatedGoal] = await pool.execute(
      'SELECT id, goal_title, category, target_value, current_value, deadline, is_completed, created_at FROM user_goals WHERE id = ?',
      [goalId]
    );

    res.json({
      message: 'Goal updated successfully',
      goal: {
        ...updatedGoal[0],
        progress_percentage: Math.round((current_value / goals[0].target_value) * 100)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update goal' });
  }
};

export const deleteGoal = async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user.id;

  try {
    const [result] = await pool.execute(
      'DELETE FROM user_goals WHERE id = ? AND user_id = ?',
      [goalId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete goal' });
  }
};