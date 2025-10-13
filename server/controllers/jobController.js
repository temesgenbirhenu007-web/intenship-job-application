import Job from '../models/Job.js';
import RecruiterProfile from '../models/RecruiterProfile.js';

export const getAllJobs = async (req, res) => {
  try {
    const { search, location, category, type } = req.query;

    let query = { status: 'active' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    const jobs = await Job.find(query)
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 });

    const jobsWithProfiles = await Promise.all(
      jobs.map(async (job) => {
        const recruiterProfile = await RecruiterProfile.findOne({ user: job.recruiter._id });
        return {
          ...job.toObject(),
          recruiterProfile,
        };
      })
    );

    res.json(jobsWithProfiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('recruiter', 'name email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const recruiterProfile = await RecruiterProfile.findOne({ user: job.recruiter._id });

    res.json({
      ...job.toObject(),
      recruiterProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      category,
      salaryMin,
      salaryMax,
      description,
      requirements,
      status,
    } = req.body;

    const job = await Job.create({
      recruiter: req.user._id,
      title,
      company,
      location,
      type,
      category: category || '',
      salaryMin: salaryMin || 0,
      salaryMax: salaryMax || 0,
      description: description || '',
      requirements: requirements || [],
      status: status || 'active',
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.params.recruiterId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
