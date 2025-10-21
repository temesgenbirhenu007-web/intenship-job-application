import axios from 'axios';

const API_BASE_URL = '/api';

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

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    throw error.response?.data || error;
  }
);

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },
};

export const jobAPI = {
  getAllJobs: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.location) params.append('location', filters.location);
    if (filters.category) params.append('category', filters.category);
    if (filters.type) params.append('type', filters.type);

    const response = await api.get(`/jobs?${params.toString()}`);
    return response;
  },

  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response;
  },

  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response;
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response;
  },

  getRecruiterJobs: async () => {
    const response = await api.get('/jobs/recruiter/my-jobs');
    return response;
  },
};

export const applicationAPI = {
  applyForJob: async (jobId, applicationData) => {
    const response = await api.post('/applications', { jobId, ...applicationData });
    return response;
  },

  getStudentApplications: async () => {
    const response = await api.get('/applications/student/my-applications');
    return response;
  },

  getJobApplicants: async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}/status`, { status });
    return response;
  },
};

export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response;
  },

  getAllUsers: async () => {
    const response = await api.get('/users');
    return response;
  },

  approveRecruiter: async (recruiterId) => {
    const response = await api.put(`/users/${recruiterId}/approve`);
    return response;
  },

  blockUser: async (userId) => {
    const response = await api.put(`/users/${userId}/block`);
    return response;
  },
};

export const statsAPI = {
  getAdminStats: async () => {
    const response = await api.get('/stats/admin');
    return response;
  },

  getRecruiterStats: async () => {
    const response = await api.get('/stats/recruiter');
    return response;
  },

  getStudentStats: async () => {
    const response = await api.get('/stats/student');
    return response;
  },
};

export default api;
