import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { register, login, getProfile } from '../controllers/authController.js';
import { getDashboardData, addActivity } from '../controllers/dashboardController.js';
import { getAllCourses, enrollCourse, getUserCourses, updateCourseProgress } from '../controllers/courseController.js';
import { getAllPosts, createPost, likePost, getSinglePost } from '../controllers/communityController.js';
import { getUserGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goalsController.js';
import { getWeeklyAnalytics, getMonthlyAnalytics, getYearlyAnalytics, getStreakData, exportToPDF, exportToCSV } from '../controllers/analyticsController.js';

const router = express.Router();

// Authentication routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', verifyToken, getProfile);

// Dashboard routes
router.get('/dashboard/:userId', verifyToken, getDashboardData);
router.post('/dashboard/activity', verifyToken, addActivity);

// Course routes
router.get('/courses', getAllCourses);
router.post('/courses/:courseId/enroll', verifyToken, enrollCourse);
router.get('/courses/user/:userId', verifyToken, getUserCourses);
router.put('/courses/:courseId/progress', verifyToken, updateCourseProgress);

// Community routes
router.get('/community/posts', getAllPosts);
router.post('/community/posts', verifyToken, createPost);
router.put('/community/posts/:postId/like', verifyToken, likePost);
router.get('/community/posts/:postId', getSinglePost);

// Goals routes
router.get('/goals/:userId', verifyToken, getUserGoals);
router.post('/goals', verifyToken, createGoal);
router.put('/goals/:goalId', verifyToken, updateGoal);
router.delete('/goals/:goalId', verifyToken, deleteGoal);

// Analytics routes
router.get('/analytics/:userId/weekly', verifyToken, getWeeklyAnalytics);
router.get('/analytics/:userId/monthly', verifyToken, getMonthlyAnalytics);
router.get('/analytics/:userId/yearly', verifyToken, getYearlyAnalytics);
router.get('/analytics/:userId/streak', verifyToken, getStreakData);
router.get('/analytics/:userId/export/pdf', verifyToken, exportToPDF);
router.get('/analytics/:userId/export/csv', verifyToken, exportToCSV);

export default router;