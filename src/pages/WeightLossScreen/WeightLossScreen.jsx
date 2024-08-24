// src/components/WeightLossScreen.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../AppConstants";

function WeightLossScreen() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(Paths.COMMUNITY);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 text-center bg-white">
      <h1 className="text-2xl font-bold mb-2">Track your weight loss!</h1>
      <p className="text-base mb-5 max-w-xs">
        Find out how close you are to your dream weight!
      </p>
      <img src="static/img/middle.svg" alt="middle" className="mb-10"></img>
      <button
        onClick={handleNext}
        className="px-6 py-3 text-lg text-white bg-[#50B498] rounded-full"
      >
        Next →
      </button>
    </div>
  );
}

export default WeightLossScreen;
