import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../AppConstants";
import {
  createOrUpdateShotsInfo,
  getAllMedicines,
} from "../../firebaseApis/healthApis";
import Loading from "../Loading/Loading";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";

export function MedicineNameScreen() {
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const { uid } = useContext(UserContext);
  const { shots, setShots, loading, setLoading } = useContext(GlobalContext);

  useEffect(() => {
    setLoading(true);
    getAllMedicines()
      .then(({ data }) => {
        if (data.data) setMedicineList(data.data);
        setLoading(false);
        if (data.data.length) {
          setMedicine(data.data[0].name);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    setShots({ ...shots, shot_name: medicine });
  }, [medicine]);

  const handleNextOrSkip = async () => {
    if (medicine) {
      setLoading(true);
      await createOrUpdateShotsInfo({ uid, newShot: shots });
      setLoading(false);
      navigate(Paths.MEDICINE_DOSAGE);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 text-center bg-white">
      <div
        className="absolute top-5 left-5 cursor-pointer p-1"
        onClick={handleBack}
      >
        <img src="static/img/black-arrow.svg" alt="black-arrow"></img>
      </div>
      <img src="static/img/middle.svg" alt="middle"></img>
      <h1 className="text-2xl font-bold mb-2">
        Let's add your shots info for now:
      </h1>
      <p className="text-base mb-5 max-w-xs">
        First, choose your medicine name
      </p>
      <div className="relative w-full max-w-xs mb-5">
        <label
          htmlFor="weight-input"
          className="block text-left text-sm font-medium text-gray-700 mb-1"
        >
          medicine name
        </label>
        <select
          className="w-full p-2 mb-3 h-12 border border-gray-300 rounded"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
        >
          {(medicineList || []).map((medicine) => (
            <option key={medicine.name} value={medicine.name}>
              {medicine.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between w-full max-w-xs mt-9">
        <button onClick={handleNextOrSkip} className="text-gray-500">
          Skip
        </button>
        <button
          onClick={handleNextOrSkip}
          className="px-6 py-3 text-lg text-white bg-[#50B498] rounded-full"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default MedicineNameScreen;
