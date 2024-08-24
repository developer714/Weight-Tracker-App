import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Paths } from "../../AppConstants";

function UserInfoScreen() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUsername } = useContext(UserContext);

  const validate = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setUsername(name);
      navigate(Paths.REMINDER);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 text-center bg-white">
      <img src="static/img/middle.svg" alt="middle"></img>
      <h1 className="text-2xl font-bold mb-2">And who are you?</h1>
      <p className="text-base mb-5 max-w-xs">
        Enter the name you would like to go by
      </p>
      <div className="relative w-full max-w-xs mb-9 mt-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 text-base border border-gray-300 rounded-lg"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-400">
          👤
        </span>
      </div>
      {errors.name && <div className="text-red-500 mb-5">{errors.name}</div>}
      <button
        onClick={handleNext}
        className="px-6 py-3 text-lg text-white bg-[#50B498] rounded-full"
      >
        Next →
      </button>
    </div>
  );
}

export default UserInfoScreen;
