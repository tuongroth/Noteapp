import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Hiển thị lỗi

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset lỗi trước khi gửi

    // ✅ debug
    console.log("Signup data:", { name, email, password });

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://noteapp-2wye.onrender.com/api/auth/register"
,
        { name, email, password }
      );

      console.log("✅ Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup error:", err);

      // Nếu backend trả về message, show ra
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Signup
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
