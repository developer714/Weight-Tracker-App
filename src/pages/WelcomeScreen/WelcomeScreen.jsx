// src/components/WelcomeScreen.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../AppConstants";

function WelcomeScreen() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(Paths.USER_INFO);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 text-center bg-white">
      <h1 className="text-2xl font-bold mb-2">Hey, I'm Soflex</h1>
      <p className="text-base mb-5 max-w-xs">
        the best app for tracking shots and weight loss! More than 10,000 people
        choose me to be their guide in GLP-using journey!
      </p>
      <img src="static/img/middle.svg" alt="middle" className="mb-10"></img>
      <button
        onClick={handleNext}
        className="px-6 py-3 text-lg text-white bg-[#50B498] rounded-full"
      >
        Hi, NAME 👋
      </button>
    </div>
  );
}

export default WelcomeScreen;
