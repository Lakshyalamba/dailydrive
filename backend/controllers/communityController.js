import pool from '../config/database.js';

export const getAllPosts = async (req, res) => {
  try {
    const { rows: posts } = await pool.query(
      'SELECT cp.id, cp.title, cp.content, cp.likes_count, cp.created_at, u.username as author_name FROM community_posts cp JOIN users u ON cp.user_id = u.id ORDER BY cp.created_at DESC'
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
    const { rows: result } = await pool.query(
      'INSERT INTO community_posts (user_id, title, content, likes_count, created_at) VALUES ($1, $2, $3, 0, NOW()) RETURNING id',
      [userId, title, content]
    );

    const { rows: newPost } = await pool.query(
      'SELECT cp.id, cp.title, cp.content, cp.likes_count, cp.created_at, u.username as author_name FROM community_posts cp JOIN users u ON cp.user_id = u.id WHERE cp.id = $1',
      [result[0].id]
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
    const result = await pool.query(
      'UPDATE community_posts SET likes_count = likes_count + 1 WHERE id = $1',
      [postId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { rows: post } = await pool.query(
      'SELECT likes_count FROM community_posts WHERE id = $1',
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
    const { rows: posts } = await pool.query(
      'SELECT cp.id, cp.title, cp.content, cp.likes_count, cp.created_at, u.username as author_name, u.id as author_id FROM community_posts cp JOIN users u ON cp.user_id = u.id WHERE cp.id = $1',
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
