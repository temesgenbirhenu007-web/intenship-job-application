# Career Connect Backend

Node.js Express + MongoDB backend for Career Connect job portal.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally or update MONGODB_URI in .env

3. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Jobs
- GET /api/jobs - Get all jobs
- GET /api/jobs/:id - Get job by ID
- POST /api/jobs - Create job (recruiter only)
- PUT /api/jobs/:id - Update job (recruiter only)
- DELETE /api/jobs/:id - Delete job (recruiter only)
- GET /api/jobs/recruiter/:recruiterId - Get recruiter jobs

### Applications
- POST /api/applications/job/:jobId - Apply for job (student only)
- GET /api/applications/student/:studentId - Get student applications
- GET /api/applications/job/:jobId/applicants - Get job applicants (recruiter only)
- PUT /api/applications/:id/status - Update application status (recruiter only)

### Users
- GET /api/users - Get all users (admin only)
- PUT /api/users/:userId - Update user profile
- PUT /api/users/:userId/student-profile - Update student profile
- PUT /api/users/:userId/recruiter-profile - Update recruiter profile
- PUT /api/users/:recruiterId/approve - Approve recruiter (admin only)

### Stats
- GET /api/stats/admin - Get admin statistics (admin only)
