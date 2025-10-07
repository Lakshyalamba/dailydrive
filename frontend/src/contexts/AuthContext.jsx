import { createContext, useContext, useState, useEffect } from 'react';
import { mockUserProfiles } from '../data/mockUserData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('dailydrive_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('dailydrive_users') || '{}');
    
    // Check if user exists
    const userData = storedUsers[email];
    if (!userData) {
      setLoading(false);
      throw new Error('User not found. Please sign up first.');
    }
    
    // Check password
    if (userData.password !== password) {
      setLoading(false);
      throw new Error('Invalid password. Please try again.');
    }
    
    // Create user profile
    const userProfile = {
      ...mockUserProfiles.default,
      email: userData.email,
      name: userData.username
    };
    
    setUser(userProfile);
    localStorage.setItem('dailydrive_user', JSON.stringify(userProfile));
    setLoading(false);
    
    return userProfile;
  };

  const signup = async (username, email, password) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('dailydrive_users') || '{}');
    
    // Check if user already exists
    if (storedUsers[email]) {
      setLoading(false);
      throw new Error('User already exists. Please login instead.');
    }
    
    // Store new user
    storedUsers[email] = {
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('dailydrive_users', JSON.stringify(storedUsers));
    
    // Create user profile
    const userProfile = {
      ...mockUserProfiles.default,
      email,
      name: username
    };
    
    setUser(userProfile);
    localStorage.setItem('dailydrive_user', JSON.stringify(userProfile));
    setLoading(false);
    
    return userProfile;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dailydrive_user');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user profile
    const updatedUser = {
      ...user,
      username: profileData.username,
      name: profileData.username,
      profilePhoto: profileData.profilePhoto
    };
    
    // Update stored users
    const storedUsers = JSON.parse(localStorage.getItem('dailydrive_users') || '{}');
    if (storedUsers[user.email]) {
      storedUsers[user.email].username = profileData.username;
      storedUsers[user.email].profilePhoto = profileData.profilePhoto;
      localStorage.setItem('dailydrive_users', JSON.stringify(storedUsers));
    }
    
    setUser(updatedUser);
    localStorage.setItem('dailydrive_user', JSON.stringify(updatedUser));
    setLoading(false);
    
    return updatedUser;
  };

  const incrementStreak = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      stats: {
        ...user.stats,
        streakDays: user.stats.streakDays + 1
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('dailydrive_user', JSON.stringify(updatedUser));
    
    return updatedUser;
  };

  const toggleModuleCompletion = (courseId, moduleId, points = 10) => {
    if (!user) return;
    
    const completedModules = user.completedModules || {};
    const moduleKey = `${courseId}-${moduleId}`;
    const isCompleted = completedModules[moduleKey];
    
    const updatedUser = {
      ...user,
      completedModules: {
        ...completedModules,
        [moduleKey]: !isCompleted
      },
      stats: {
        ...user.stats,
        totalPoints: isCompleted 
          ? user.stats.totalPoints - points 
          : user.stats.totalPoints + points
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('dailydrive_user', JSON.stringify(updatedUser));
    
    return updatedUser;
  };

  const getCourseProgress = (courseId, totalModules) => {
    if (!user?.completedModules) return 0;
    
    const completedCount = Object.keys(user.completedModules)
      .filter(key => key.startsWith(`${courseId}-`) && user.completedModules[key])
      .length;
    
    return totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  };

  const getOverallProgress = () => {
    if (!user?.completedModules) return 0;
    
    const totalCompleted = Object.values(user.completedModules)
      .filter(completed => completed).length;
    
    return totalCompleted;
  };

  const unlockCourse = (courseId) => {
    if (!user) return;
    
    const unlockedCourses = user.unlockedCourses || [];
    if (unlockedCourses.includes(courseId)) return;
    
    const updatedUser = {
      ...user,
      unlockedCourses: [...unlockedCourses, courseId]
    };
    
    setUser(updatedUser);
    localStorage.setItem('dailydrive_user', JSON.stringify(updatedUser));
    
    return updatedUser;
  };

  const isCourseUnlocked = (courseId) => {
    return user?.unlockedCourses?.includes(courseId) || false;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    incrementStreak,
    toggleModuleCompletion,
    getCourseProgress,
    getOverallProgress,
    unlockCourse,
    isCourseUnlocked,
    loading,
    getGreeting,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};