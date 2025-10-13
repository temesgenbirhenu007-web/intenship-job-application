import express from 'express';
import {
  applyForJob,
  getStudentApplications,
  getJobApplicants,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/job/:jobId', protect, authorize('student'), applyForJob);
router.get('/student/:studentId', protect, getStudentApplications);
router.get('/job/:jobId/applicants', protect, authorize('recruiter'), getJobApplicants);
router.put('/:id/status', protect, authorize('recruiter'), updateApplicationStatus);

export default router;
