import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL (Neon) database connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
  max: 10
});

export const testConnection = async () => {
  try {
    console.log('🔄 Testing PostgreSQL database connection...');
    const client = await pool.connect();
    console.log('✅ PostgreSQL database connected successfully');

    const result = await client.query('SELECT 1 as test, current_database() as db, version() as version');
    console.log('✅ Database query test passed:', result.rows[0]);

    client.release();
    return true;
  } catch (error) {
    console.error('❌ PostgreSQL database connection failed:', error.message);
    return false;
  }
};

export default pool;
