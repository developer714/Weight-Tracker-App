import React from "react";
import { ShotUnits } from "../../AppConstants";

function DateSelectionModal({ weight, date, onClose, onConfirm, data }) {
  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-t-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-blue-500">
            Cancel
          </button>
          <span className="text-lg font-semibold">{date}</span>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medicine Name
          </label>
          <input
            type="text"
            value={data.shot_name}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Name"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dosage
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={data.dosage}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="50"
              disabled
            />
            <select
              value={data.dosage_unit}
              className="ml-2 p-2 border border-gray-300 rounded"
              disabled
            >
              {ShotUnits.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={weight}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="80"
              disabled
            />
            <span className="ml-2">KG</span>
          </div>
        </div>
        <button
          onClick={onConfirm}
          className="w-full py-2 bg-gray-500 text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DateSelectionModal;
