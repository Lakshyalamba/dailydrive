import pool from '../config/database.js';

export const getDashboardData = async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split('T')[0];

  try {
    // Get user streak
    const [streaks] = await pool.execute(
      'SELECT current_streak FROM user_streaks WHERE user_id = ?',
      [userId]
    );

    // Get user points
    const [users] = await pool.execute(
      'SELECT total_points FROM users WHERE id = ?',
      [userId]
    );

    // Get today's activities by category
    const [activities] = await pool.execute(
      'SELECT category, COUNT(*) as count, SUM(duration_minutes) as total_minutes FROM user_activities WHERE user_id = ? AND DATE(created_at) = ? GROUP BY category',
      [userId, today]
    );

    // Get enrolled courses with progress
    const [courses] = await pool.execute(
      'SELECT c.id, c.title, c.category, uc.progress FROM user_courses uc JOIN courses c ON uc.course_id = c.id WHERE uc.user_id = ?',
      [userId]
    );

    // Get current goals
    const [goals] = await pool.execute(
      'SELECT id, name, category, target_value, current_value FROM user_goals WHERE user_id = ? AND completed = FALSE',
      [userId]
    );

    // Format activity data
    const activityData = {
      fitness: { count: 0, minutes: 0 },
      study: { count: 0, minutes: 0 },
      wellness: { count: 0, minutes: 0 }
    };

    activities.forEach(activity => {
      activityData[activity.category] = {
        count: activity.count,
        minutes: activity.total_minutes
      };
    });

    res.json({
      streak: streaks[0]?.current_streak || 0,
      totalPoints: users[0]?.total_points || 0,
      todayActivities: activityData,
      courses: courses,
      goals: goals
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
};

export const addActivity = async (req, res) => {
  const { category, activity_type, duration_minutes } = req.body;
  const userId = req.user.id;
  const today = new Date().toISOString().split('T')[0];

  if (!category || !activity_type || !duration_minutes) {
    return res.status(400).json({ error: 'Category, activity type and duration are required' });
  }

  const pointsPerHour = { fitness: 10, study: 15, wellness: 5 };
  const points = Math.round((duration_minutes / 60) * pointsPerHour[category]);

  try {
    // Check if first activity today
    const [todayActivities] = await pool.execute(
      'SELECT COUNT(*) as count FROM user_activities WHERE user_id = ? AND DATE(created_at) = ?',
      [userId, today]
    );

    // Add activity
    await pool.execute(
      'INSERT INTO user_activities (user_id, category, activity_type, duration_minutes, points, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [userId, category, activity_type, duration_minutes, points]
    );

    // Update user points
    await pool.execute(
      'UPDATE users SET total_points = total_points + ? WHERE id = ?',
      [points, userId]
    );

    // Update streak if first activity today
    if (todayActivities[0].count === 0) {
      await pool.execute(
        'INSERT INTO user_streaks (user_id, current_streak, last_activity_date) VALUES (?, 1, ?) ON DUPLICATE KEY UPDATE current_streak = CASE WHEN DATE(last_activity_date) = DATE_SUB(?, INTERVAL 1 DAY) THEN current_streak + 1 WHEN DATE(last_activity_date) = ? THEN current_streak ELSE 1 END, last_activity_date = ?',
        [userId, today, today, today, today]
      );
    }

    // Get updated stats
    const [updatedUser] = await pool.execute(
      'SELECT total_points FROM users WHERE id = ?',
      [userId]
    );

    const [updatedStreak] = await pool.execute(
      'SELECT current_streak FROM user_streaks WHERE user_id = ?',
      [userId]
    );

    res.json({
      message: 'Activity added successfully',
      pointsEarned: points,
      totalPoints: updatedUser[0].total_points,
      currentStreak: updatedStreak[0]?.current_streak || 1
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add activity' });
  }
};