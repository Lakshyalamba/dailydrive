// Removed mysql import
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const setupDatabase = async () => {
    let client;

    try {
        console.log('🔄 Connecting to PostgreSQL database...');

        const { Client } = await import('pg');
        client = new Client({
            connectionString: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 30000
        });

        await client.connect();

        console.log('✅ Connected to PostgreSQL database');

        // Read and execute users table creation
        const usersTableSQL = fs.readFileSync(
            path.join(__dirname, '../schema/create_users_table.sql'),
            'utf-8'
        );

        console.log('🔄 Creating users table...');
        // Execute might contain multiple statements, query handles it
        await client.query(usersTableSQL);
        console.log('✅ Users table created successfully');

        // Check if table was created
        const { rows } = await client.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
        console.log('📋 Available tables:', rows);

        await client.end();
        console.log('✅ Database setup completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        if (client) await client.end();
        process.exit(1);
    }
};

setupDatabase();
