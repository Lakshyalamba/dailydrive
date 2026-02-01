# DailyDrive 🚀

<div align="center">

**Transform Your Team's Potential**

A comprehensive employee development platform combining fitness programs, skill-building courses, and collaborative learning to drive engagement and performance.

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Documentation](#project-structure)

</div>

---

## 📋 Overview

DailyDrive is a modern HR-focused self-improvement platform designed to empower organizations with comprehensive employee development tools. The platform integrates three core pillars of personal growth:

- 🏃 **Fitness & Health** - Comprehensive fitness programs and health tracking
- 📚 **Study & Learning** - Skill-building courses and professional development
- 🧘 **Mindfulness & Wellness** - Mental health practices and stress management

## ✨ Features

### Core Functionality

- **User Authentication & Authorization**
  - Secure JWT-based authentication
  - Role-based access control
  - Profile management with photo upload

- **Curriculum Management**
  - Three specialized tracks: Fitness, Study, and Mindfulness
  - Progress tracking across all courses
  - Personalized learning paths

- **Analytics & Insights**
  - Detailed progress analytics with interactive charts
  - Performance metrics and insights
  - Export reports as PDF

- **Community Engagement**
  - User testimonials and success stories
  - Community posts and interactions
  - Collaborative learning environment

- **Goal Setting & Tracking**
  - Custom daily focus goals
  - Progress monitoring
  - Achievement tracking

### Modern UI/UX

- Responsive design for all devices
- Glassmorphism effects and modern aesthetics
- Smooth animations and transitions
- Dark mode support
- Interactive data visualizations

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Charts**: Recharts
- **Icons**: React Icons
- **Notifications**: React Toastify
- **PDF Generation**: jsPDF
- **Styling**: CSS3 with modern features (gradients, animations, glassmorphism)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (TiDB Cloud)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt.js
- **File Processing**: CSV Writer, PDFKit
- **CORS**: Enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lakshyalamba/dailydrive.git
   cd dailydrive
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=your_database_host
   DB_PORT=4000
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```

   Start the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5001
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: https://dailydrive-anfy.vercel.app/

## 📁 Project Structure

```
dailydrive/
├── backend/
│   ├── config/          # Database and configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── common/  # Shared components (Navbar, Button, etc.)
│   │   │   └── pages/   # Page components
│   │   ├── contexts/    # React Context providers
│   │   ├── utils/       # Helper functions
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # React entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload

### Frontend
- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/enroll` - Enroll in course
- `PUT /api/courses/progress` - Update course progress

### Analytics
- `GET /api/analytics/stats` - Get user statistics
- `GET /api/analytics/progress` - Get progress data

### Community
- `GET /api/community/posts` - Get community posts
- `POST /api/community/posts` - Create new post
- `GET /api/testimonials` - Get testimonials

## 🎨 UI Components

- **Modern Landing Page** - Hero section, stats counter, curriculum showcase
- **Interactive Navigation** - Glassmorphism navbar with smooth animations
- **Dashboard** - Comprehensive user dashboard with analytics
- **Course Cards** - Beautiful course displays with hover effects
- **Profile Management** - User profile with photo upload
- **Analytics Charts** - Interactive progress visualizations
- **Responsive Forms** - Login, registration, and data entry forms

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation and sanitization
- Secure environment variable management

## 📊 Database Schema

The application uses MySQL with the following main tables:
- `users` - User accounts and profiles
- `courses` - Course information
- `enrollments` - User course enrollments
- `progress` - Course progress tracking
- `daily_focus` - Daily goal tracking
- `posts` - Community posts
- `testimonials` - User testimonials

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Lakshya** - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- All open-source contributors

---

<div align="center">

**Built with ❤️ for employee development**

</div>
