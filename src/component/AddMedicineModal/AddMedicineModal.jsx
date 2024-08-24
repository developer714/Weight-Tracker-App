import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { Frequency, Paths } from "../../AppConstants";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  createOrUpdateShotsInfo,
  mutationShotsInfoTimes,
} from "../../firebaseApis/healthApis";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../../pages/Loading/Loading";
import { useNavigate } from "react-router-dom";
import FrequencyModal from "../FrequencyModal/FrequencyModal";

const AddMedicineModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  medicinesList,
}) => {
  const [medicineName, setMedicineName] = useState(medicinesList[0].name);
  const [date, setDate] = useState("");
  const [dosage, setDosage] = useState("50");
  const [times, setTimes] = useState([{ time: "1:35 PM", dosage: "50" }]);
  const [frequency, setFrequency] = useState(Frequency[0]);
  const [openFrequencyModal, setOpenFrequencyModal] = useState(false);
  const { uid } = useContext(UserContext);
  const { loading, setLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const time = `${hours}:${minutes}`;
    setTimes([{ time, dosage }]);
    setDate(`${year}-${month}-${day}`);
  }, [dosage]);

  const addTime = () => {
    setTimes([
      ...times,
      {
        time: `${("0" + new Date().getHours()).slice(-2)}:${(
          "0" + new Date().getMinutes()
        ).slice(-2)}`,
        dosage,
      },
    ]);
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index].time = value;
    setTimes(newTimes);
  };

  const removeTime = (index) => {
    const newTimes = times.filter((_, i) => i !== index);
    setTimes(newTimes);
  };

  const handleConfirm = async () => {
    setLoading(true);

    const newShot = {
      shot_name: medicineName,
      dosage,
      dosage_unit: "mg",
      frequency,
    };

    const newTimes = times.map((time) => time.time);

    await createOrUpdateShotsInfo({
      uid,
      newShot,
    });

    await mutationShotsInfoTimes({
      uid,
      shot_name: medicineName,
      last_shot_date: date,
      time: newTimes,
    });
    onRequestClose();
    onConfirm();
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <>
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
          <h2 className="text-lg font-semibold">Med Name</h2>
          <span></span>
        </div>
        <div className="text-center text-sm text-gray-500 mb-4">
          <img
            src="/static/img/calendar.svg"
            alt="Calendar"
            className="mx-auto mb-2"
          />
          When will you take this?
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medicine Name
          </label>
          <select
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          >
            {medicinesList.map((medicine) => (
              <option key={medicine.name} value={medicine.name}>
                {medicine.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dosage
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full">
            <input
              type="text"
              className="flex-grow border-none outline-none"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
            <span className="ml-2 text-lg text-[#50B498]">mg</span>
          </div>
        </div>
        <div
          className="mb-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-blue-200"
          onClick={() => setOpenFrequencyModal(true)}
        >
          <span className="text-sm font-medium text-gray-700">Frequency</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">{frequency}</span>
            <img
              src="/static/img/right-arrow.svg"
              alt="Right Arrow"
              className="w-4 h-4 text-[#50B498]"
            />
          </div>
        </div>
        <div className="mb-4">
          {times.map((time, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded-lg"
            >
              <div className="flex items-center">
                <button
                  className="bg-[#50B498] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2"
                  onClick={() => removeTime(index)}
                >
                  <span className="text-lg">-</span>
                </button>
                <input
                  type="time"
                  className="text-lg font-semibold border-none outline-none bg-gray-100"
                  value={time.time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                />
              </div>
              <span className="text-sm text-[#50B498]">{time.dosage} mg</span>
            </div>
          ))}
          <div
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg cursor-pointer"
            onClick={addTime}
          >
            <div className="flex items-center">
              <button className="bg-[#50B498] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                <span className="text-lg">+</span>
              </button>
              <span className="text-lg font-semibold">Add a time</span>
            </div>
            <span className="text-sm text-[#50B498]">{dosage} Capsule</span>
          </div>
        </div>
        <button
          className="w-full bg-[#50B498] text-white py-2 rounded-lg"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </Modal>
      <FrequencyModal
        isOpen={openFrequencyModal}
        onClose={() => setOpenFrequencyModal(false)}
        onConfirm={() => setOpenFrequencyModal(false)}
        date={date}
        frequency={frequency}
        setFrequency={setFrequency}
      />
    </>
  );
};

export default AddMedicineModal;
