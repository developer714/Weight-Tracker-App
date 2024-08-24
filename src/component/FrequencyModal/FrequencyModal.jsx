import React, { useState } from "react";
import Modal from "react-modal";
import { FrequencyCheckForm } from "../../AppConstants";

const FrequencyModal = ({
  isOpen,
  onClose,
  onConfirm,
  date,
  frequency,
  setFrequency,
}) => {
  const [formData, setFormData] = useState(null);
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

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-4">
        <button onClick={onClose} className="text-gray-500">
          Back
        </button>
        <h2 className="text-lg font-bold">Frequency</h2>
      </div>
      <div className="space-y-4">
        {FrequencyCheckForm.map((item) => (
          <div key={item.value} className="flex justify-between items-center">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor={item.value}
            >
              {item.title}
            </label>
            <input
              type="checkbox"
              name={item.value}
              value={item.value}
              checked={frequency === item.value}
              onChange={(e) => setFrequency(e.target.value)}
              className="form-checkbox tick"
            />
          </div>
        ))}
        <div className="flex flex-col items-center bg-gray-100 p-2 rounded-lg">
          <div className="flex justify-between w-full">
            <label className="block text-sm font-medium text-gray-700">
              Every
            </label>
            <span className="block text-sm font-medium text-[#50B498]">
              Day
            </span>
          </div>
          <div className="relative w-full mt-2">
            <div
              className="w-full bg-white border-none text-sm text-center overflow-auto"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                scrollBehavior: "smooth",
                overflowY: "scroll",
                maxHeight: "100px",
              }}
              onScroll={(e) => {
                const scrollTop = e.target.scrollTop;
                const itemHeight = e.target.scrollHeight / 4; // Assuming 4 items
                const selectedIndex = Math.min(
                  Math.round(scrollTop / itemHeight),
                  3
                );
                const options = ["1", "2", "3", "4"];
                handleChange({
                  target: {
                    name: "interval",
                    value: options[selectedIndex],
                  },
                });
                const items = e.target.children;
                for (let i = 0; i < items.length; i++) {
                  if (i === selectedIndex) {
                    items[i].classList.add("text-black", "text-lg");
                    items[i].classList.remove("text-gray-700");
                  } else {
                    items[i].classList.add("text-gray-700");
                    items[i].classList.remove("text-black", "text-lg");
                  }
                }
              }}
            >
              <div className="py-2 text-gray-700">Day</div>
              <div className="py-2 text-gray-700">Other Day</div>
              <div className="py-2 text-gray-700">3 Days</div>
              <div className="py-2 text-gray-700">4 Days</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={date}
            className="ml-2 bg-white border-none text-sm text-end"
            disabled
          />
        </div>
      </div>
      <button
        onClick={handleConfirm}
        className="bg-[#50B498] text-white w-full mt-4 py-2 rounded-lg"
      >
        Done
      </button>
    </Modal>
  );
};

export default FrequencyModal;
