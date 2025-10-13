import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import RecruiterProfile from '../models/RecruiterProfile.js';

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    user.name = req.body.name || user.name;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const { university, degree, graduationYear, skills, resumeUrl } = req.body;

    const profile = await StudentProfile.findOneAndUpdate(
      { user: req.params.userId },
      {
        university,
        degree,
        graduationYear,
        skills,
        resumeUrl,
      },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecruiterProfile = async (req, res) => {
  try {
    const { company, companyDescription, website, logoUrl } = req.body;

    const profile = await RecruiterProfile.findOneAndUpdate(
      { user: req.params.userId },
      {
        company,
        companyDescription,
        website,
        logoUrl,
      },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveRecruiter = async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOneAndUpdate(
      { user: req.params.recruiterId },
      { approved: true },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
