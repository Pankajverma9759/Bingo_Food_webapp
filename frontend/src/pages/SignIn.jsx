import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import axios from "axios";

export default function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const serverUrl = "http://localhost:5000";

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Popup State
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setPopup({
        show: true,
        message: "Email and Password are required",
        type: "error",
      });

      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
      }, 2000);

      return;
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signin`,
        formData,
        { withCredentials: true },
      );

      console.log(response.data);

      // ✅ Success Popup
      setPopup({
        show: true,
        message: "Login Successful!",
        type: "success",
      });

      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
        navigate("/home");
      }, 2000);
    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Invalid credentials",
        type: "error",
      });

      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
      }, 2000);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  // =================== Facebook Auth ============
  const handleFacebookAuth = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  // =================== Github Auth ============
  const handleGithubAuth = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  // =================== Facebook Auth ============
  const handleLinkedInAuth = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 w-full"
      style={{ backgroundColor: bgColor }}
    >
      {/* ✅ Popup */}
      {popup.show && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
              popup.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {popup.message}
          </div>
        </div>
      )}

      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ borderColor: borderColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Vingo
        </h1>

        <p className="text-gray-600 mb-6">Welcome back! Login to continue</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:border-orange-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoMdEyeOff size={20} />
                ) : (
                  <IoMdEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <span
              className="text-sm text-orange-500 cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Sign In
          </button>

          {/* SOCIAL SIGNUP */}
          <div className="w-full mt-4 flex justify-center gap-4">
            {/* Google */}
            <button
              onClick={handleGoogleAuth}
              className="p-3 border rounded-full hover:bg-gray-100 transition"
            >
              <FcGoogle size={22} />
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebookAuth}
              className="p-3 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <FaFacebookF size={18} />
            </button>

            {/* LinkedIn */}
            <button
              onClick={handleLinkedInAuth}
              className="p-3 border rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              <FaLinkedinIn size={18} />
            </button>

            {/* GitHub */}
            <button
              onClick={handleGithubAuth}
              className="p-3 border rounded-full bg-gray-900 text-white hover:bg-black transition"
            >
              <FaGithub size={20} />
            </button>
          </div>

          <p
            className="text-center mt-6 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Don't have an account?{" "}
            <span className="text-orange-500 hover:underline">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
