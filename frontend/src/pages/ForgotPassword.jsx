import React, { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const resetAll = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-gray-200 relative">

        {/* Back Arrow (Top Left) */}
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="absolute left-4 top-4 text-gray-600 hover:text-orange-500"
          >
            <IoArrowBack size={22} />
          </button>
        )}

        <h1 className="text-3xl font-bold mb-2 text-orange-500 text-center">
          Vingo
        </h1>
        <p className="text-gray-600 mb-2 text-center">
          Reset your password
        </p>

        {/* Step Indicator */}
        <p className="text-sm text-gray-400 text-center mb-6">
          Step {step} of 3
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
            />

            <button
              onClick={() => email && setStep(2)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-300 mt-4 flex items-center justify-center gap-2"
            >
              Send OTP <IoArrowForward />
            </button>

            <p
              className="text-center mt-4 text-sm text-gray-500 cursor-pointer hover:text-orange-500"
              onClick={() => navigate("/signin")}
            >
              Back to Sign In
            </p>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter OTP"
            />

            <button
              onClick={() => otp && setStep(3)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-300 mt-4 flex items-center justify-center gap-2"
            >
              Verify OTP <IoArrowForward />
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter new password"
            />

            <label className="block text-gray-700 font-medium mb-1 mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-2 px-3 border rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Confirm new password"
            />

            <button
              onClick={() => {
                if (newPassword === confirmPassword && newPassword !== "") {
                  alert("Password reset successful!");
                  resetAll();
                } else {
                  alert("Passwords do not match!");
                }
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-300 mt-4 flex items-center justify-center gap-2"
            >
              Reset Password <IoArrowForward />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}