import { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { useAuth } from '../../contexts/AuthContext';
import './Analytics.css';

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    if (user) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [user]);

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'year', name: 'This Year' }
  ];

  const exportData = (format) => {
    console.log(`Exporting data as ${format}`);
    alert(`Analytics data exported as ${format.toUpperCase()}`);
  };

  const getStreakDays = () => {
    return user?.stats?.streakDays || 0;
  };

  const getTotalActivities = () => {
    return (user?.stats?.coursesCompleted || 0) + (user?.stats?.communityPosts || 0);
  };

  const getCompletionRate = () => {
    const goals = user?.goals || [];
    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal.current >= goal.target).length;
    return totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  };

  const getUserSpecificData = () => {
    if (!user) return {};
    
    return {
      totalHoursStudied: Object.values(user.progress).reduce((sum, cat) => sum + (cat.weeklyCompleted || 0), 0),
      coursesEnrolled: user.stats?.coursesCompleted || 0,
      communityPosts: user.stats?.communityPosts || 0,
      memberSince: user.memberSince || 'January 2024'
    };
  };

  if (loading || !user) {
    return (
      <div className="analytics-loading">
        <div className="spinner-large"></div>
      </div>
    );
  }

  const weeklyData = [
    { day: 'Mon', fitness: 2, study: 3, wellness: 1 },
    { day: 'Tue', fitness: 1, study: 4, wellness: 1 },
    { day: 'Wed', fitness: 3, study: 2, wellness: 1 },
    { day: 'Thu', fitness: 2, study: 3, wellness: 0 },
    { day: 'Fri', fitness: 1, study: 5, wellness: 1 },
    { day: 'Sat', fitness: 3, study: 1, wellness: 2 },
    { day: 'Sun', fitness: 2, study: 2, wellness: 1 }
  ];

  return (
    <div className="analytics">
      <div className="container">
        <div className="analytics-header">
          <div className="header-content">
            <h1>{user.name}'s Progress Analytics</h1>
            <p>Track your journey and celebrate your achievements, {user.name.split(' ')[0]}!</p>
            <div className="user-stats-summary">
              <span>Member since {getUserSpecificData().memberSince}</span>
              <span>•</span>
              <span>{getUserSpecificData().totalHoursStudied} hours completed</span>
            </div>
          </div>
          
          <div className="header-controls">
            <div className="period-selector">
              {periods.map(period => (
                <button
                  key={period.id}
                  className={`period-button ${selectedPeriod === period.id ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  {period.name}
                </button>
              ))}
            </div>
            
            <div className="export-buttons">
              <Button variant="outline" size="small" onClick={() => exportData('pdf')}>
                Export PDF
              </Button>
              <Button variant="outline" size="small" onClick={() => exportData('csv')}>
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Main Grid Layout */}
        <div className="analytics-main-grid">
          {/* Top Row - Key Metrics */}
          <div className="analytics-section metrics-section">
            <Card className="metrics-overview">
              <h3>Your Key Metrics</h3>
              <div className="metrics-grid">
                <div className="metric-item">
                  <div className="metric-icon streak"></div>
                  <div className="metric-content">
                    <span className="metric-number">{getStreakDays()}</span>
                    <span className="metric-label">Day Streak</span>
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-icon activities"></div>
                  <div className="metric-content">
                    <span className="metric-number">{getTotalActivities()}</span>
                    <span className="metric-label">Total Activities</span>
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-icon completion"></div>
                  <div className="metric-content">
                    <span className="metric-number">{getCompletionRate()}%</span>
                    <span className="metric-label">Goal Completion</span>
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-icon achievements"></div>
                  <div className="metric-content">
                    <span className="metric-number">{user.stats.coursesCompleted}</span>
                    <span className="metric-label">Achievements</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Left Column - Category Performance */}
          <div className="analytics-section category-section">
            <Card className="category-breakdown">
              <h3>Your Category Performance</h3>
              <div className="categories-list">
                {Object.entries(user.progress).map(([category, data]) => (
                  <div key={category} className="category-item">
                    <div className="category-header">
                      <div className="category-info">
                        <span className={`category-icon ${category}`}></span>
                        <span className="category-name">{category}</span>
                      </div>
                      <span className="category-streak">{data.current || 0} completed</span>
                    </div>
                    
                    <div className="category-stats">
                      <div className="stat">
                        <span className="stat-label">Weekly Progress</span>
                        <ProgressBar 
                          progress={data.weeklyCompleted || 0}
                          max={data.weeklyGoal || 1}
                          size="small"
                          showPercentage={false}
                        />
                        <span className="stat-text">
                          {data.weeklyCompleted || 0}/{data.weeklyGoal || 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Weekly Chart */}
          <div className="analytics-section chart-section">
            <Card className="weekly-chart">
              <h3>Weekly Activity</h3>
              <div className="chart-container">
                <div className="chart">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="chart-bar">
                      <div className="bar-container" style={{ height: '100px' }}>
                        <div 
                          className="bar fitness" 
                          style={{ 
                            height: `${(day.fitness / 5) * 100}px`,
                            backgroundColor: 'var(--primary-green)'
                          }}
                        />
                        <div 
                          className="bar study" 
                          style={{ 
                            height: `${(day.study / 5) * 100}px`,
                            backgroundColor: 'var(--soft-blue)'
                          }}
                        />
                        <div 
                          className="bar wellness" 
                          style={{ 
                            height: `${(day.wellness / 5) * 100}px`,
                            backgroundColor: 'var(--text-grey)'
                          }}
                        />
                      </div>
                      <span className="bar-label">{day.day}</span>
                    </div>
                  ))}
                </div>
                
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'var(--primary-green)' }}></div>
                    <span>Fitness</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'var(--soft-blue)' }}></div>
                    <span>Study</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'var(--text-grey)' }}></div>
                    <span>Wellness</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom - Streak Tracker */}
          <div className="analytics-section streak-section">
            <Card className="streak-tracker">
              <h3>Your Streak Tracker</h3>
              <div className="streak-calendar">
                {Array.from({ length: 30 }, (_, i) => {
                  const isActive = i < getStreakDays();
                  const isToday = i === getStreakDays() - 1;
                  
                  return (
                    <div 
                      key={i} 
                      className={`streak-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              
              <div className="streak-stats">
                <div className="streak-stat">
                  <span className="streak-number">{getStreakDays()}</span>
                  <span className="streak-label">Current Streak</span>
                </div>
                <div className="streak-stat">
                  <span className="streak-number">23</span>
                  <span className="streak-label">Longest Streak</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;