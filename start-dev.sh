#!/bin/bash

echo "================================"
echo "Career Connect - Development Setup"
echo "================================"
echo ""

echo "Step 1: Checking if MongoDB is running..."
if pgrep -x "mongod" > /dev/null; then
    echo "✓ MongoDB is running"
else
    echo "⚠ MongoDB is not running"
    echo "Please start MongoDB with: mongod"
    echo ""
fi

echo ""
echo "Step 2: Starting Backend Server (Port 5000)..."
echo "Opening new terminal for backend..."
cd server && npm run dev &
BACKEND_PID=$!

sleep 3

echo ""
echo "Step 3: Starting Frontend Server (Port 5173)..."
echo "Opening new terminal for frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "================================"
echo "✓ Setup Complete!"
echo "================================"
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

wait
