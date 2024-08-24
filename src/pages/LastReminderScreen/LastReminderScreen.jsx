import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../AppConstants";

function LastReminderScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Reminder", {
              body: "You will receive notifications for your shots.",
            });
          }
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNextOrSkip = () => {
    navigate(Paths.MANAGEMENT);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 text-center bg-white">
      <div
        className="absolute top-5 left-5 cursor-pointer p-1"
        onClick={handleBack}
      >
        <img src="static/img/black-arrow.svg" alt="black-arrow"></img>
      </div>
      <img src="static/img/middle.svg" alt="middle"></img>
      <h1 className="text-2xl font-bold mb-2">
        We can remind you when you need to take your next shot!
      </h1>
      <p className="text-base mb-5 max-w-xs">
        Connect notifications and never forget when your next shot is
      </p>
      <div className="flex justify-between w-full max-w-xs mb-5">
        <button onClick={handleNextOrSkip} className="text-gray-500">
          Skip
        </button>
        <button
          onClick={handleNextOrSkip}
          className="px-6 py-3 text-lg text-white bg-[#50B498] rounded-full"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default LastReminderScreen;
