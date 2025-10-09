import axios from 'axios';
import { mockUsers, mockJobs, mockApplications, mockRecruiters } from '../data/mockData';

const API_BASE_URL = '/api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (email, password) => {
    await delay(800);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return { ...userWithoutPassword, token: 'mock-jwt-token-' + user.id };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    await delay(1000);
    const newUser = {
      id: Date.now(),
      ...userData,
      token: 'mock-jwt-token-' + Date.now(),
    };
    return newUser;
  },
};

export const jobAPI = {
  getAllJobs: async (filters = {}) => {
    await delay(600);
    let jobs = [...mockJobs];

    if (filters.search) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location) {
      jobs = jobs.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.category) {
      jobs = jobs.filter(job => job.category === filters.category);
    }

    if (filters.type) {
      jobs = jobs.filter(job => job.type === filters.type);
    }

    return jobs;
  },

  getJobById: async (id) => {
    await delay(400);
    return mockJobs.find(job => job.id === parseInt(id));
  },

  createJob: async (jobData) => {
    await delay(800);
    const newJob = {
      id: Date.now(),
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      applicants: 0,
    };
    return newJob;
  },

  updateJob: async (id, jobData) => {
    await delay(700);
    return { id, ...jobData };
  },

  deleteJob: async (id) => {
    await delay(500);
    return { success: true };
  },

  getRecruiterJobs: async (recruiterId) => {
    await delay(600);
    return mockJobs.filter(job => job.postedBy === recruiterId);
  },
};

export const applicationAPI = {
  applyForJob: async (jobId, applicationData) => {
    await delay(800);
    const newApplication = {
      id: Date.now(),
      jobId,
      ...applicationData,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    return newApplication;
  },

  getStudentApplications: async (studentId) => {
    await delay(600);
    const applications = mockApplications.filter(app => app.studentId === studentId);
    return applications.map(app => ({
      ...app,
      job: mockJobs.find(job => job.id === app.jobId),
    }));
  },

  getJobApplicants: async (jobId) => {
    await delay(600);
    const applications = mockApplications.filter(app => app.jobId === jobId);
    return applications.map(app => ({
      ...app,
      student: mockUsers.find(user => user.id === app.studentId),
    }));
  },

  updateApplicationStatus: async (applicationId, status) => {
    await delay(500);
    return { id: applicationId, status };
  },
};

export const userAPI = {
  updateProfile: async (userId, userData) => {
    await delay(700);
    return { id: userId, ...userData };
  },

  getAllUsers: async () => {
    await delay(600);
    return [...mockUsers, ...mockRecruiters];
  },

  approveRecruiter: async (recruiterId) => {
    await delay(500);
    return { id: recruiterId, approved: true };
  },

  blockUser: async (userId) => {
    await delay(500);
    return { id: userId, blocked: true };
  },
};

export const statsAPI = {
  getAdminStats: async () => {
    await delay(600);
    return {
      totalStudents: 150,
      totalRecruiters: 45,
      totalJobs: 230,
      totalApplications: 1250,
      pendingRecruiters: 8,
      activeJobs: 180,
    };
  },
};

export default api;
