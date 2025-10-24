import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// 🔹 MongoDB Connection
// ===============================
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://note:Vi234567@cluster0.qfvpqsd.mongodb.net/note_app"
    );
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
connectToMongoDB();

// ===============================
// 🔹 Schemas & Models
// ===============================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Note = mongoose.model("Note", noteSchema);

// ===============================
// 🔹 Auth Middleware
// ===============================
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secretkeyofnoteapp123@#");
    const user = await User.findById(decoded.id);

    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// ===============================
// 🔹 Auth Routes
// ===============================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "User does not exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ success: false, message: "Wrong credentials" });

    const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#");
    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// 🔹 Verify User Route
// ===============================
app.get("/api/auth/verify", authMiddleware, async (req, res) => {
  try {
    if (!req.user)
      return res.status(404).json({ success: false, message: "No user" });

    return res.status(200).json({
      success: true,
      user: { id: req.user._id, name: req.user.name, email: req.user.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Please login" });
  }
});

// ===============================
// 🔹 Notes Routes
// ===============================
app.post("/api/note/add", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({ title, description, userId: req.user._id });
    await newNote.save();
    return res.status(200).json({ success: true, note: newNote });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error adding note" });
  }
});

app.get("/api/notes", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching notes" });
  }
});

app.put("/api/note/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, description },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ success: false, message: "Note not found" });

    return res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating note" });
  }
});

app.delete("/api/note/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!deletedNote)
      return res.status(404).json({ success: false, message: "Note not found" });

    return res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting note" });
  }
});

// ===============================
// 🔹 Test Route
// ===============================
app.get("/", (req, res) => res.send("✅ Backend running"));

// ===============================
// 🔹 Start Server
// ===============================
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
