import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const setupDatabase = async () => {
    let connection;

    try {
        console.log('🔄 Connecting to TiDB database...');

        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false },
            connectTimeout: 30000
        });

        console.log('✅ Connected to TiDB database');

        // Read and execute users table creation
        const usersTableSQL = fs.readFileSync(
            path.join(__dirname, '../schema/create_users_table.sql'),
            'utf-8'
        );

        console.log('🔄 Creating users table...');
        await connection.execute(usersTableSQL);
        console.log('✅ Users table created successfully');

        // Check if table was created
        const [tables] = await connection.execute('SHOW TABLES');
        console.log('📋 Available tables:', tables);

        await connection.end();
        console.log('✅ Database setup completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        if (connection) await connection.end();
        process.exit(1);
    }
};

setupDatabase();
