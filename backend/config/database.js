import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1:3306',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'lakshya266',
  database: process.env.DB_NAME || 'dailydrive',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

export default pool;