import { currentUser } from '../data/mockUsers.js';
import { courses, courseModules } from '../data/mockCourses.js';
import { communityPosts, testimonials } from '../data/mockCommunity.js';
import { userProgress, weeklyData, goals, achievements } from '../data/mockAnalytics.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Auth
  login: async (credentials) => {
    await delay(1000);
    if (credentials.email && credentials.password) {
      return { success: true, user: currentUser, token: 'mock-jwt-token' };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    await delay(1200);
    return { success: true, user: { ...userData, id: Date.now() }, token: 'mock-jwt-token' };
  },

  // Courses
  getCourses: async () => {
    await delay(500);
    return { success: true, data: courses };
  },

  getCourse: async (id) => {
    await delay(300);
    const course = courses.find(c => c.id === parseInt(id));
    if (!course) throw new Error('Course not found');
    return { success: true, data: { ...course, modules: courseModules[id] || [] } };
  },

  enrollCourse: async (courseId) => {
    await delay(800);
    return { success: true, message: 'Successfully enrolled in course' };
  },

  // Community
  getCommunityPosts: async () => {
    await delay(400);
    return { success: true, data: communityPosts };
  },

  createPost: async (postData) => {
    await delay(600);
    const newPost = {
      id: Date.now(),
      ...postData,
      author: currentUser,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0
    };
    return { success: true, data: newPost };
  },

  // Analytics
  getUserProgress: async (userId) => {
    await delay(300);
    return { success: true, data: userProgress };
  },

  getWeeklyData: async (userId) => {
    await delay(250);
    return { success: true, data: weeklyData };
  },

  getUserGoals: async (userId) => {
    await delay(200);
    return { success: true, data: goals };
  },

  getAchievements: async (userId) => {
    await delay(300);
    return { success: true, data: achievements };
  },

  // Landing page
  getTestimonials: async () => {
    await delay(200);
    return { success: true, data: testimonials };
  },

  getStats: async () => {
    await delay(150);
    return {
      success: true,
      data: {
        totalUsers: 15420,
        coursesCompleted: 8934,
        communityPosts: 2341,
        successRate: 94
      }
    };
  },


};