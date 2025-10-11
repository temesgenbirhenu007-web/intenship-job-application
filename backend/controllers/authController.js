/** @format */

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register
export const register = async (req, res) => {
	const { name, email, password, role } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (userExists)
			return res.status(400).json({ message: "User already exists" });

		const user = await User.create({ name, email, password, role });
		res.status(201).json({ token: generateToken(user._id), user });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user || !(await user.matchPassword(password)))
			return res.status(401).json({ message: "Invalid credentials" });

		res.json({ token: generateToken(user._id), user });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
