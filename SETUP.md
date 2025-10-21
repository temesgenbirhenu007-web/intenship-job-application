# Career Connect - Full Stack Setup Guide

## Architecture Overview

This is a MERN (MongoDB, Express, React, Node.js) stack application with:
- **Frontend**: React + Vite + TailwindCSS (port 5173)
- **Backend**: Express + MongoDB + JWT Authentication (port 5000)
- **Proxy**: Vite dev server proxies `/api` requests to backend

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

#### Frontend:
```bash
npm install
```

#### Backend:
```bash
cd server
npm install
```

### 2. Configure Environment Variables

#### Backend (.env in /server directory):
The backend `.env` file is already configured with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careerconnect
JWT_SECRET=your-secret-key-change-this-in-production-12345
NODE_ENV=development
```

**Important**:
- If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string
- Change `JWT_SECRET` to a secure random string in production

### 3. Start MongoDB

If using local MongoDB:
```bash
mongod
```

If using MongoDB Atlas, ensure your connection string is correct in the `.env` file.

### 4. Run the Application

#### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend will run on http://localhost:5173

#### Option 2: Test Backend Only
```bash
cd server
npm start
```

Then visit http://localhost:5000 in your browser. You should see:
```json
{"message": "Career Connect API is running"}
```

## Testing the Connection

1. Start the backend server
2. Start the frontend server
3. Open http://localhost:5173 in your browser
4. Try logging in or registering - API calls will be proxied to the backend

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (recruiter only)
- `PUT /api/jobs/:id` - Update job (recruiter only)
- `DELETE /api/jobs/:id` - Delete job (recruiter only)
- `GET /api/jobs/recruiter/my-jobs` - Get recruiter's jobs

### Applications
- `POST /api/applications` - Apply for job (student only)
- `GET /api/applications/student/my-applications` - Get student's applications
- `GET /api/applications/job/:jobId` - Get job applicants (recruiter only)
- `PUT /api/applications/:id/status` - Update application status

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id/approve` - Approve recruiter (admin only)
- `PUT /api/users/:id/block` - Block user (admin only)

### Stats
- `GET /api/stats/admin` - Get admin dashboard stats
- `GET /api/stats/recruiter` - Get recruiter stats
- `GET /api/stats/student` - Get student stats

## Project Structure

```
career-connect/
├── server/                 # Backend (Express + MongoDB)
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── .env               # Environment variables
│   └── index.js           # Server entry point
│
├── src/                   # Frontend (React + Vite)
│   ├── components/        # Reusable components
│   ├── context/           # React context (Auth)
│   ├── pages/             # Page components
│   ├── routes/            # Route configuration
│   ├── utils/             # API utilities
│   └── main.jsx           # App entry point
│
├── vite.config.ts         # Vite configuration (with proxy)
└── package.json           # Frontend dependencies
```

## User Roles

The application supports three user roles:
1. **Student**: Can search jobs, apply, and manage applications
2. **Recruiter**: Can post jobs, manage jobs, and review applicants
3. **Admin**: Can manage all users and view system stats

## Troubleshooting

### Backend won't start:
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify `.env` file exists in `/server` directory

### Frontend won't connect to backend:
- Ensure backend is running on port 5000
- Check vite.config.ts has correct proxy configuration
- Clear browser cache and restart dev server

### Database connection errors:
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env`
- Ensure network access is allowed (for MongoDB Atlas)

## Production Build

```bash
# Build frontend
npm run build

# The dist/ folder will contain production-ready files
# Serve these files with the backend or any static file server
```

## Notes

- The frontend now uses real API calls instead of mock data
- JWT tokens are stored in localStorage for authentication
- CORS is enabled on the backend for cross-origin requests
- The Vite proxy forwards all `/api/*` requests to `http://localhost:5000`
