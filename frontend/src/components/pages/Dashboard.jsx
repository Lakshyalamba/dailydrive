import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import WelcomeHeader from '../common/WelcomeHeader';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockCourses';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Simulate loading user-specific data
      setTimeout(() => setLoading(false), 500);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-large"></div>
      </div>
    );
  }

  const enrolledCourses = courses.filter(course => course.progress > 0).slice(0, 3);
  const recentActivities = user.recentActivity;
  const goals = user.goals;
  
  const notifications = [
    { id: 1, type: 'reminder', message: `Keep up your ${user.stats.streakDays}-day streak!`, time: '10 min ago' },
    { id: 2, type: 'achievement', message: `You've completed ${user.stats.coursesCompleted} courses!`, time: '1 hour ago' },
    { id: 3, type: 'course', message: 'New modules available in your courses', time: '3 hours ago' }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-large"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <WelcomeHeader />

        <div className="dashboard-grid">
          {/* Progress Overview */}
          <Card className="progress-overview">
            <div className="card-header">
              <h3>Today's Progress</h3>
            </div>
            <div className="progress-categories">
              <div className="category-progress">
                <div className="category-header">
                  <span className="category-icon fitness"></span>
                  <span className="category-name">Fitness</span>
                </div>
                <ProgressBar 
                  progress={user.progress.fitness.weeklyCompleted}
                  max={user.progress.fitness.weeklyGoal}
                  label={`${user.progress.fitness.weeklyCompleted}/${user.progress.fitness.weeklyGoal} workouts`}
                />
              </div>
              <div className="category-progress">
                <div className="category-header">
                  <span className="category-icon study"></span>
                  <span className="category-name">Study</span>
                </div>
                <ProgressBar 
                  progress={user.progress.study.weeklyCompleted}
                  max={user.progress.study.weeklyGoal}
                  label={`${user.progress.study.weeklyCompleted}/${user.progress.study.weeklyGoal} hours`}
                />
              </div>
              <div className="category-progress">
                <div className="category-header">
                  <span className="category-icon wellness"></span>
                  <span className="category-name">Wellness</span>
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
          <Card className="my-courses">
            <div className="card-header">
              <h3>My Courses</h3>
              <Link to="/courses">
                <Button variant="outline" size="small">View All</Button>
              </Link>
            </div>
            <div className="courses-list">
              {enrolledCourses.map(course => (
                <div key={course.id} className="course-item">
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>{course.instructor.name}</p>
                  </div>
                  <div className="course-progress">
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
          <Card className="goals-section">
            <div className="card-header">
              <h3>Current Goals</h3>
              <Button variant="outline" size="small">Add Goal</Button>
            </div>
            <div className="goals-list">
              {goals.map(goal => (
                <div key={goal.id} className="goal-item">
                  <div className="goal-info">
                    <h4>{goal.name}</h4>
                    <p>Category: {goal.category}</p>
                  </div>
                  <div className="goal-progress">
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