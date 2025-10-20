import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import SkeletonLoader from '../common/SkeletonLoader';
import { useAuth } from '../../contexts/AuthContext';
import { mockApi } from '../../utils/mockApi';
import { courses } from '../../data/mockCourses';
import './CoursePage.css';

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseProgress, isCourseUnlocked, unlockCourse } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadCourse = async () => {
      try {
        if (id) {
          const response = await mockApi.getCourse(id);
          setCourse(response.data);
        } else {
          // Show all courses
          const response = await mockApi.getCourses();
          setCourse(null);
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!course) return;
    
    setEnrolling(true);
    try {
      await mockApi.enrollCourse(course.id);
      setCourse(prev => ({ ...prev, progress: 0 }));
      setEnrollmentSuccess(true);
      setTimeout(() => setEnrollmentSuccess(false), 3000);
    } catch (error) {
      console.error('Error enrolling:', error);
    } finally {
      setEnrolling(false);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="courses-catalog">
        <div className="container">
          <div className="catalog-header">
            <h1>Course Catalog</h1>
            <p>Discover courses to accelerate your personal growth</p>
          </div>
          <SkeletonLoader type="course" count={6} />
        </div>
      </div>
    );
  }

  // Course catalog view
  if (!id) {
    return (
      <div className="courses-catalog">
        <div className="container">
          <div className="catalog-header">
            <h1>Course Catalog</h1>
            <p>Discover courses to accelerate your personal growth</p>
          </div>
          
          <div className="courses-grid">
            {courses.map(course => {
              const progress = getCourseProgress(course.id, course.modules || 8);
              const isUnlocked = isCourseUnlocked(course.id);
              return (
              <Card key={course.id} hover className="course-card" onClick={() => handleCourseClick(course.id)}>
                <div className="course-thumbnail">
                  <div className={`placeholder-thumbnail ${!isUnlocked ? 'locked' : ''}`}>
                    {!isUnlocked ? (
                      <div className="lock-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="category-visual">
                        {course.category === 'fitness' && (
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                          </svg>
                        )}
                        {course.category === 'study' && (
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                          </svg>
                        )}
                        {course.category === 'wellness' && (
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  {progress > 0 && isUnlocked && (
                    <div className="enrolled-badge">Enrolled</div>
                  )}
                </div>
                
                <div className="course-content">
                  <div className="course-meta">
                    <span className="course-category">{course.category}</span>
                    <div className="course-rating">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  
                  <div className="course-details">
                    <span>{course.modules} modules</span>
                    <span>{course.duration}</span>
                    <span>{course.enrolled.toLocaleString()} students</span>
                  </div>
                  
                  <div className="instructor-info">
                    <div className="instructor-avatar">
                      <span>{course.instructor.name.charAt(0)}</span>
                    </div>
                    <span>{course.instructor.name}</span>
                  </div>
                  
                  {progress > 0 && (
                    <ProgressBar 
                      progress={progress}
                      label="Your Progress"
                      size="small"
                    />
                  )}
                </div>
                
                <div className="course-footer">
                  <div className="course-price">
                    <span className="price free-badge">FREE</span>
                  </div>
                  {!isUnlocked ? (
                    <Button 
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        unlockCourse(course.id);
                      }}
                    >
                      Unlock Course
                    </Button>
                  ) : (
                    <Button 
                      variant={progress > 0 ? 'outline' : 'primary'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course.id);
                      }}
                    >
                      {progress > 0 ? 'Continue' : 'View Course'}
                    </Button>
                  )}
                </div>
              </Card>
            );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Individual course view
  return (
    <div className="course-detail">
      <div className="container">
        <div className="course-hero">
          <div className="course-hero-content">
            <div className="course-breadcrumb">
              <Link to="/courses">Courses</Link>
              <span>/</span>
              <span>{course.title}</span>
            </div>
            
            <h1>{course.title}</h1>
            <p className="course-subtitle">{course.description}</p>
            
            <div className="course-stats">
              <div className="stat">
                <span className="stat-icon rating"></span>
                <span>{course.rating} ({course.enrolled} reviews)</span>
              </div>
              <div className="stat">
                <span className="stat-icon modules"></span>
                <span>{course.modules} modules</span>
              </div>
              <div className="stat">
                <span className="stat-icon duration"></span>
                <span>{course.duration}</span>
              </div>
              <div className="stat">
                <span className="stat-icon students"></span>
                <span>{course.enrolled.toLocaleString()} students</span>
              </div>
            </div>
            
            {course.progress > 0 ? (
              <div className="enrollment-status">
                <ProgressBar 
                  progress={course.progress}
                  label="Your Progress"
                />
                <Button size="large">Continue Learning</Button>
              </div>
            ) : (
              <div className="enrollment-actions">
                <div className="price-info">
                  <span className="price free-badge">FREE COURSE</span>

                </div>
                {enrollmentSuccess && (
                  <div className="success-message">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Successfully enrolled! You can now start learning.
                  </div>
                )}
                <Button 
                  size="large" 
                  loading={enrolling}
                  onClick={handleEnroll}
                  className="enroll-button"
                >
                  Enroll Now
                </Button>
              </div>
            )}
          </div>
          
          <div className="course-preview">
            <div className="video-preview">
              <div className="video-placeholder">
                <div className="play-button">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span>Course Preview</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="course-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`}
            onClick={() => setActiveTab('curriculum')}
          >
            Curriculum
          </button>
          <button 
            className={`tab ${activeTab === 'instructor' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructor')}
          >
            Instructor
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        
        <div className="course-content-area">
          {activeTab === 'overview' && (
            <Card className="course-overview">
              <h3>What you'll learn</h3>
              <ul className="learning-objectives">
                <li>Master the fundamentals of {course.category}</li>
                <li>Develop sustainable daily habits</li>
                <li>Track your progress effectively</li>
                <li>Connect with a supportive community</li>
                <li>Apply practical techniques in real-world scenarios</li>
              </ul>
              
              <h3>Course Description</h3>
              <p>
                This comprehensive course is designed to help you build lasting habits and achieve your goals in {course.category}. 
                Through a combination of theoretical knowledge and practical exercises, you'll develop the skills and mindset 
                needed for long-term success.
              </p>
              
              <h3>Prerequisites</h3>
              <p>No prior experience required. This course is suitable for beginners and intermediate learners.</p>
            </Card>
          )}
          
          {activeTab === 'curriculum' && (
            <Card className="course-curriculum">
              <h3>Course Modules</h3>
              <div className="modules-list">
                {Array.from({ length: course.modules }, (_, i) => (
                  <div key={i} className="module-item">
                    <div className="module-header">
                      <span className="module-number">{i + 1}</span>
                      <h4>Module {i + 1}: Getting Started</h4>
                      <span className="module-duration">45 min</span>
                    </div>
                    <div className="module-lessons">
                      <div className="lesson">Introduction to {course.category}</div>
                      <div className="lesson">Setting Your Goals</div>
                      <div className="lesson">Building Your Foundation</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {activeTab === 'instructor' && (
            <Card className="instructor-profile">
              <div className="instructor-header">
                <div className="instructor-avatar-large">
                  <span>{course.instructor.name.charAt(0)}</span>
                </div>
                <div className="instructor-info">
                  <h3>{course.instructor.name}</h3>
                  <p>{course.instructor.title}</p>
                  <div className="instructor-stats">
                    <span>
                      4.8 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline; margin: 0 4px;">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      Instructor Rating
                    </span>
                    <span>12,543 Students</span>
                    <span>8 Courses</span>
                  </div>
                </div>
              </div>
              
              <div className="instructor-bio">
                <h4>About the Instructor</h4>
                <p>
                  {course.instructor.name} is a certified expert in {course.category} with over 10 years of experience 
                  helping people achieve their personal development goals. They have worked with thousands of students 
                  and have a proven track record of success.
                </p>
              </div>
            </Card>
          )}
          
          {activeTab === 'reviews' && (
            <Card className="course-reviews">
              <div className="reviews-header">
                <h3>Student Reviews</h3>
                <div className="rating-summary">
                  <span className="rating-number">{course.rating}</span>
                  <div className="rating-stars">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span>({course.enrolled} reviews)</span>
                </div>
              </div>
              
              <div className="reviews-list">
                {[1, 2, 3].map(i => (
                  <div key={i} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-avatar">
                        <span>U</span>
                      </div>
                      <div className="reviewer-info">
                        <h5>User {i}</h5>
                        <div className="review-rating">
                          {[1,2,3,4,5].map(i => (
                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="review-date">2 weeks ago</span>
                    </div>
                    <p className="review-text">
                      This course exceeded my expectations! The content is well-structured and the instructor 
                      explains everything clearly. I've already started implementing what I learned.
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;