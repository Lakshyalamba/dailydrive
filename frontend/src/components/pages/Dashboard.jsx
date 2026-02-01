import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaFire } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import WelcomeHeader from '../common/WelcomeHeader';
import SkeletonLoader from '../common/SkeletonLoader';
import DailyFocus from '../common/DailyFocus';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockCourses';
import { detailedCourses } from '../../data/mockDetailedCourses';
import './Dashboard.css';
import '../common/DailyFocus.css';

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

  const enrolledCourses = detailedCourses
    .filter(course => course.isEnrolled || getCourseProgress(course.id, course.modules.length) > 0)
    .map(course => {
      const progress = getCourseProgress(course.id, course.modules.length);
      const completedModules = course.modules.filter((_, index) =>
        user?.completedModules?.[`${course.id}-${index + 1}`]
      );
      const nextModule = course.modules.find((_, index) =>
        !user?.completedModules?.[`${course.id}-${index + 1}`]
      ) || course.modules[course.modules.length - 1];

      return {
        ...course,
        progress,
        nextModule: nextModule.title
      };
    })
    .slice(0, 3);
  const recentActivities = user.recentActivity;
  const goals = user.goals;

  const getCompletionRate = () => {
    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal.current >= goal.target).length;
    return totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  };

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
                  setStreakMessage(<><FaFire /> Streak increased! Great job!</>);
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

          {/* Goal Completion Chart */}
          <Card className="dashboard-goal-chart">
            <h3>Goal Completion</h3>
            <div className="donut-chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Completed', value: getCompletionRate(), fill: '#28a745' },
                      { name: 'Remaining', value: 100 - getCompletionRate(), fill: '#e9ecef' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    <Cell fill="#28a745" />
                    <Cell fill="#e9ecef" />
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center-text">
                <span className="completion-percentage">{getCompletionRate()}%</span>
                <span className="completion-label">Complete</span>
              </div>
            </div>
          </Card>

          {/* Time Spent Chart */}
          <Card className="dashboard-time-chart">
            <h3>Time Spent (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Fitness', hours: user.progress.fitness?.weeklyCompleted || 0 },
                { name: 'Study', hours: user.progress.study?.weeklyCompleted || 0 },
                { name: 'Wellness', hours: user.progress.wellness?.weeklyCompleted || 0 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} hours`, 'Time Spent']} />
                <Bar dataKey="hours" fill="#28a745" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Daily Focus */}
          <DailyFocus />

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
                <Card key={course.id} className="dashboard-course-card">
                  <div className="course-card-header">
                    <h4>{course.title}</h4>
                    <span className="course-instructor">{course.instructor.name}</span>
                  </div>
                  <div className="course-card-progress">
                    <ProgressBar
                      progress={course.progress}
                      showPercentage={true}
                      size="small"
                    />
                    <span className="progress-text">{course.progress}% Complete</span>
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <Button variant="primary" size="small" className="continue-btn">
                      Continue: {course.nextModule}
                    </Button>
                  </Link>
                </Card>
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