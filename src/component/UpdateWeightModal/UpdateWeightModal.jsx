import React from "react";
import Modal from "react-modal";

const UpdateWeightModal = ({
  isOpen,
  onRequestClose,
  startWeight,
  setStartWeight,
  onConfirm,
  title,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-4">
        <button onClick={onRequestClose} className="text-gray-500">
          Cancel
        </button>
        <h2 className="text-lg font-semibold">{title}</h2>
        <span></span>
      </div>
      <div className="text-center text-sm text-gray-500 mb-4">
        Today, July 16
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={startWeight}
          onChange={(e) => setStartWeight(e.target.value)}
        />
        <span className="ml-2 text-lg">KG</span>
      </div>
      <button
        className="w-full bg-[#50B498] text-white py-2 rounded-lg"
        onClick={onConfirm}
      >
        Confirm
      </button>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            className="border border-gray-300 rounded-lg py-2"
            onClick={() => setStartWeight(startWeight + num)}
          >
            {num}
          </button>
        ))}
        <button
          className="border border-gray-300 rounded-lg py-2"
          onClick={() => setStartWeight(startWeight + ".")}
        >
          .
        </button>
        <button
          className="border border-gray-300 rounded-lg py-2"
          onClick={() => setStartWeight(startWeight.slice(0, -1))}
        >
          ⌫
        </button>
      </div>
    </Modal>
  );
};

export default UpdateWeightModal;
