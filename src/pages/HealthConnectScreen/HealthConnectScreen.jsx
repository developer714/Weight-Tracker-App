// src/components/HealthConnectScreen.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Paths } from "../../AppConstants";

function HealthConnectScreen() {
  const navigate = useNavigate();
  const { username } = useContext(UserContext);

  const handleSkip = () => {
    navigate(Paths.HOME);
  };

  const handleConnect = () => {
    navigate(Paths.CHECK_CURRENT_WEIGHT);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 text-center bg-white">
      <h1 className="text-2xl font-bold mb-2">
        But enough about me. This is about you!
      </h1>
      <p className="text-base mb-5 max-w-xs">
        Fill in, {username}! Connect your health, so I could synchronize your
        health data and show you all these useful charts and logs
      </p>
      <img
        src="static/img/middle.svg"
        className="w-1/2 mb-10"
        alt="middle"
      ></img>
      <div className="flex justify-between w-full max-w-xs mt-5">
        <button onClick={handleSkip} className="text-gray-500">
          Skip
        </button>
        <button
          onClick={handleConnect}
          className="px-6 py-3 text-lg text-white bg-[#50B498] rounded-full"
        >
          Connect to Health
        </button>
      </div>
    </div>
  );
}

export default HealthConnectScreen;
