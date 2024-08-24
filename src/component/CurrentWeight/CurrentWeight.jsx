import React, { useState } from "react";
import WeightChart from "../WeightChart/WeightChart";
import Table from "../Table/Table";
import FilterModal from "../FilterModal/FilterModal";

const CurrentWeight = ({
  currentWeight,
  startWeight,
  dreamWeight,
  lastRead,
  chartData,
  weightData,
  columns,
  openModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredData, setFilteredData] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    const filtered = weightData.filter((row) => {
      const date = new Date(row.date); // Assuming 'date' is the accessor for the date column
      return (
        date.toLocaleString("default", { month: "long" }) === selectedMonth
      );
    });
    setFilteredData(filtered);
    handleCloseModal();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Current Weight</h3>
        <button
          className="flex items-center text-sm text-[#50B498]"
          onClick={openModal}
        >
          <img
            className="w-4 h-4 mr-1"
            src="static/img/plus_button.svg"
            alt="Plus button"
          />
          Add for today
        </button>
      </div>
      <div
        className="flex justify-between items-center bg-gray-200 rounded-lg"
        onClick={openModal}
      >
        <div className="text-2xm font-bold ml-4 mt-2 mb-2">
          {currentWeight} KG
        </div>
        <div className="text-right text-sm text-[#50B498] mr-4">KG</div>
      </div>
      <div className="flex justify-between items-center mt-2 bg-gray-100 p-4 rounded-lg">
        <div className="text-center">
          <div className="text-[#50B498] font-bold">{currentWeight - lastRead} KG</div>
          <div className="text-xs text-gray-500">
            Progress than your last read
          </div>
        </div>
        <div className="border-l-2 border-gray-400 h-full mx-4"></div>
        <div className="text-center">
          <div className="text-[#50B498] font-bold">{currentWeight - dreamWeight} KG</div>
          <div className="text-xs text-gray-500">
            Between you and your dream weight
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="text-center">
          <div className="text-xs text-gray-500">Start Weight</div>
          <div className="font-bold bg-gray-100 p-2 rounded-lg">
            {startWeight} KG
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Dream Weight</div>
          <div className="font-bold bg-gray-100 p-2 rounded-lg">
            {dreamWeight} KG
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Last Read</div>
          <div className="font-bold bg-gray-100 p-2 rounded-lg">
            {lastRead} KG
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Since Start</div>
          <div className="font-bold bg-gray-100 p-2 rounded-lg">
            {startWeight - lastRead} KG
          </div>
        </div>
      </div>
      <div className="mt-4">
        <WeightChart dates={chartData.dates} weights={chartData.weights} />
      </div>

      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl font-bold">Weight Entry Log</h2>
        <div className="text-[#50B498] text-sm" onClick={handleOpenModal}>
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <Table
        columns={columns}
        data={filteredData ? filteredData : weightData}
      />

      <FilterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Month
          </label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select a month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>
      </FilterModal>
    </>
  );
};

export default CurrentWeight;
