import mysql from 'mysql2/promise';

export const testDirectConnection = async () => {
  try {
    console.log('🔄 Testing direct connection...');
    
    const connection = await mysql.createConnection({
      host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      user: '2wfR8uMSH4X18bk.root',
      password: 'yf7Ehgs2hc5zom9g',
      database: 'test',
      ssl: false,
      connectTimeout: 60000
    });
    
    console.log('✅ Direct connection successful');
    
    const [rows] = await connection.execute('SELECT 1 as test, DATABASE() as db, VERSION() as version');
    console.log('✅ Query result:', rows[0]);
    
    await connection.end();
    return true;
    
  } catch (error) {
    console.error('❌ Direct connection failed:', error.message);
    console.error('❌ Error details:', {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState
    });
    return false;
  }
};

export const createAlternativePool = () => {
  return mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '2wfR8uMSH4X18bk.root',
    password: 'yf7Ehgs2hc5zom9g',
    database: 'test',
    ssl: false,
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0,
    connectTimeout: 60000
  });
};