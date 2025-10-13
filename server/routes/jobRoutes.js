import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs,
} from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getAllJobs).post(protect, authorize('recruiter'), createJob);

router
  .route('/:id')
  .get(protect, getJobById)
  .put(protect, authorize('recruiter'), updateJob)
  .delete(protect, authorize('recruiter'), deleteJob);

router.get('/recruiter/:recruiterId', protect, getRecruiterJobs);

export default router;
