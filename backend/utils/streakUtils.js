import pool from '../config/database.js';

export const calculateCurrentStreak = async (userId) => {
  try {
    const [activities] = await pool.execute(
      `SELECT DISTINCT date as activity_date 
       FROM user_activities 
       WHERE user_id = ? 
       ORDER BY activity_date DESC`,
      [userId]
    );

    if (activities.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < activities.length; i++) {
      const activityDate = new Date(activities[i].activity_date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (activityDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error('Error calculating streak:', error);
    return 0;
  }
};

export const updateDailyStreak = async (userId) => {
  const today = new Date().toISOString().split('T')[0];

  try {
    // Check if user has activity today
    const [todayActivity] = await pool.execute(
      'SELECT COUNT(*) as count FROM user_activities WHERE user_id = ? AND date = ?',
      [userId, today]
    );

    const hasActivityToday = todayActivity[0].count > 0;
    
    if (hasActivityToday) {
      const currentStreak = await calculateCurrentStreak(userId);
      
      // Update streak record
      await pool.execute(
        'INSERT INTO user_streaks (user_id, date, has_activity) VALUES (?, ?, TRUE) ON DUPLICATE KEY UPDATE has_activity = TRUE',
        [userId, today]
      );

      // Update user's current streak
      await pool.execute(
        'UPDATE users SET current_streak = ? WHERE id = ?',
        [currentStreak, userId]
      );

      return currentStreak;
    } else {
      // Check if streak should be reset
      const [lastActivity] = await pool.execute(
        'SELECT MAX(date) as last_date FROM user_activities WHERE user_id = ?',
        [userId]
      );

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (!lastActivity[0].last_date || lastActivity[0].last_date < yesterdayStr) {
        // Reset streak
        await pool.execute(
          'UPDATE users SET current_streak = 0 WHERE id = ?',
          [userId]
        );

        return 0;
      }
    }

    return await calculateCurrentStreak(userId);
  } catch (error) {
    console.error('Error updating daily streak:', error);
    return 0;
  }
};

export const checkStreakMaintenance = async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  try {
    // Get all users with active streaks
    const [users] = await pool.execute(
      'SELECT id as user_id FROM users WHERE current_streak > 0'
    );

    for (const user of users) {
      const userId = user.user_id;
      
      // Check if user had activity yesterday
      const [activity] = await pool.execute(
        'SELECT COUNT(*) as count FROM user_activities WHERE user_id = ? AND date = ?',
        [userId, yesterdayStr]
      );

      if (activity[0].count === 0) {
        // Reset streak for users with no activity yesterday
        await pool.execute(
          'UPDATE users SET current_streak = 0 WHERE id = ?',
          [userId]
        );

        console.log(`Reset streak for user ${userId}`);
      }
    }

    console.log('Streak maintenance completed');
  } catch (error) {
    console.error('Error in streak maintenance:', error);
  }
};