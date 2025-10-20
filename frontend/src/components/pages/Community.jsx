import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import SkeletonLoader from '../common/SkeletonLoader';
import { useAuth } from '../../contexts/AuthContext';
import { mockApi } from '../../utils/mockApi';
import './Community.css';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📋' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'study', name: 'Study', icon: '📚' },
    { id: 'wellness', name: 'Wellness', icon: '🧘' },
    { id: 'general', name: 'General', icon: '💬' }
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await mockApi.getCommunityPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim() || !user) return;

    setSubmitting(true);
    try {
      const postData = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        author: {
          name: user.name,
          avatar: user.profilePhoto || null
        },
        createdAt: 'Just now',
        likes: 0,
        comments: 0
      };
      
      setPosts(prev => [postData, ...prev]);
      setNewPost({ title: '', content: '', category: 'general' });
      setShowCreatePost(false);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleJoinDiscussion = (postId) => {
    console.log('Joining discussion for post:', postId);
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  if (loading) {
    return (
      <div className="community">
        <div className="container">
          <div className="community-header">
            <div className="header-content">
              <h1>Community</h1>
              <p>Connect, share, and grow together with fellow learners</p>
            </div>
            <Button>Create Post</Button>
          </div>
          <div className="community-layout">
            <div className="community-sidebar">
              <Card className="categories-card">
                <h3>Categories</h3>
                <SkeletonLoader type="dashboard" count={1} />
              </Card>
            </div>
            <div className="community-main">
              <SkeletonLoader type="post" count={4} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="community">
      <div className="container">
        <div className="community-header">
          <div className="header-content">
            <h1>Community</h1>
            <p>Connect, share, and grow together with fellow learners</p>
          </div>
          <Button onClick={() => setShowCreatePost(true)}>
            Create Post
          </Button>
        </div>

        <div className="community-layout">
          {/* Sidebar */}
          <div className="community-sidebar">
            <Card className="categories-card">
              <h3>Categories</h3>
              <div className="categories-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="community-stats">
              <h3>Community Stats</h3>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="stat-number">15.4K</span>
                  <span className="stat-label">Members</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2.3K</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">8.7K</span>
                  <span className="stat-label">Comments</span>
                </div>
              </div>
            </Card>

            <Card className="active-groups">
              <h3>Active Groups</h3>
              <div className="groups-list">
                <div className="group-item">
                  <div className="group-avatar">💪</div>
                  <div className="group-info">
                    <h4>Fitness Warriors</h4>
                    <p>1.2K members</p>
                  </div>
                  <Button variant="outline" size="small">Join</Button>
                </div>
                <div className="group-item">
                  <div className="group-avatar">📚</div>
                  <div className="group-info">
                    <h4>Study Buddies</h4>
                    <p>890 members</p>
                  </div>
                  <Button variant="outline" size="small">Join</Button>
                </div>
                <div className="group-item">
                  <div className="group-avatar">🧘</div>
                  <div className="group-info">
                    <h4>Mindful Living</h4>
                    <p>654 members</p>
                  </div>
                  <Button variant="outline" size="small">Join</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="community-main">
            {/* Create Post Modal */}
            {showCreatePost && (
              <div className="modal-overlay">
                <Card className="create-post-modal">
                  <div className="modal-header">
                    <h3>Create New Post</h3>
                    <button 
                      className="modal-close"
                      onClick={() => setShowCreatePost(false)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <form onSubmit={handleCreatePost} onClick={e => e.stopPropagation()}>
                    <Input
                      label="Title"
                      placeholder="What's on your mind?"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                    
                    <div className="input-group">
                      <label className="input-label">Category</label>
                      <select 
                        className="input"
                        value={newPost.category}
                        onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                      >
                        <option value="general">General</option>
                        <option value="fitness">Fitness</option>
                        <option value="study">Study</option>
                        <option value="wellness">Wellness</option>
                      </select>
                    </div>
                    
                    <div className="input-group">
                      <label className="input-label">Content</label>
                      <textarea
                        className="input textarea"
                        placeholder="Share your thoughts, experiences, or questions..."
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        rows={6}
                        required
                      />
                    </div>
                    
                    <div className="modal-actions">
                      <Button 
                        type="button" 
                        variant="secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowCreatePost(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        loading={submitting}
                        disabled={!newPost.title.trim() || !newPost.content.trim()}
                      >
                        {submitting ? 'Posting...' : 'Post'}
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
            )}

            {/* Posts Feed */}
            <div className="posts-feed">
              {filteredPosts.length === 0 ? (
                <Card className="empty-state">
                  <div className="empty-content">
                    <div className="empty-icon">📝</div>
                    <h3>No posts yet</h3>
                    <p>Be the first to start a conversation in this category!</p>
                    <Button onClick={() => setShowCreatePost(true)}>
                      Create First Post
                    </Button>
                  </div>
                </Card>
              ) : (
                filteredPosts.map(post => (
                  <Card key={post.id} className="post-card" hover>
                    <div className="post-header">
                      <div className="post-author">
                        <div className="author-avatar">
                          <span>{post.author.name.charAt(0)}</span>
                        </div>
                        <div className="author-info">
                          <h4>{post.author.name}</h4>
                          <span className="post-date">{post.createdAt}</span>
                        </div>
                      </div>
                      <div className="post-header-right">
                        <div className="post-category">
                          <span className={`category-badge ${post.category}`}>
                            {post.category}
                          </span>
                        </div>
                        {post.author.name === user?.name && (
                          <button 
                            className="delete-post-btn"
                            onClick={() => handleDeletePost(post.id)}
                            title="Delete post"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="post-content">
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                    </div>
                    
                    <div className="post-actions">
                      <button 
                        className="action-button like"
                        onClick={() => handleLike(post.id)}
                      >
                        <span className="action-icon">👍</span>
                        <span>{post.likes}</span>
                      </button>
                      
                      <button 
                        className="action-button comment"
                        onClick={() => handleJoinDiscussion(post.id)}
                      >
                        <span className="action-icon">💬</span>
                        <span>{post.comments}</span>
                      </button>
                      
                      <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => handleJoinDiscussion(post.id)}
                      >
                        Join Discussion
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;