import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Proper async function syntax
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Correct axios syntax
      const response = await axios.post(
        "https://crispy-engine-4wq67x655j7cq69r-5000.app.github.dev/api/auth/register",
        { name, email, password }
      );

      console.log("✅ Registration successful:", response.data);
    } catch (error) {
      console.error("❌ Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
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
              placeholder="Enter email"
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
              placeholder="Enter password"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Signup
          </button>

          {/* Login link */}
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
