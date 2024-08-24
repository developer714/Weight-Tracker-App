import React from "react";

const FilterModal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-80">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-black-500">
            Cancel
          </button>
          <h2 className="text-lg font-bold">Filter</h2>
        </div>
        {children}
        <button
          onClick={(onClose, onConfirm)}
          className="bg-green-500 text-white w-full mt-4 py-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
