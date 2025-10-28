import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// For now, we'll use a mock database until TiDB connection is resolved
const pool = {
  async getConnection() {
    return {
      async execute(query) {
        console.log('Mock query:', query);
        return [[{ test: 1, db: 'test', version: '8.0.11-TiDB-mock' }]];
      },
      release() {
        console.log('Mock connection released');
      }
    };
  },
  async execute(query) {
    console.log('Mock pool query:', query);
    return [[{ test: 1, db: 'test', version: '8.0.11-TiDB-mock' }]];
  },
  async end() {
    console.log('Mock pool ended');
  }
};

// TODO: Replace with actual TiDB connection once SSL issue is resolved
// const pool = mysql.createPool({
//   host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
//   port: 4000,
//   user: '2wfR8uMSH4X18bk.root',
//   password: 'yf7Ehgs2hc5zom9g',
//   database: 'test',
//   ssl: { rejectUnauthorized: false },
//   connectTimeout: 30000
// });

export const testConnection = async () => {
  try {
    console.log('🔄 Testing mock database connection...');
    const connection = await pool.getConnection();
    console.log('✅ Mock database connected successfully');
    
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Mock query test passed:', rows[0]);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Mock database connection failed:', error.message);
    return false;
  }
};

export default pool;
