import pool from '../config/database.js';
import PDFDocument from 'pdfkit';
import createCsvWriter from 'csv-writer';
import fs from 'fs';
import path from 'path';

export const getWeeklyAnalytics = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const [activities] = await pool.execute(
      `SELECT date, category, SUM(duration_minutes) as total_minutes 
       FROM user_activities 
       WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       GROUP BY date, category
       ORDER BY date DESC`,
      [userId]
    );

    const [users] = await pool.execute(
      'SELECT current_streak FROM users WHERE id = ?',
      [userId]
    );

    const weeklyData = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      weeklyData[dateStr] = { fitness: 0, study: 0, wellness: 0 };
    }

    activities.forEach(activity => {
      if (weeklyData[activity.date]) {
        weeklyData[activity.date][activity.category] = activity.total_minutes;
      }
    });

    res.json({
      weeklyData,
      currentStreak: users[0]?.current_streak || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get weekly analytics' });
  }
};

export const getMonthlyAnalytics = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const [activities] = await pool.execute(
      `SELECT category, COUNT(*) as total_activities, SUM(duration_minutes) as total_minutes
       FROM user_activities 
       WHERE user_id = ? AND MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())
       GROUP BY category`,
      [userId]
    );

    const [goals] = await pool.execute(
      `SELECT COUNT(*) as achieved_goals FROM user_goals 
       WHERE user_id = ? AND is_completed = TRUE AND MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`,
      [userId]
    );

    const summary = {
      totalActivities: activities.reduce((sum, a) => sum + a.total_activities, 0),
      totalHours: Math.round(activities.reduce((sum, a) => sum + a.total_minutes, 0) / 60),
      goalsAchieved: goals[0].achieved_goals,
      categoryBreakdown: {}
    };

    activities.forEach(activity => {
      summary.categoryBreakdown[activity.category] = {
        activities: activity.total_activities,
        hours: Math.round(activity.total_minutes / 60)
      };
    });

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get monthly analytics' });
  }
};

export const getYearlyAnalytics = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const [monthlyTrends] = await pool.execute(
      `SELECT MONTH(date) as month, category, COUNT(*) as activities, SUM(duration_minutes) as minutes
       FROM user_activities 
       WHERE user_id = ? AND YEAR(date) = YEAR(CURDATE())
       GROUP BY MONTH(date), category
       ORDER BY month`,
      [userId]
    );

    const [totalStats] = await pool.execute(
      `SELECT COUNT(*) as total_activities, SUM(duration_minutes) as total_minutes
       FROM user_activities 
       WHERE user_id = ? AND YEAR(date) = YEAR(CURDATE())`,
      [userId]
    );

    const [maxStreak] = await pool.execute(
      'SELECT current_streak as longest_streak FROM users WHERE id = ?',
      [userId]
    );

    res.json({
      monthlyTrends,
      totalActivities: totalStats[0].total_activities,
      totalHours: Math.round(totalStats[0].total_minutes / 60),
      longestStreak: maxStreak[0]?.longest_streak || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get yearly analytics' });
  }
};

export const getStreakData = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const [activities] = await pool.execute(
      `SELECT DISTINCT date as activity_date
       FROM user_activities 
       WHERE user_id = ? AND MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())`,
      [userId]
    );

    const [users] = await pool.execute(
      'SELECT current_streak FROM users WHERE id = ?',
      [userId]
    );

    const activityDates = new Set(activities.map(a => a.activity_date));
    const calendar = [];
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      calendar.push({
        date: dateStr,
        hasActivity: activityDates.has(dateStr)
      });
    }

    res.json({
      calendar,
      currentStreak: users[0]?.current_streak || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get streak data' });
  }
};

export const exportToPDF = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const [user] = await pool.execute('SELECT name FROM users WHERE id = ?', [userId]);
    const [activities] = await pool.execute(
      'SELECT category, COUNT(*) as count, SUM(duration_minutes) as minutes FROM user_activities WHERE user_id = ? GROUP BY category',
      [userId]
    );

    const doc = new PDFDocument();
    const filename = `analytics-${userId}-${Date.now()}.pdf`;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    
    doc.pipe(res);
    
    doc.fontSize(20).text('DailyDrive Analytics Report', 50, 50);
    doc.fontSize(14).text(`User: ${user[0].name}`, 50, 80);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 50, 100);
    
    let yPos = 140;
    activities.forEach(activity => {
      doc.text(`${activity.category}: ${activity.count} activities, ${Math.round(activity.minutes/60)} hours`, 50, yPos);
      yPos += 20;
    });
    
    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};

export const exportToCSV = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const [activities] = await pool.execute(
      'SELECT date, category, activity_type, duration_minutes, points_earned as points FROM user_activities WHERE user_id = ? ORDER BY date DESC',
      [userId]
    );

    const filename = `activities-${userId}-${Date.now()}.csv`;
    const filepath = path.join('/tmp', filename);
    
    const csvWriter = createCsvWriter({
      path: filepath,
      header: [
        {id: 'date', title: 'Date'},
        {id: 'category', title: 'Category'},
        {id: 'activity_type', title: 'Activity Type'},
        {id: 'duration_minutes', title: 'Duration (minutes)'},
        {id: 'points', title: 'Points'}
      ]
    });

    await csvWriter.writeRecords(activities);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    
    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);
    
    fileStream.on('end', () => {
      fs.unlinkSync(filepath);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate CSV' });
  }
};