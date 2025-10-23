// db.js
import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://note:Vi234567@cluster0.qfvpqsd.mongodb.net/note_app");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default connectToMongoDB;
