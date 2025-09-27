import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Courses', path: '/courses' },
    { name: 'Community', path: '/community' },
    { name: 'Analytics', path: '/analytics' }
  ];

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">DailyDrive</span>
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            {user ? (
              // Authenticated user navigation
              navItems.map(item => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              ))
            ) : (
              // Non-authenticated user navigation
              location.pathname === '/' ? (
                <>
                  <button onClick={() => scrollToSection('curriculum')} className="nav-link">
                    Curriculum
                  </button>
                  <button onClick={() => scrollToSection('benefits')} className="nav-link">
                    Benefits
                  </button>
                  <button onClick={() => scrollToSection('about')} className="nav-link">
                    About
                  </button>
                  <button onClick={() => scrollToSection('testimonials')} className="nav-link">
                    Testimonials
                  </button>
                  <button onClick={() => scrollToSection('faq')} className="nav-link">
                    FAQ
                  </button>
                  <button onClick={() => scrollToSection('community')} className="nav-link">
                    Community
                  </button>
                </>
              ) : (
                // No navigation links for login/signup pages
                null
              )
            )}
            
            <div className="navbar-actions">
              {user ? (
                <>
                  <Link to="/profile" className="user-info">
                    <div className="user-avatar-small">
                      {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt="Profile" />
                      ) : (
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="user-name">{user.name}</span>
                  </Link>
                  <button onClick={logout} className="btn btn-outline btn-small">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="btn btn-primary btn-small">Sign Up</Link>
                </>
              )}
            </div>
          </div>

          <button 
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;