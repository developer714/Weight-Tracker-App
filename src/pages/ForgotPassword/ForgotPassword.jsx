import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ArrowUp } from "../../component/Icons/ArrowUp";
import { Paths } from "../../AppConstants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleBackClick = () => {
    navigate(Paths.HOME);
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent successfully");
      setError("");
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      setError(error.message);
      setMessage("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full h-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 mt-4 cursor-pointer" onClick={handleBackClick}>
          <ArrowUp />
        </div>
        <img
          className="mx-auto h-60 w-auto"
          alt="Lock"
          src="static/img/https-lottiefiles-com-animations-forgot-password-animation-2zs.png"
        />
        <div className="text-center mb-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Forget password
          </h2>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="@mail.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <img
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              alt="Email Icon"
              src="static/img/email-svgrepo-com.svg"
            />
          </div>
        </div>
        {message && (
          <div className="text-green-500 text-xs italic">{message}</div>
        )}
        {error && <div className="text-red-500 text-xs italic">{error}</div>}
        <div className="flex items-center justify-center mb-4 cursor-pointer bg-[#50B498] text-white py-1 px-4 rounded">
          <button
            className="bg-[#50B498] hover:bg-[#50B498] text-white font-bold py-1 px-6 rounded-full focus:outline-none focus:shadow-outline"
            onClick={handlePasswordReset}
          >
            Recover password
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <img
              className="mx-auto mb-4"
              alt="Mail Sent"
              src="static/img/mail-sent-icon.svg"
            />
            <h2 className="text-xl font-bold mb-2">Mail Sent</h2>
            <p className="mb-4">Check your e-mail with instructions</p>
            <button
              className="bg-[#50B498] hover:bg-[#50B498] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              onClick={closeModal}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
