import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Button from '../common/Button';
import Card from '../common/Card';
import { mockApi } from '../../utils/mockApi';
import './Landing.css';

// Custom hook for counting animation
const useCountUp = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!shouldStart || !end) return;

    const startTime = Date.now();
    const endValue = typeof end === 'number' ? end : parseInt(end.toString().replace(/,/g, ''));

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);

      countRef.current = currentCount;
      setCount(currentCount);

      if (progress === 1) {
        clearInterval(timer);
        setCount(endValue);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, shouldStart]);

  return count;
};

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

const Landing = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [statsRef, statsVisible] = useScrollAnimation();

  // Counter animations for stats
  const activeUsersCount = useCountUp(stats.totalUsers, 2000, statsVisible);
  const coursesCompletedCount = useCountUp(stats.coursesCompleted, 2000, statsVisible);
  const communityPostsCount = useCountUp(stats.communityPosts, 2000, statsVisible);
  const successRateCount = useCountUp(stats.successRate, 2000, statsVisible);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [testimonialsRes, statsRes] = await Promise.all([
          mockApi.getTestimonials(),
          mockApi.getStats()
        ]);
        setTestimonials(testimonialsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Error loading landing data:', error);
      }
    };
    loadData();
  }, []);

  const faqData = [
    {
      question: "What makes DailyDrive different?",
      answer: "DailyDrive combines fitness, study schedules, and community support in one platform, with personalized tracking and expert-led courses."
    },
    {
      question: "Are all courses really free?",
      answer: "Yes! All courses on DailyDrive are completely free. We believe everyone deserves access to quality self-improvement resources."
    },
    {
      question: "Are the courses suitable for beginners?",
      answer: "Absolutely! Our courses are designed for all skill levels, with clear progression paths from beginner to advanced."
    },
    {
      question: "How does the community feature work?",
      answer: "Connect with like-minded individuals, share your progress, ask questions, and get support from our active community."
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-animated-bg"></div>
        <div className="container">
          <div className="landing-hero-content">
            <h1 className="landing-hero-title">Transform Your Team's Potential</h1>
            <p className="landing-hero-subtitle">
              Boost Productivity • Enhance Skills • Build Community
            </p>
            <p className="landing-hero-description">
              Empower your organization with our comprehensive employee development platform.
              Combining fitness programs, skill-building courses, and collaborative learning
              to drive engagement and performance.
            </p>
            <div className="landing-hero-cta">
              <Link to="/register">
                <Button size="large" className="hero-primary-btn">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing-stats-section" ref={statsRef}>
        <div className="container">
          <div className="landing-stats-grid">
            <div className={`landing-stat-item ${statsVisible ? 'animate-in' : ''}`}>
              <div className="stat-header">
                <span className="stat-pulse"></span>
                <h3>{activeUsersCount.toLocaleString()}+</h3>
              </div>
              <p>Active Users</p>
            </div>
            <div className={`landing-stat-item ${statsVisible ? 'animate-in' : ''}`}>
              <div className="stat-header">
                <span className="stat-pulse"></span>
                <h3>{coursesCompletedCount.toLocaleString()}+</h3>
              </div>
              <p>Courses Completed</p>
            </div>
            <div className={`landing-stat-item ${statsVisible ? 'animate-in' : ''}`}>
              <div className="stat-header">
                <span className="stat-pulse"></span>
                <h3>{communityPostsCount.toLocaleString()}+</h3>
              </div>
              <p>Community Posts</p>
            </div>
            <div className={`landing-stat-item ${statsVisible ? 'animate-in' : ''}`}>
              <div className="stat-header">
                <span className="stat-pulse"></span>
                <h3>{successRateCount}%</h3>
              </div>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="section">
        <div className="container">
          <h2>Our Curriculum</h2>
          <div className="grid grid-3">
            <Card hover>
              <div className="landing-curriculum-item fitness-bg">
                <h3>Fitness & Health</h3>
                <p>Comprehensive fitness programs, nutrition guidance, and wellness tracking to help you build sustainable healthy habits.</p>
              </div>
            </Card>
            <Card hover>
              <div className="landing-curriculum-item study-bg">
                <h3>Study & Learning</h3>
                <p>Effective study techniques, time management, and learning strategies to maximize your academic and professional growth.</p>
              </div>
            </Card>
            <Card hover>
              <div className="landing-curriculum-item meditation-bg">
                <h3>Mindfulness & Wellness</h3>
                <p>Mental health practices, meditation techniques, and stress management tools for overall well-being.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section landing-benefits-section">
        <div className="container">
          <h2>Why Choose DailyDrive?</h2>
          <div className="landing-benefits-grid">
            <div className="landing-benefit-item">
              <h3>Personalized Goals</h3>
              <p>Set and track custom goals tailored to your lifestyle and aspirations.</p>
            </div>
            <div className="landing-benefit-item">
              <h3>Progress Tracking</h3>
              <p>Detailed analytics and insights to monitor your improvement over time.</p>
            </div>
            <div className="landing-benefit-item">
              <h3>Community Support</h3>
              <p>Connect with like-minded individuals on similar journeys.</p>
            </div>
            <div className="landing-benefit-item">
              <h3>Expert Guidance</h3>
              <p>Learn from certified instructors and industry professionals.</p>
            </div>
            <div className="landing-benefit-item">
              <h3>Time Management</h3>
              <p>Optimize your schedule with smart reminders and productivity tools.</p>
            </div>
            <div className="landing-benefit-item">
              <h3>Knowledge Resources</h3>
              <p>Access curated articles, tutorials, and tips to enhance your skills and understanding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="landing-about-content">
            <div className="landing-about-text">
              <h2>About DailyDrive</h2>
              <p>
                DailyDrive was founded with a simple mission: to make self-improvement accessible,
                engaging, and sustainable for everyone. We believe that small daily actions lead to
                extraordinary results.
              </p>
              <p>
                Our platform combines cutting-edge technology with proven methodologies to help you
                build lasting habits, achieve your goals, and connect with a supportive community.
              </p>
            </div>
            <div className="landing-about-image">
              <div className="landing-about-visual">
                <div className="landing-visual-element">
                  <div className="landing-shape-1"></div>
                  <div className="landing-shape-2"></div>
                  <div className="landing-shape-3"></div>
                  <div className="landing-shape-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section landing-testimonials-section">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="grid grid-3">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} hover>
                <div className="landing-testimonial">
                  <div className="landing-testimonial-content">
                    <p>"{testimonial.content}"</p>
                  </div>
                  <div className="landing-testimonial-author">
                    <div className="landing-author-avatar">
                      <span>{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="landing-author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.course}</p>
                    </div>
                  </div>
                  <div className="landing-testimonial-rating">
                    {Array.from({ length: testimonial.rating }).map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="landing-faq-list">
            {faqData.map((faq, index) => (
              <div key={index} className="landing-faq-item">
                <button
                  className={`landing-faq-question ${openFaq === index ? 'active' : ''}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  <span className="landing-faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                <div className={`landing-faq-answer ${openFaq === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="section">
        <div className="container">
          <h2>Join Our Community</h2>
          <p className="landing-section-subtitle">
            Connect with thousands of motivated individuals on their self-improvement journey
          </p>
          <div className="landing-community-actions">
            <Link to="/community">
              <Button size="large">Join Discussion</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="large">Start Your Journey</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;