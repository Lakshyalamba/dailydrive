import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const username = name?.trim();

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  try {
    const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { rows: resultRows } = await pool.query(
      'INSERT INTO users (username, email, password_hash, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
      [username, email, hashedPassword]
    );

    const token = generateToken(resultRows[0].id);
    
    res.status(201).json({
      user: { id: resultRows[0].id, name: username, email },
      token
    });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { rows: users } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);
    
    const token = generateToken(user.id);
    
    res.json({
      user: { id: user.id, name: user.username, email: user.email },
      token
    });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { rows: users } = await pool.query(
      'SELECT id, username as name, email, created_at, last_login FROM users WHERE id = $1',
      [req.user.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Failed to get profile:', error.message);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};
