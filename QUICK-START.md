# Quick Start Guide

## 🚀 Start the Application

### Method 1: Using the startup script
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Method 2: Manual startup

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 📋 Prerequisites Checklist

- [x] Node.js installed
- [x] Frontend dependencies installed (`npm install`)
- [x] Backend dependencies installed (`cd server && npm install`)
- [ ] MongoDB running (local or Atlas)

## 🔌 Connection Status

The frontend and backend are now connected:
- ✓ Vite proxy configured to forward `/api` to backend
- ✓ Axios interceptors set up for authentication
- ✓ All API endpoints mapped to backend routes
- ✓ CORS enabled on backend

## 🧪 Test the Connection

1. Start MongoDB: `mongod`
2. Start backend: `cd server && npm run dev`
3. Start frontend: `npm run dev`
4. Visit: http://localhost:5173
5. Try registering or logging in

## 📍 Important URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Backend Health Check: http://localhost:5000/

## 🔑 Default Test Users

You'll need to register new users as the database is empty initially.

## ⚙️ What Changed

1. **vite.config.ts**: Added proxy to forward API calls to backend
2. **src/utils/api.js**: Replaced mock data with real API calls
3. **server/.env**: Created environment configuration
4. **All frontend API calls**: Now use real backend endpoints

## 📚 Next Steps

- Register a new user
- Test login functionality
- Create jobs (as recruiter)
- Apply for jobs (as student)
- View admin dashboard (as admin)

For detailed documentation, see `SETUP.md`
