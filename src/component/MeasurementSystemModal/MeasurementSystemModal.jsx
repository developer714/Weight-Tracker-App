import React from "react";

const MeasurementSystemModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <h2 className="text-lg font-bold">Measurement system</h2>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span>Metric</span>
            <input type="radio" name="measurement" value="metric" />
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Imperial</span>
            <input type="radio" name="measurement" value="imperial" />
          </div>
        </div>
        <button className="w-full py-2 bg-[#50B498] text-white rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default MeasurementSystemModal;
