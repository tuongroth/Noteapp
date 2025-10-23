import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // ✅ Import your User model

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.error("Register error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;
