import User from '../models/User.js';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Resolve path to frontend mock data (ESM safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockDataPath = path.resolve(__dirname, '../../src/data/mockData.js');

export default async function seedAdminFromMock() {
  try {
    // Dynamically import to avoid bundlers and allow runtime path resolution
    const { mockUsers } = await import(pathToFileURL(mockDataPath).href);
    const adminMock = mockUsers.find((u) => u.role === 'admin');

    if (!adminMock) {
      console.log('[seed] No admin user found in mock data');
      return;
    }

    const existing = await User.findOne({ email: adminMock.email });
    if (existing) {
      console.log(`[seed] Admin already exists: ${adminMock.email}`);
      return;
    }

    await User.create({
      name: adminMock.name || 'Admin',
      email: adminMock.email,
      password: adminMock.password || 'password123',
      role: 'admin',
    });

    console.log(`[seed] Seeded admin user from mock data: ${adminMock.email}`);
  } catch (err) {
    console.error('[seed] Failed to seed admin from mock data:', err?.message || err);
  }
}
