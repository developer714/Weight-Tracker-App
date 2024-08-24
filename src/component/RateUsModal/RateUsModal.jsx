import React, { useState } from "react";
import SendRateUsModal from "../SendRateUsModal/SendRateUsModal";

const RateUsModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [isSendRateUsModalOpen, setIsSendRateUsModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleRating = (rate) => {
    setRating(rate);
    setIsSendRateUsModalOpen(true);
  };

  const handleCloseSendRateUsModal = () => {
    setIsSendRateUsModalOpen(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <button onClick={onClose} className="text-gray-500 text-sm ml-2">
              Cancel
            </button>
            <h2 className="text-lg font-bold mx-auto">Rate us</h2>
          </div>
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-[#50B498]">
              How was your Experience from Med?
            </h3>
          </div>
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => handleRating(star)}
                className={`w-8 h-8 cursor-pointer ${
                  rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <SendRateUsModal
        isOpen={isSendRateUsModalOpen}
        onClose={handleCloseSendRateUsModal}
      />
    </>
  );
};

export default RateUsModal;
