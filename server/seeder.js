import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import { mockUsers } from './data/mockData.js'; // adjust the path if different

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');

    // Optional: clear existing users before seeding
    await User.deleteMany();
    console.log('🧹 Existing users deleted');

    // Insert mock users (they will be hashed automatically by pre-save hook)
    for (const mockUser of mockUsers) {
      const user = new User(mockUser);
      await user.save();
      console.log(`✅ User created: ${mockUser.email}`);
    }

    console.log('🎉 All mock users inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('❌ Database seeding failed:', err);
    process.exit(1);
  });
