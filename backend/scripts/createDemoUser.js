import bcrypt from 'bcryptjs';
import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const createDemoUser = async () => {
    try {
        console.log('🔄 Creating demo user...');

        const demoEmail = 'dailydrive@gmail.com';
        const demoPassword = 'happydrive';
        const demoName = 'Demo User';

        // Check if demo user already exists
        const [existing] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [demoEmail]
        );

        if (existing.length > 0) {
            console.log('⚠️  Demo user already exists with ID:', existing[0].id);
            console.log('✅ Demo account ready to use!');
            console.log('   Email:', demoEmail);
            console.log('   Password:', demoPassword);
            process.exit(0);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(demoPassword, 10);

        // Insert demo user
        const [result] = await pool.execute(
            'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())',
            [demoName, demoEmail, hashedPassword]
        );

        console.log('✅ Demo user created successfully!');
        console.log('   User ID:', result.insertId);
        console.log('   Name:', demoName);
        console.log('   Email:', demoEmail);
        console.log('   Password:', demoPassword);

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Failed to create demo user:', error.message);
        process.exit(1);
    }
};

createDemoUser();
