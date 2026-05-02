import pool from '../config/database.js';

export const getDashboardData = async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split('T')[0];

  try {
    // Get user streak
    const { rows: streaks } = await pool.query(
      'SELECT current_streak FROM user_streaks WHERE user_id = $1',
      [userId]
    );

    // Get user points
    const { rows: users } = await pool.query(
      'SELECT total_points FROM users WHERE id = $1',
      [userId]
    );

    // Get today's activities by category
    const { rows: activities } = await pool.query(
      'SELECT category, COUNT(*) as count, SUM(duration_minutes) as total_minutes FROM user_activities WHERE user_id = $1 AND DATE(created_at) = $2 GROUP BY category',
      [userId, today]
    );

    // Get enrolled courses with progress
    const { rows: courses } = await pool.query(
      'SELECT c.id, c.title, c.category, uc.progress FROM user_courses uc JOIN courses c ON uc.course_id = c.id WHERE uc.user_id = $1',
      [userId]
    );

    // Get current goals
    const { rows: goals } = await pool.query(
      'SELECT id, name, category, target_value, current_value FROM user_goals WHERE user_id = $1 AND is_completed = FALSE',
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
    const { rows: todayActivities } = await pool.query(
      'SELECT COUNT(*) as count FROM user_activities WHERE user_id = $1 AND DATE(created_at) = $2',
      [userId, today]
    );

    // Add activity
    await pool.query(
      'INSERT INTO user_activities (user_id, category, activity_type, duration_minutes, points, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
      [userId, category, activity_type, duration_minutes, points]
    );

    // Update user points
    await pool.query(
      'UPDATE users SET total_points = total_points + $1 WHERE id = $2',
      [points, userId]
    );

    // Update streak if first activity today
    if (parseInt(todayActivities[0].count) === 0) {
      await pool.query(
        'INSERT INTO user_streaks (user_id, current_streak, last_activity_date) VALUES ($1, 1, $2) ON CONFLICT (user_id) DO UPDATE SET current_streak = CASE WHEN DATE(user_streaks.last_activity_date) = $3::date - INTERVAL \'1 day\' THEN user_streaks.current_streak + 1 WHEN DATE(user_streaks.last_activity_date) = $4::date THEN user_streaks.current_streak ELSE 1 END, last_activity_date = $5',
        [userId, today, today, today, today]
      );
    }

    // Get updated stats
    const { rows: updatedUser } = await pool.query(
      'SELECT total_points FROM users WHERE id = $1',
      [userId]
    );

    const { rows: updatedStreak } = await pool.query(
      'SELECT current_streak FROM user_streaks WHERE user_id = $1',
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