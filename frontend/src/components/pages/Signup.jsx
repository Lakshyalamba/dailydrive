import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Signup = () => {
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      setErrors({ general: 'Please fill in all fields' });
      return;
    }
    
    try {
      await signup(formData.username, formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: error.message || 'Failed to create account. Please try again.' });
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <Card className="login-card">
            <div className="login-header">
              <h2>Create Account</h2>
              <p>Join DailyDrive and start your journey</p>
            </div>

            {errors.general && (
              <div className="error-message">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <Input
                type="text"
                name="username"
                label="Username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                required
              />

              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <Button 
                type="submit" 
                size="large" 
                loading={loading}
                className="login-button"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            <div className="login-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="register-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;