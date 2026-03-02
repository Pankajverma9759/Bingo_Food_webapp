import React, { useState } from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Popup State
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: ""
  });

  const navigate = useNavigate();
  const serverUrl = "http://localhost:5000";

  // ✅ Popup Function
  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });

    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 2000);
  };

  // ================= SEND OTP =================
  const handleSendOTP = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );

      showPopup("OTP Sent Successfully ✅");
      setStep(2);

    } catch (error) {
      showPopup(
        error.response?.data?.message || "Failed to send OTP ❌",
        "error"
      );
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );

      showPopup("OTP Verified ✅");
      setStep(3);

    } catch (error) {
      showPopup("Invalid OTP ❌", "error");
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async () => {

    if (newPassword !== confirmPassword) {
      showPopup("Passwords do not match ⚠️", "error");
      return;
    }

    try {
      await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newPassword,
        },
        { withCredentials: true }
      );

      showPopup("Password Reset Successful ✅");

      setTimeout(() => {
        navigate("/signin");
      }, 2000);

    } catch (error) {
      showPopup("Password reset failed ❌", "error");
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-[#fff9f6]">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">

        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="absolute left-4 top-4"
          >
            <IoArrowBack size={22} />
          </button>
        )}

        <h1 className="text-3xl font-bold text-orange-500 text-center">
          Vingo
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Step {step} of 3
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <button
              onClick={handleSendOTP}
              className="w-full bg-orange-500 text-white p-2 mt-4 rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-orange-500 text-white p-2 mt-4 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-2 rounded mt-3"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-orange-500 text-white p-2 mt-4 rounded"
            >
              Reset Password
            </button>
          </>
        )}
      </div>

      {/* ✅ SIMPLE POPUP */}
      {popup.show && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg text-white font-semibold
            ${popup.type === "error"
              ? "bg-red-500"
              : "bg-green-500"
            }`}
          >
            {popup.message}
          </div>
        </div>
      )}

    </div>
  );
}