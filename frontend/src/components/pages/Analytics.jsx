import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import SkeletonLoader from '../common/SkeletonLoader';
import { useAuth } from '../../contexts/AuthContext';
import { detailedCourses } from '../../data/mockDetailedCourses';
import jsPDF from 'jspdf';
import './Analytics.css';

const Analytics = () => {
  const { user, getOverallProgress, getCourseProgress } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [user]);

  const exportToPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Background color
    pdf.setFillColor(240, 248, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Header background
    pdf.setFillColor(40, 167, 69);
    pdf.rect(0, 0, pageWidth, 30, 'F');
    
    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DailyDrive Progress Report', pageWidth / 2, 20, { align: 'center' });
    
    // User Info & Stats in two columns
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('User Information', 20, 45);
    pdf.text('Statistics', 110, 45);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Name: ${user.name}`, 20, 55);
    pdf.text(`Email: ${user.email}`, 20, 62);
    pdf.text(`Member Since: ${getUserSpecificData().memberSince}`, 20, 69);
    
    pdf.text(`Streak: ${getStreakDays()} days`, 110, 55);
    pdf.text(`Activities: ${getTotalActivities()}`, 110, 62);
    pdf.text(`Points: ${user.stats.totalPoints}`, 110, 69);
    
    // Course Progress Section
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Course Progress', 20, 85);
    
    let yPos = 95;
    detailedCourses.forEach((course) => {
      const progress = getCourseProgress(course.id, course.modules.length);
      const completedModules = course.modules.filter(module => 
        user?.completedModules?.[`${course.id}-${module.id}`]
      ).length;
      
      // Course background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(15, yPos - 3, pageWidth - 30, 20, 'F');
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${course.title}`, 20, yPos + 3);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${course.category.toUpperCase()}`, 20, yPos + 10);
      pdf.text(`${completedModules}/${course.modules.length} modules`, 70, yPos + 10);
      pdf.text(`${progress}%`, 130, yPos + 10);
      
      // Progress bar
      pdf.setFillColor(220, 220, 220);
      pdf.rect(150, yPos + 7, 30, 3, 'F');
      pdf.setFillColor(40, 167, 69);
      pdf.rect(150, yPos + 7, (30 * progress) / 100, 3, 'F');
      
      yPos += 25;
    });
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    pdf.save(`${user.name.replace(/\s+/g, '_')}_DailyDrive_Progress.pdf`);
  };

  const getStreakDays = () => {
    return user?.stats?.streakDays || 0;
  };

  const getTotalActivities = () => {
    return getOverallProgress();
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
      <div className="analytics">
        <div className="container">
          <div className="analytics-header">
            <div className="header-content">
              <h1>Progress Analytics</h1>
              <p>Track your journey and celebrate your achievements!</p>
            </div>
            <div className="header-controls">
              <div className="export-buttons">
                <Button variant="outline" size="small">Export PDF</Button>
              </div>
            </div>
          </div>
          <div className="analytics-main-grid">
            <SkeletonLoader type="dashboard" count={4} />
          </div>
        </div>
      </div>
    );
  }



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
            <div className="export-buttons">
              <Button variant="outline" size="small" onClick={exportToPDF}>
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Main Grid Layout */}
        <div className="analytics-main-grid">
          {/* Top Row - Goal Completion Donut Chart */}
          <div className="analytics-section metrics-section">
            <Card className="metrics-overview">
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
          </div>

          {/* Time Spent Bar Chart */}
          <div className="analytics-section time-chart-section">
            <Card className="time-chart">
              <h3>Time Spent per Category (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={250}>
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



          {/* Bottom - Dynamic Streak Tracker */}
          <div className="analytics-section streak-section">
            <Card className="streak-tracker">
              <h3>Your Streak Tracker</h3>
              <div className="streak-calendar">
                {Array.from({ length: 30 }, (_, i) => {
                  const daysSinceStart = 30 - i;
                  const isActive = daysSinceStart <= getStreakDays();
                  const isToday = i === 29;
                  const date = new Date();
                  date.setDate(date.getDate() - daysSinceStart + 1);
                  
                  return (
                    <div 
                      key={i} 
                      className={`streak-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}`}
                      title={date.toDateString()}
                    >
                      {date.getDate()}
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
                  <span className="streak-number">{Math.max(getStreakDays(), 23)}</span>
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