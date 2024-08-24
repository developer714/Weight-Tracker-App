import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import AddNewMedicineModal from "../AddMedicineModal/AddNewMedicineModal";
import { FrequencyCheckForm, Paths } from "../../AppConstants";
import { UserContext } from "../../contexts/UserContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import Loading from "../../pages/Loading/Loading";
import {
  createOrUpdateShotsInfo,
  mutationShotsInfoTimes,
} from "../../firebaseApis/healthApis";
import { useNavigate } from "react-router-dom";
import FrequencyModal from "../FrequencyModal/FrequencyModal";

const AddShotModal = ({ isOpen, onRequestClose, onConfirm, medicinesList }) => {
  const [medicineName, setMedicineName] = useState(medicinesList[0].name);
  const [date, setDate] = useState("");
  const [dosage, setDosage] = useState("50");
  const [timeTaken, setTimeTaken] = useState([
    { time: "1:35 PM", dosage: "50" },
  ]);
  const [frequency, setFrequency] = useState(FrequencyCheckForm[0].value);
  const [injectionSite, setInjectionSite] = useState("Stomach - Upper Left");
  const [isAddMedicineModalOpen, setIsAddMedicineModalOpen] = useState(false);
  const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);
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
    setTimeTaken([{ time, dosage }]);
    setDate(`${year}-${month}-${day}`);
  }, [dosage]);

  const openAddMedicineModal = () => {
    setIsAddMedicineModalOpen(true);
  };

  const closeAddMedicineModal = () => {
    setIsAddMedicineModalOpen(false);
  };

  const handleConfirm = async () => {
    setLoading(true);

    const newShot = {
      shot_name: medicineName,
      dosage,
      dosage_unit: "mg",
      frequency,
    };

    const times = timeTaken.map((time) => time.time);

    await createOrUpdateShotsInfo({
      uid,
      newShot,
    });

    await mutationShotsInfoTimes({
      uid,
      shot_name: medicineName,
      last_shot_date: date,
      time: times,
    });
    setIsAddMedicineModalOpen(false);
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
          <h2 className="text-lg font-semibold">Add New Shot</h2>
          <span></span>
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
            Date
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dosage
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full">
            <input
              type="text"
              className="flex-grow outline-none"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
            <span className="text-[#50B498] ml-2">mg</span>
          </div>
        </div>
        <div className="mb-4 flex-row justify-between items-center bg-gray-100 p-4 rounded-lg">
          <div
            className="flex justify-between items-center"
            onClick={() => {
              setIsFrequencyModalOpen(true);
              // onRequestClose();
            }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Taken
            </label>
            {timeTaken.map((time) => (
              <div
                key={time.time}
                className="bg-[#50B498] text-white text-sm p-2 rounded-lg"
              >
                {time.time}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Injection Site
            </label>
            <div className="text-sm text-gray-500 p-2 rounded-lg flex items-center">
              <select
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={injectionSite}
                onChange={(e) => setInjectionSite(e.target.value)}
              >
                <option value="">Choose Site</option>
                <option value="Stomach - Upper Left">
                  Stomach - Upper Left
                </option>
                <option value="Stomach - Upper Right">
                  Stomach - Upper Right
                </option>
                <option value="Stomach - Lower Left">
                  Stomach - Lower Left
                </option>
                <option value="Stomach - Lower Right">
                  Stomach - Lower Right
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-sm text-[#50B498] border border-[#50B498] py-2 px-4 rounded-lg"
            onClick={openAddMedicineModal}
          >
            Edit schedule
          </button>
          <button
            className="bg-[#50B498] text-white py-2 px-4 rounded-lg ml-2"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </Modal>
      <AddNewMedicineModal
        frequency={frequency}
        medicineName={medicineName}
        setMedicineName={setMedicineName}
        dosage={dosage}
        setDosage={setDosage}
        times={timeTaken}
        setTimes={setTimeTaken}
        medicinesList={medicinesList}
        isOpen={isAddMedicineModalOpen}
        onRequestClose={closeAddMedicineModal}
        onConfirm={handleConfirm}
      />
      <FrequencyModal
        isOpen={isFrequencyModalOpen}
        onClose={() => setIsFrequencyModalOpen(false)}
        onConfirm={() => setIsFrequencyModalOpen(false)}
        date={date}
        frequency={frequency}
        setFrequency={setFrequency}
      />
    </>
  );
};

export default AddShotModal;
