import React, { useState } from "react";

const WeightModal = ({ isOpen, onClose, onConfirm, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirm(formData);
    onClose();
  };

  const handlePreviousDay = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    );
  };

  const handleNextDay = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-80">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-red-500">
            Cancel
          </button>
          <h2 className="text-lg font-bold">{`${currentDate.toLocaleDateString(
            "en-US",
            { weekday: "short", month: "long", day: "numeric" }
          )}`}</h2>
          <button className="text-gray-500" onClick={handlePreviousDay}>
            ←
          </button>
          <button className="text-gray-500" onClick={handleNextDay}>
            →
          </button>
        </div>
        <div className="space-y-1">
          {Object.keys(formData).map((key) => (
            <div key={key} className="relative w-full max-w-xs mb-5">
              <label className="block text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full h-8 p-3 text-base border border-gray-300 rounded-lg"
              />
              <span className="absolute right-3 bottom-1 text-md text-gray-400">
                KG
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={handleConfirm}
          className="bg-[#50B498] text-white w-full mt-4 py-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default WeightModal;
