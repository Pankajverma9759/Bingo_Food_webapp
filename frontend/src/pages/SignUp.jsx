import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import { GoogleAuthProvider,FacebookAuthProvider,
  GithubAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const serverUrl = "http://localhost:5000";

  const [showPassword, setShowPassword] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
  });

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // ================= ROLE =================
  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  // ================= POPUP AUTO CLOSE =================
  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });

    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 2000);
  };

  // ================= NORMAL SIGNUP =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password
    ) {
      return showPopup("All fields required", "error");
    }

    try {
      const res = await axios.post(`${serverUrl}/api/auth/signup`, formData, {
        withCredentials: true,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      showPopup("Signup Successful", "success");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      showPopup(err.response?.data?.message || "Signup Failed", "error");
    }
  };

  // ================= GOOGLE AUTH =================

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  // =================== Facebook Auth ============
  const handleFacebookAuth = async() =>{
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth,provider);
    console.log(result);
  }
  // =================== Github Auth ============
  const handleGithubAuth = async() =>{
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth,provider);
    console.log(result);
  }
  // =================== Facebook Auth ============
  const handleLinkedInAuth = async() =>{
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth,provider);
    console.log(result);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50">
      {/* POPUP */}
      {popup.show && (
        <div
          className={`fixed top-5 right-5 text-white px-5 py-2 rounded shadow-lg
          ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {popup.message}
        </div>
      )}

      {/* CARD */}
      <div className="bg-white p-8 rounded-xl shadow w-[400px]">
        <h1 className="text-3xl font-bold text-orange-500 mb-4 text-center">
          Vingo Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            id="fullName"
            value={formData.fullName}
            placeholder="Full Name"
            className="input w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            id="email"
            type="email"
            value={formData.email}
            placeholder="Email"
            className="input w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            id="mobile"
            type="tel"
            value={formData.mobile}
            placeholder="Mobile"
            className="input w-full border p-2 rounded"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              placeholder="Password"
              className="input w-full border p-2 rounded"
              onChange={handleChange}
            />

            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>

          {/* ROLE */}
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => handleRoleChange(r)}
                className={`flex-1 p-2 rounded capitalize transition
                ${formData.role === r ? "bg-orange-500 text-white" : "border"}`}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">
            Sign Up
          </button>
        </form>

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
          <button onClick={handleFacebookAuth}
          className="p-3 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
            <FaFacebookF size={18} />
          </button>

          {/* LinkedIn */}
          <button  onClick={handleLinkedInAuth}
           className="p-3 border rounded-full bg-blue-500 text-white hover:bg-blue-600 transition">
            <FaLinkedinIn size={18} />
          </button>

          {/* GitHub */}
          <button onClick={handleGithubAuth} 
           className="p-3 border rounded-full bg-gray-900 text-white hover:bg-black transition">
            <FaGithub size={20} />
          </button>
        </div>
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Don't have an account?{" "}
          <span className="text-orange-500 hover:underline">Sign In</span>
        </p>
      </div>
    </div>
  );
}
