import mongoose from 'mongoose';

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    company: {
      type: String,
      default: '',
    },
    companyDescription: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    logoUrl: {
      type: String,
      default: '',
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const RecruiterProfile = mongoose.model('RecruiterProfile', recruiterProfileSchema);

export default RecruiterProfile;
