import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import Card from '../common/Card';
import StudyTimer from '../common/StudyTimer';
import MeditationPlayer from '../common/MeditationPlayer';
import { detailedCourses } from '../../data/mockDetailedCourses';
import { courses } from '../../data/mockCourses';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleModuleCompletion, getCourseProgress, isCourseUnlocked } = useAuth();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [studySessions, setStudySessions] = useState(0);
  const [showMeditation, setShowMeditation] = useState(false);
  const [meditationSessions, setMeditationSessions] = useState(0);

  useEffect(() => {
    const courseData = detailedCourses.find(c => c.id === parseInt(id));
    if (courseData) {
      setCourse(courseData);
      const isUnlocked = isCourseUnlocked(courseData.id);
      setIsEnrolled(isUnlocked);
      const calculatedProgress = getCourseProgress(courseData.id, courseData.modules.length);
      setProgress(calculatedProgress);
    }
    setLoading(false);
  }, [id, user?.completedModules, user?.unlockedCourses, getCourseProgress, isCourseUnlocked]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    setProgress(0);
  };

  const handleModuleClick = (moduleId) => {
    if (!isEnrolled) return;
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleBackToCourses = () => {
    navigate('/courses');
  };

  const getRelatedCourses = () => {
    return courses.filter(c => c.id !== parseInt(id) && c.category === course?.category).slice(0, 2);
  };

  const handleSessionComplete = (sessionType) => {
    if (sessionType === 'study') {
      setStudySessions(prev => prev + 1);
    } else if (sessionType === 'meditation') {
      setMeditationSessions(prev => prev + 1);
    }
  };

  const isStudyCourse = course?.category === 'study' || course?.title?.toLowerCase().includes('study');
  const isMeditationCourse = course?.category === 'wellness' || course?.title?.toLowerCase().includes('meditation') || course?.title?.toLowerCase().includes('mindfulness');

  if (loading) {
    return <div className="loading-spinner"><div className="spinner-large"></div></div>;
  }

  if (!course) {
    return <div className="course-not-found">Course not found</div>;
  }

  return (
    <div className="course-detail">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/courses" className="breadcrumb-link">Courses</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{course.title}</span>
        </div>

        {/* Course Header */}
        <div className="course-header">
          <div className="course-header-bg">
            <div className={`course-header-gradient ${course.category}`}></div>
          </div>
          <div className="course-header-content">
            <div className="course-meta">
              <span className={`category-badge ${course.category}`}>{course.category}</span>
              <span className="difficulty-badge">{course.difficulty}</span>
            </div>
            
            <h1 className="course-title">{course.title}</h1>
            <p className="course-description">{course.description}</p>
            
            <div className="course-info-cards">
              <div className="info-card">
                <span className="info-icon">⏱️</span>
                <div className="info-content">
                  <span className="info-label">Duration</span>
                  <span className="info-value">{course.duration}</span>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">📚</span>
                <div className="info-content">
                  <span className="info-label">Modules</span>
                  <span className="info-value">{course.modules.length}</span>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">📊</span>
                <div className="info-content">
                  <span className="info-label">Difficulty</span>
                  <span className="info-value">{course.difficulty}</span>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">👥</span>
                <div className="info-content">
                  <span className="info-label">Students</span>
                  <span className="info-value">{course.enrolledCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Section */}
        <Card className="enrollment-section">
          {isEnrolled ? (
            <div className="enrollment-status">
              <div className="progress-info">
                <h3>Your Progress</h3>
                <ProgressBar progress={progress} label={`${progress}% Complete`} />
                <p className="progress-text">{course.timeSpent} spent • Last accessed: {course.lastAccessed || 'Never'}</p>
              </div>
              <Button size="large" className="continue-btn">Continue Learning</Button>
            </div>
          ) : (
            <div className="enrollment-actions">
              <div className="enrollment-info">
                <h3>Ready to start your journey?</h3>
                <p>Join {course.enrolledCount.toLocaleString()} students already enrolled</p>
                <div className="price-info">
                  <span className="price">FREE</span>
                  <span className="price-note">Full lifetime access</span>
                </div>
              </div>
              <Button size="large" onClick={handleEnroll} className="enroll-btn">
                Enroll Now - FREE
              </Button>
            </div>
          )}
        </Card>

        {/* Study Timer Section - Only for Study courses */}
        {isStudyCourse && isEnrolled && (
          <Card className="study-timer-section">
            <div className="timer-header-controls">
              <h3>Study Timer</h3>
              <Button 
                variant="outline" 
                size="small" 
                onClick={() => setShowTimer(!showTimer)}
              >
                {showTimer ? 'Hide Timer' : 'Show Timer'}
              </Button>
            </div>
            {showTimer && (
              <StudyTimer onSessionComplete={handleSessionComplete} />
            )}
            {studySessions > 0 && (
              <div className="study-stats">
                <p>🎯 Study sessions completed: <strong>{studySessions}</strong></p>
                <p>⏱️ Total study time: <strong>{studySessions * 25} minutes</strong></p>
              </div>
            )}
          </Card>
        )}

        {/* Meditation Player Section - Only for Mindfulness/Meditation courses */}
        {isMeditationCourse && isEnrolled && (
          <Card className="meditation-player-section">
            <div className="meditation-header-controls">
              <h3>Guided Meditation</h3>
              <Button 
                variant="outline" 
                size="small" 
                onClick={() => setShowMeditation(!showMeditation)}
              >
                {showMeditation ? 'Hide Meditation' : 'Show Meditation'}
              </Button>
            </div>
            {showMeditation && (
              <MeditationPlayer onSessionComplete={handleSessionComplete} />
            )}
            {meditationSessions > 0 && (
              <div className="meditation-stats">
                <p>🧘 Meditation sessions completed: <strong>{meditationSessions}</strong></p>
                <p>⏱️ Total meditation time: <strong>{meditationSessions * 10} minutes</strong></p>
              </div>
            )}
          </Card>
        )}

        {/* Modules Section */}
        <Card className="modules-section">
          <h3>Course Modules ({course.modules.length})</h3>
          <div className="modules-list">
            {course.modules.map((module, index) => (
              <div key={module.id} className={`module-item ${!isEnrolled ? 'locked' : ''} ${module.completed ? 'completed' : ''}`}>
                <div className="module-header" onClick={() => handleModuleClick(module.id)}>
                  <div className="module-number">{index + 1}</div>
                  <div className="module-content">
                    <h4>{module.title}</h4>
                    <div className="module-meta">
                      <span>⏱️ {module.duration}</span>
                      <span>📝 {module.lessons} lessons</span>
                    </div>
                  </div>
                  <div className="module-status">
                    {!isEnrolled ? (
                      <span className="lock-icon">🔒</span>
                    ) : (
                      <>
                        <button 
                          className={`module-checkpoint ${user?.completedModules?.[`${course.id}-${module.id}`] ? 'completed' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleModuleCompletion(course.id, module.id, 10);
                            const newProgress = getCourseProgress(course.id, course.modules.length);
                            setProgress(newProgress);
                          }}
                          title={user?.completedModules?.[`${course.id}-${module.id}`] ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          <div className="checkpoint-icon">
                            {user?.completedModules?.[`${course.id}-${module.id}`] ? '✓' : '○'}
                          </div>
                        </button>
                        <span className="expand-icon">{expandedModule === module.id ? '▼' : '▶'}</span>
                      </>
                    )}
                  </div>
                </div>
                {expandedModule === module.id && isEnrolled && (
                  <div className="module-details">
                    <p>{module.description}</p>
                    <div className="improvement-content">
                      <h5>What you'll improve:</h5>
                      <ul className="improvement-list">
                        {module.improvements.map((improvement, i) => (
                          <li key={i}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="materials-content">
                      <h5>How to achieve these improvements:</h5>
                      <ul className="materials-list">
                        {module.materials.map((material, i) => (
                          <li key={i}>{material}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Course Content Preview */}
        <Card className="content-preview">
          <h3>What You'll Learn</h3>
          <div className="learning-grid">
            <div className="learning-outcomes">
              <h4>Learning Outcomes</h4>
              <ul>
                {course.learningOutcomes.map((outcome, index) => (
                  <li key={index}>✓ {outcome}</li>
                ))}
              </ul>
            </div>
            <div className="skills-section">
              <h4>Skills You'll Gain</h4>
              <div className="skills-tags">
                {course.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
          {course.prerequisites.length > 0 && (
            <div className="prerequisites">
              <h4>Prerequisites</h4>
              <ul>
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* Instructor Profile */}
        <Card className="instructor-profile">
          <h3>Meet Your Instructor</h3>
          <div className="instructor-info">
            <div className="instructor-avatar-large">
              <span>{course.instructor.name.charAt(0)}</span>
            </div>
            <div className="instructor-details">
              <h4>{course.instructor.name}</h4>
              <p className="instructor-title">{course.instructor.title}</p>
              <div className="instructor-rating">
                <span>⭐ {course.instructor.rating} instructor rating</span>
              </div>
              <p className="instructor-bio">
                {course.instructor.name} is a certified expert in {course.category} with over 10 years of experience 
                helping people achieve their personal development goals.
              </p>
            </div>
          </div>
        </Card>

        {/* Related Courses */}
        {getRelatedCourses().length > 0 && (
          <Card className="related-courses">
            <h3>More {course.category} Courses</h3>
            <div className="related-courses-grid">
              {getRelatedCourses().map(relatedCourse => (
                <div key={relatedCourse.id} className="related-course-card" onClick={() => navigate(`/courses/${relatedCourse.id}`)}>
                  <div className="related-course-thumbnail">
                    <div className={`category-icon ${relatedCourse.category}`}></div>
                  </div>
                  <div className="related-course-info">
                    <h5>{relatedCourse.title}</h5>
                    <p>{relatedCourse.modules} modules • {relatedCourse.duration}</p>
                    <span className="related-course-rating">⭐ {relatedCourse.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Back to Courses */}
        <div className="back-navigation">
          <Button variant="outline" onClick={handleBackToCourses}>
            ← Back to All Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;