import { createContext, useContext, useState, useEffect } from 'react';
import { mockUserProfiles } from '../data/mockUserData';
import { API_BASE_URL } from '../config/api';

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

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();

      // Create user profile with backend data
      const userProfile = {
        ...mockUserProfiles.default,
        id: data.user.id,
        email: data.user.email,
        name: data.user.name
      };

      // Store auth token
      localStorage.setItem('dailydrive_token', data.token);
      localStorage.setItem('dailydrive_user', JSON.stringify(userProfile));

      setUser(userProfile);
      setLoading(false);

      return userProfile;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signup = async (username, email, password) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();

      // Create user profile with backend data
      const userProfile = {
        ...mockUserProfiles.default,
        id: data.user.id,
        email: data.user.email,
        name: data.user.name
      };

      // Store auth token
      localStorage.setItem('dailydrive_token', data.token);
      localStorage.setItem('dailydrive_user', JSON.stringify(userProfile));

      setUser(userProfile);
      setLoading(false);

      return userProfile;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dailydrive_user');
    localStorage.removeItem('dailydrive_token');
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