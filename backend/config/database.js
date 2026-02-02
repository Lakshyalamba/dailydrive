import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// TiDB Cloud database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  connectTimeout: 30000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const testConnection = async () => {
  try {
    console.log('🔄 Testing TiDB database connection...');
    const connection = await pool.getConnection();
    console.log('✅ TiDB database connected successfully');

    const [rows] = await connection.execute('SELECT 1 as test, DATABASE() as db, VERSION() as version');
    console.log('✅ Database query test passed:', rows[0]);

    connection.release();
    return true;
  } catch (error) {
    console.error('❌ TiDB database connection failed:', error.message);
    return false;
  }
};

export default pool;
