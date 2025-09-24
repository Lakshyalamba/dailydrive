import { useAuth } from '../../contexts/AuthContext';
import './WelcomeHeader.css';

const WelcomeHeader = () => {
  const { user, getGreeting } = useAuth();

  if (!user) return null;

  return (
    <div className="welcome-header">
      <div className="welcome-content">
        <div className="welcome-text">
          <h1>{getGreeting()}, {user.name}!</h1>
          <p>Ready to continue your growth journey?</p>
        </div>
        <div className="user-avatar">
          <div className="avatar-circle">
            <span>{user.name.charAt(0)}</span>
          </div>
          <div className="membership-badge">
            {user.membershipType}
          </div>
        </div>
      </div>
      <div className="user-quick-stats">
        <div className="quick-stat">
          <span className="stat-number">{user.stats.streakDays}</span>
          <span className="stat-label">Day Streak</span>
        </div>
        <div className="quick-stat">
          <span className="stat-number">{user.stats.totalPoints}</span>
          <span className="stat-label">Points</span>
        </div>
        <div className="quick-stat">
          <span className="stat-number">{user.stats.coursesCompleted}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;