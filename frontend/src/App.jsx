import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import CoursePage from './components/pages/CoursePage';
import CourseDetail from './components/pages/CourseDetail';
import Community from './components/pages/Community';
import Analytics from './components/pages/Analytics';
import Profile from './components/pages/Profile';
import './styles/global.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  return !user ? children : <Navigate to="/dashboard" replace />;
};

function AppContent() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-large"></div>
      </div>
    );
  }
  
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            user ? <Navigate to="/dashboard" replace /> : <Landing />
          } />
          <Route path="/home" element={
            user ? <Navigate to="/dashboard" replace /> : <Landing />
          } />
          <Route path="/login" element={
            <PublicRoute><Login /></PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute><Signup /></PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute><Signup /></PublicRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/community" element={<Community />} />

          <Route path="/analytics" element={
            <ProtectedRoute><Analytics /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;