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

  const value = {
    user,
    login,
    signup,
    logout,
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