import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import WelcomeHeader from '../common/WelcomeHeader';
import SkeletonLoader from '../common/SkeletonLoader';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockCourses';
import './Dashboard.css';

const Dashboard = () => {
  const { user, incrementStreak, getCourseProgress, isCourseUnlocked } = useAuth();
  const [loading, setLoading] = useState(true);
  const [streakMessage, setStreakMessage] = useState('');

  useEffect(() => {
    if (user) {
      // Simulate loading user-specific data
      setTimeout(() => setLoading(false), 500);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner-large"></div>
      </div>
    );
  }

  const enrolledCourses = courses.map(course => ({
    ...course,
    progress: getCourseProgress(course.id, course.modules || 8)
  })).filter(course => (course.progress > 0 || course.isEnrolled) && isCourseUnlocked(course.id)).slice(0, 3);
  const recentActivities = user.recentActivity;
  const goals = user.goals;
  
  const notifications = [
    { id: 1, type: 'reminder', message: `Keep up your ${user.stats.streakDays}-day streak!`, time: '10 min ago' },
    { id: 2, type: 'achievement', message: `You've completed ${user.stats.coursesCompleted} courses!`, time: '1 hour ago' },
    { id: 3, type: 'course', message: 'New modules available in your courses', time: '3 hours ago' }
  ];

  if (loading) {
    return (
      <div className="dashboard-main">
        <div className="container">
          <WelcomeHeader />
          <div className="dashboard-grid dashboard-expanded">
            <SkeletonLoader type="dashboard" count={6} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-main">
      <div className="container">
        <WelcomeHeader />

        <div className="dashboard-grid">
          {/* Progress Overview */}
          <Card className="dashboard-progress-overview">
            <div className="card-header">
              <h3>Today's Progress</h3>
              <Button 
                variant="primary" 
                size="small" 
                onClick={() => {
                  incrementStreak();
                  setStreakMessage('🔥 Streak increased! Great job!');
                  setTimeout(() => setStreakMessage(''), 3000);
                }}
              >
                Complete Day +1
              </Button>
            </div>
            {streakMessage && (
              <div className="dashboard-streak-message">
                {streakMessage}
              </div>
            )}
            <div className="dashboard-progress-categories">
              <div className="dashboard-category-progress fitness">
                <div className="dashboard-category-header">
                  <span className="dashboard-category-name">Fitness</span>
                </div>
                <ProgressBar 
                  progress={user.progress.fitness.weeklyCompleted}
                  max={user.progress.fitness.weeklyGoal}
                  label={`${user.progress.fitness.weeklyCompleted}/${user.progress.fitness.weeklyGoal} workouts`}
                />
              </div>
              <div className="dashboard-category-progress study">
                <div className="dashboard-category-header">
                  <span className="dashboard-category-name">Study</span>
                </div>
                <ProgressBar 
                  progress={user.progress.study.weeklyCompleted}
                  max={user.progress.study.weeklyGoal}
                  label={`${user.progress.study.weeklyCompleted}/${user.progress.study.weeklyGoal} hours`}
                />
              </div>
              <div className="dashboard-category-progress wellness">
                <div className="dashboard-category-header">
                  <span className="dashboard-category-name">Wellness</span>
                </div>
                <ProgressBar 
                  progress={user.progress.wellness.weeklyCompleted}
                  max={user.progress.wellness.weeklyGoal}
                  label={`${user.progress.wellness.weeklyCompleted}/${user.progress.wellness.weeklyGoal} sessions`}
                />
              </div>
            </div>
          </Card>

          {/* My Courses */}
          <Card className="dashboard-my-courses">
            <div className="card-header">
              <h3>My Courses</h3>
              <Link to="/courses">
                <Button variant="outline" size="small">View All</Button>
              </Link>
            </div>
            <div className="dashboard-courses-list">
              {enrolledCourses.map(course => (
                <div key={course.id} className="dashboard-course-item">
                  <div className="dashboard-course-info">
                    <h4>{course.title}</h4>
                    <p>{course.instructor.name}</p>
                  </div>
                  <div className="dashboard-course-progress">
                    <ProgressBar 
                      progress={course.progress}
                      showPercentage={true}
                      size="small"
                    />
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <Button variant="outline" size="small">Continue</Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* Goals */}
          <Card className="dashboard-goals-section">
            <div className="card-header">
              <h3>Current Goals</h3>
              <Button variant="outline" size="small">Add Goal</Button>
            </div>
            <div className="dashboard-goals-list">
              {goals.map(goal => (
                <div key={goal.id} className="dashboard-goal-item">
                  <div className="dashboard-goal-info">
                    <h4>{goal.name}</h4>
                    <p>Category: {goal.category}</p>
                  </div>
                  <div className="dashboard-goal-progress">
                    <ProgressBar 
                      progress={goal.current}
                      max={goal.target}
                      label={`${goal.current}/${goal.target}`}
                      size="small"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;