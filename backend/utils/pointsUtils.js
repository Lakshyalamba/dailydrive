import pool from '../config/database.js';

const POINTS_PER_HOUR = {
  fitness: 10,
  study: 15,
  wellness: 5
};

const STREAK_BONUSES = {
  7: 50,
  30: 200,
  100: 500
};

export const calculateActivityPoints = (category, duration_minutes) => {
  if (!POINTS_PER_HOUR[category] || duration_minutes <= 0) {
    return 0;
  }
  
  const hours = duration_minutes / 60;
  return Math.round(hours * POINTS_PER_HOUR[category]);
};

export const updateUserPoints = async (userId, points) => {
  try {
    await pool.execute(
      'UPDATE users SET total_points = total_points + ? WHERE id = ?',
      [points, userId]
    );

    const [result] = await pool.execute(
      'SELECT total_points FROM users WHERE id = ?',
      [userId]
    );

    return result[0]?.total_points || 0;
  } catch (error) {
    console.error('Error updating user points:', error);
    return 0;
  }
};

export const getBonusPoints = (streakDays) => {
  if (streakDays >= 100) return STREAK_BONUSES[100];
  if (streakDays >= 30) return STREAK_BONUSES[30];
  if (streakDays >= 7) return STREAK_BONUSES[7];
  return 0;
};