import React, { useState } from "react";
import Table from "../Table/Table";
import FilterModal from "../FilterModal/FilterModal";
import WeekCalendar from "../WeekCalendar/WeekCalendar";
import WeightModal from "../WeightModal/WeightModal";

const ShotsManagement = ({
  schedule,
  daysLeft,
  medLog,
  shotscolumns,
  openMedicineModal,
  openShotModal,
  currentWeight,
  startWeight,
  dreamWeight,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    WedWeight: currentWeight,
    StartWeight: startWeight,
    LastRead: currentWeight,
    DreamWeight: dreamWeight,
    SinceStart: startWeight - currentWeight,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    const filtered = medLog.filter((row) => {
      const date = new Date(row.date); // Assuming 'date' is the accessor for the date column
      return (
        date.toLocaleString("default", { month: "long" }) === selectedMonth
      );
    });
    setFilteredData(filtered);
    handleCloseModal();
  };
  const handleOpenWeightModal = () => {
    setIsWeightModalOpen(true);
  };

  const handleCloseWeightModal = () => {
    setIsWeightModalOpen(false);
  };

  const handleWeightConfirm = (data) => {
    setFormData(data);
    // You can also update the state or perform other actions here
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Shots Management</h3>
        <button className="text-sm text-[#50B498]" onClick={openMedicineModal}>
          Edit schedule
        </button>
      </div>
      <WeekCalendar
        currentDate={currentDate}
        handleOpenWeightModal={handleOpenWeightModal}
      />
      <div className="text-center text-sm text-gray-500 mb-4">
        Days Left for next Shot
      </div>
      <div className="text-center text-2xl text-[#50B498] font-bold mb-4">
        {daysLeft} Days
      </div>
      <div className="mb-4">
        <div className="flex flex-col items-start p-4 bg-white rounded-lg border">
          <span className="text-lg font-semibold mb-2">Name</span>
          <div className="flex justify-between w-full">
            <span className="bg-gray-100 text-sm text-gray-500 p-2 rounded-lg">
              Dosage: {schedule.dosage}
            </span>
            <span className="bg-gray-100 text-sm text-gray-500 p-2 rounded-lg">
              Frequency: {schedule.frequency}
            </span>
          </div>
        </div>
        <button className="w-full bg-[#50B498] text-white py-2 rounded-lg mb-2 mt-2">
          Mark as Taken
        </button>
        <button
          className="w-full border border-[#50B498] text-[#50B498] py-2 rounded-lg"
          onClick={openShotModal}
        >
          Add new shot
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-xl font-bold">Med Entry Log</h2>
        <div className="text-[#50B498] text-sm" onClick={handleOpenModal}>
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <Table
        columns={shotscolumns}
        data={filteredData ? filteredData : medLog}
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
      <WeightModal
        isOpen={isWeightModalOpen}
        onClose={handleCloseWeightModal}
        onConfirm={handleWeightConfirm}
        initialData={formData}
      />
    </>
  );
};

export default ShotsManagement;
