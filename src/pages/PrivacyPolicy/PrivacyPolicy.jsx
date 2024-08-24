import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp } from "../../component/Icons/ArrowUp"; // Adjust the import path as necessary
import { Paths } from "../../AppConstants";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(Paths.MANAGEMENT); // Adjust the path as necessary
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full h-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-y-auto">
        <div className="mb-4 mt-4 cursor-pointer" onClick={handleBackClick}>
          <ArrowUp />
        </div>
        <div className="text-center mb-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Privacy policy
          </h2>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Lorem Ipsum is simply dummy</h3>
          <p className="text-gray-700 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Lorem Ipsum is simply dummy</h3>
          <p className="text-gray-700 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Lorem Ipsum is simply dummy</h3>
          <p className="text-gray-700 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
