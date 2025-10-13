import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import RecruiterProfile from '../models/RecruiterProfile.js';

export const getAdminStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalRecruiters,
      totalJobs,
      totalApplications,
      pendingRecruiters,
      activeJobs,
    ] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'recruiter' }),
      Job.countDocuments(),
      Application.countDocuments(),
      RecruiterProfile.countDocuments({ approved: false }),
      Job.countDocuments({ status: 'active' }),
    ]);

    res.json({
      totalStudents,
      totalRecruiters,
      totalJobs,
      totalApplications,
      pendingRecruiters,
      activeJobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
