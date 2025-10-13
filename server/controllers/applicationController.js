import Application from '../models/Application.js';
import Job from '../models/Job.js';
import StudentProfile from '../models/StudentProfile.js';
import RecruiterProfile from '../models/RecruiterProfile.js';

export const applyForJob = async (req, res) => {
  try {
    const { coverLetter, resumeUrl } = req.body;

    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      student: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    const application = await Application.create({
      job: req.params.jobId,
      student: req.user._id,
      coverLetter: coverLetter || '',
      resumeUrl: resumeUrl || '',
    });

    await Job.findByIdAndUpdate(req.params.jobId, {
      $inc: { applicantsCount: 1 },
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.params.studentId })
      .populate({
        path: 'job',
        populate: {
          path: 'recruiter',
          select: 'name email',
        },
      })
      .sort({ createdAt: -1 });

    const applicationsWithProfiles = await Promise.all(
      applications.map(async (app) => {
        const recruiterProfile = await RecruiterProfile.findOne({ user: app.job.recruiter._id });
        return {
          ...app.toObject(),
          job: {
            ...app.job.toObject(),
            recruiterProfile,
          },
        };
      })
    );

    res.json(applicationsWithProfiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view applicants' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('student', 'name email')
      .sort({ createdAt: -1 });

    const applicationsWithProfiles = await Promise.all(
      applications.map(async (app) => {
        const studentProfile = await StudentProfile.findOne({ user: app.student._id });
        return {
          ...app.toObject(),
          studentProfile,
        };
      })
    );

    res.json(applicationsWithProfiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
