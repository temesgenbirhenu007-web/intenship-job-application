/** @format */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	role: {
		type: String,
		enum: ["student", "recruiter", "admin"],
		default: "student",
	},
	profile: {
		education: String,
		skills: [String],
		resumeUrl: String,
	},
	company: {
		name: String,
		website: String,
		logoUrl: String,
	},
});

// Password hash before save
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
