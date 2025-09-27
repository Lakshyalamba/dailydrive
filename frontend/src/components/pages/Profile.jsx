import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profilePhoto: user?.profilePhoto || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="profile-content">
          <Card className="profile-card">
            <div className="profile-avatar-section">
              <div className="avatar-container">
                {formData.profilePhoto ? (
                  <img src={formData.profilePhoto} alt="Profile" className="profile-avatar" />
                ) : (
                  <div className="profile-avatar-placeholder">
                    {formData.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                <label htmlFor="photo-upload" className="avatar-upload-btn">
                  <span>📷</span>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {message && (
              <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="profile-form">
              <Input
                type="text"
                name="username"
                label="Username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />

              <Button 
                type="submit" 
                size="large" 
                loading={loading}
                className="save-button"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Card>

          <Card className="profile-stats">
            <h3>Account Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{user?.stats?.streakDays || 0}</span>
                <span className="stat-label">Day Streak</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{user?.stats?.coursesCompleted || 0}</span>
                <span className="stat-label">Courses Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{user?.stats?.totalPoints || 0}</span>
                <span className="stat-label">Total Points</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;