import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    navigate("/");
  }

  const dispatch = useDispatch();
  const [Data, setData] = useState({ username: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    if (!Data.username || !Data.password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://task-mangement-lumm.onrender.com/api/v1/log-in",
        Data
      );

      console.log("Login successful:", response.data.message);
      //alert("Login successful!");

      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);

      dispatch(authActions.login());
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      alert(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="backdrop-blur-lg bg-white/10 border border-gray-500 shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-center mb-6">Login to continue</p>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <button
          className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-lg"
          onClick={submit}
        >
          Login
        </button>
        <p className="text-gray-300 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
