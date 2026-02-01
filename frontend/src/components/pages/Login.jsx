import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { login, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('reset') === 'success') {
      setSuccessMessage('Password reset successful! Please login with your new password.');
    }
  }, [searchParams]);

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

  const handleDemoLogin = () => {
    setFormData({
      email: 'dailydrive@gmail.com',
      password: 'happydrive'
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors({ general: 'Please fill in all fields' });
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Invalid email or password. Please try again.' });
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <Card className="login-card">
            <div className="login-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your DailyDrive account</p>
            </div>

            <div className="demo-account-box">
              <div className="demo-header">
                <span className="demo-badge">Demo Account</span>
              </div>
              <div className="demo-credentials">
                <p><strong>Email:</strong> dailydrive@gmail.com</p>
                <p><strong>Password:</strong> happydrive</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="small"
                onClick={handleDemoLogin}
                className="demo-button"
              >
                Use Demo Account
              </Button>
            </div>

            {errors.general && (
              <div className="error-message">
                {errors.general}
              </div>
            )}

            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
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
                placeholder="Enter your password"
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
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="login-footer">
              <div className="forgot-password">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="register-link">
                  Sign up here
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;