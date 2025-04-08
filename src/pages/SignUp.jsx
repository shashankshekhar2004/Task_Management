import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (!data.username || !data.email || !data.password) {
      setError("All fields are required.");
      return;
    }
    if (data.password.length < 5) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      const response = await axios.post(
        "https://task-mangement-lumm.onrender.com/api/v1/sign-in",
        data
      );
      console.log(response.data.message);
      setData({ username: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="backdrop-blur-lg bg-white/10 border border-gray-500 shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>
        <p className="text-gray-300 text-center mb-6">Sign up to get started</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button
          className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-lg"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        <p className="text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
