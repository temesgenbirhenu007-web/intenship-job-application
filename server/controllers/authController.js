import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import RecruiterProfile from '../models/RecruiterProfile.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role, ...profileData } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
    });

    if (role === 'student') {
      await StudentProfile.create({
        user: user._id,
        university: profileData.university || '',
        degree: profileData.degree || '',
        graduationYear: profileData.graduationYear || 2025,
      });
    } else if (role === 'recruiter') {
      await RecruiterProfile.create({
        user: user._id,
        company: profileData.company || '',
        companyDescription: profileData.companyDescription || '',
        website: profileData.website || '',
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      let profile = null;

      if (user.role === 'student') {
        profile = await StudentProfile.findOne({ user: user._id });
      } else if (user.role === 'recruiter') {
        profile = await RecruiterProfile.findOne({ user: user._id });
      }

      const token = generateToken(user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    let profile = null;

    if (user.role === 'student') {
      profile = await StudentProfile.findOne({ user: user._id });
    } else if (user.role === 'recruiter') {
      profile = await RecruiterProfile.findOne({ user: user._id });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
