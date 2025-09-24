import pool from '../config/database.js';

export const getAllCourses = async (req, res) => {
  try {
    const [courses] = await pool.execute(
      'SELECT id, title, description, category FROM courses ORDER BY id'
    );
    
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get courses' });
  }
};

export const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  try {
    // Check if already enrolled
    const [existing] = await pool.execute(
      'SELECT id FROM user_courses WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    // Check if course exists
    const [course] = await pool.execute(
      'SELECT id, title FROM courses WHERE id = ?',
      [courseId]
    );

    if (course.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Create enrollment
    await pool.execute(
      'INSERT INTO user_courses (user_id, course_id, progress, enrolled_at) VALUES (?, ?, 0, NOW())',
      [userId, courseId]
    );

    res.json({
      message: 'Successfully enrolled in course',
      course: course[0],
      progress: 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
};

export const getUserCourses = async (req, res) => {
  const userId = req.user.id;

  try {
    const [courses] = await pool.execute(
      'SELECT c.id, c.title, c.description, c.category, uc.progress, uc.enrolled_at FROM user_courses uc JOIN courses c ON uc.course_id = c.id WHERE uc.user_id = ? ORDER BY uc.enrolled_at DESC',
      [userId]
    );

    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user courses' });
  }
};

export const updateCourseProgress = async (req, res) => {
  const { courseId } = req.params;
  const { progress } = req.body;
  const userId = req.user.id;

  if (progress < 0 || progress > 100) {
    return res.status(400).json({ error: 'Progress must be between 0 and 100' });
  }

  try {
    const [result] = await pool.execute(
      'UPDATE user_courses SET progress = ? WHERE user_id = ? AND course_id = ?',
      [progress, userId, courseId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({
      message: 'Progress updated successfully',
      courseId: parseInt(courseId),
      progress
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
};