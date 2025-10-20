import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import './Login.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  const [email, setEmail] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link');
      return;
    }

    // Validate token
    const resetTokens = JSON.parse(localStorage.getItem('dailydrive_reset_tokens') || '{}');
    const tokenData = resetTokens[token];

    if (!tokenData) {
      setError('Invalid or expired reset link');
      return;
    }

    if (Date.now() > tokenData.expires) {
      setError('Reset link has expired');
      // Clean up expired token
      delete resetTokens[token];
      localStorage.setItem('dailydrive_reset_tokens', JSON.stringify(resetTokens));
      return;
    }

    setTokenValid(true);
    setEmail(tokenData.email);
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update password in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('dailydrive_users') || '{}');
      if (storedUsers[email]) {
        storedUsers[email].password = formData.password;
        localStorage.setItem('dailydrive_users', JSON.stringify(storedUsers));
      }

      // Invalidate the reset token
      const resetTokens = JSON.parse(localStorage.getItem('dailydrive_reset_tokens') || '{}');
      delete resetTokens[token];
      localStorage.setItem('dailydrive_reset_tokens', JSON.stringify(resetTokens));

      // Redirect to login with success message
      navigate('/login?reset=success');
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="login-page">
        <div className="container">
          <div className="login-container">
            <Card className="login-card">
              <div className="login-header">
                <h2>Invalid Link</h2>
                <p>{error}</p>
              </div>
              <div className="login-footer">
                <p>
                  <Link to="/forgot-password" className="register-link">
                    Request a new reset link
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <Card className="login-card">
            <div className="login-header">
              <h2>Reset Password</h2>
              <p>Enter your new password for {email}</p>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <Input
                type="password"
                name="password"
                label="New Password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button 
                type="submit" 
                size="large" 
                loading={loading}
                className="login-button"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>

            <div className="login-footer">
              <p>
                Remember your password?{' '}
                <Link to="/login" className="register-link">
                  Back to Login
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;