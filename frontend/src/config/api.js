// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // User endpoints
  PROFILE: '/user/profile',
  PROGRESS: '/user/progress',
  GOALS: '/user/goals',
  
  // Course endpoints
  COURSES: '/courses',
  COURSE_DETAIL: '/courses',
  ENROLL: '/courses/enroll',
  
  // Community endpoints
  POSTS: '/community/posts',
  CREATE_POST: '/community/posts',
  
  // Analytics endpoints
  ANALYTICS: '/analytics'
};

// API utility function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const config = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};