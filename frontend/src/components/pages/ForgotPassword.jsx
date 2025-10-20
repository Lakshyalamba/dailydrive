import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email exists in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('dailydrive_users') || '{}');
      if (!storedUsers[email]) {
        setError('No account found with this email address');
        setLoading(false);
        return;
      }

      // Generate reset token and store it
      const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const resetTokens = JSON.parse(localStorage.getItem('dailydrive_reset_tokens') || '{}');
      resetTokens[resetToken] = {
        email,
        expires: Date.now() + 3600000 // 1 hour
      };
      localStorage.setItem('dailydrive_reset_tokens', JSON.stringify(resetTokens));

      setMessage(`Password reset link sent to ${email}. Check your email and click the link to reset your password.`);
      console.log(`Reset link: ${window.location.origin}/reset-password?token=${resetToken}`);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <Card className="login-card">
            <div className="login-header">
              <h2>Reset Password</h2>
              <p>Enter your email to receive a password reset link</p>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {message && (
              <div className="success-message">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button 
                type="submit" 
                size="large" 
                loading={loading}
                className="login-button"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;