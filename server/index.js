import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ===============================
// 🔹 Kết nối MongoDB
// ===============================
const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://note:Vi234567@cluster0.qfvpqsd.mongodb.net/note_app");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// ===============================
// 🔹 Định nghĩa Schema & Model
// ===============================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// ===============================
// 🔹 Tạo Express app
// ===============================
const app = express();
app.use(cors());
app.use(express.json());

// Kết nối DB
connectToMongoDB();

// ===============================
// 🔹 Route đăng ký
// ===============================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra user tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ===============================
// 🔹 Route test server
// ===============================
app.get("/", (req, res) => {
  res.send("✅ Backend running");
});

// ===============================
// 🔹 Khởi động server
// ===============================
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
