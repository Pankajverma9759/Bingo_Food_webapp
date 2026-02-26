import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const serverUrl = "http://localhost:5000"; // ✅ Define server URL

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle Role Change
  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role: role,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data);

      alert("Signup successful!");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        role: "user",
      });

      // Redirect to login
      navigate("/signin");

    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 w-full"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ borderColor: borderColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Vingo
        </h1>

        <p className="text-gray-600 mb-6">
          Create your account to get started with delicious food delivery
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter your full name"
            />
          </div>

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

          {/* Mobile */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
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
                {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select Role
            </label>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`w-full py-2 rounded-lg border transition ${
                    formData.role === r
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Sign Up
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300 mt-2"
          >
            <FcGoogle size={20} />
            <span>Sign Up with Google</span>
          </button>

          <p
            className="text-center mt-6 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Already have an account?{" "}
            <span className="text-orange-500 hover:underline">
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}