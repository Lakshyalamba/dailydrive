import pool from '../config/database.js';

export const getAllPosts = async (req, res) => {
  try {
    const [posts] = await pool.execute(
      'SELECT cp.id, cp.title, cp.content, cp.likes_count, cp.created_at, u.name as author_name FROM community_posts cp JOIN users u ON cp.user_id = u.id ORDER BY cp.created_at DESC'
    );

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get posts' });
  }
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO community_posts (user_id, title, content, likes_count, created_at) VALUES (?, ?, ?, 0, NOW())',
      [userId, title, content]
    );

    const [newPost] = await pool.execute(
      'SELECT cp.id, cp.title, cp.content, cp.likes_count, cp.created_at, u.name as author_name FROM community_posts cp JOIN users u ON cp.user_id = u.id WHERE cp.id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost[0]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const [result] = await pool.execute(
      'UPDATE community_posts SET likes_count = likes_count + 1 WHERE id = ?',
      [postId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const [post] = await pool.execute(
      'SELECT likes_count FROM community_posts WHERE id = ?',
      [postId]
    );

    res.json({
      message: 'Post liked successfully',
      likes_count: post[0].likes_count
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to like post' });
  }
};

export const getSinglePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const [posts] = await pool.execute(
      'SELECT cp.id, cp.title, cp.content, cp.likes_count, cp.created_at, u.name as author_name, u.id as author_id FROM community_posts cp JOIN users u ON cp.user_id = u.id WHERE cp.id = ?',
      [postId]
    );

    if (posts.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post: posts[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get post' });
  }
};