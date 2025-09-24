import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { mockApi } from '../../utils/mockApi';
import { courses } from '../../data/mockCourses';
import './CoursePage.css';

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="course-loading">
        <div className="spinner-large"></div>
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
            {courses.map(course => (
              <Card key={course.id} hover className="course-card" onClick={() => handleCourseClick(course.id)}>
                <div className="course-thumbnail">
                  <div className="placeholder-thumbnail">
                    <div className={`category-icon ${course.category}`}></div>
                  </div>
                  {course.progress > 0 && (
                    <div className="enrolled-badge">Enrolled</div>
                  )}
                </div>
                
                <div className="course-content">
                  <div className="course-meta">
                    <span className="course-category">{course.category}</span>
                    <span className="course-rating">★ {course.rating}</span>
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
                  
                  {course.progress > 0 && (
                    <ProgressBar 
                      progress={course.progress}
                      label="Your Progress"
                      size="small"
                    />
                  )}
                </div>
                
                <div className="course-footer">
                  <div className="course-price">
                    <span className="price free-badge">FREE</span>
                  </div>
                  <Button 
                    variant={course.progress > 0 ? 'outline' : 'primary'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id);
                    }}
                  >
                    {course.progress > 0 ? 'Continue' : 'View Course'}
                  </Button>
                </div>
              </Card>
            ))}
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
                    ✓ Successfully enrolled! You can now start learning.
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
                <div className="play-button">▶</div>
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
                    <span>4.8 ★ Instructor Rating</span>
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
                  <div className="rating-stars">★★★★★</div>
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
                        <div className="review-rating">★★★★★</div>
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