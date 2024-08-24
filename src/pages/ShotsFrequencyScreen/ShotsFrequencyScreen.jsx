import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Frequency, Paths } from "../../AppConstants";
import { UserContext } from "../../contexts/UserContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import Loading from "../Loading/Loading";
import { createOrUpdateShotsInfo } from "../../firebaseApis/healthApis";

function ShotsFrequencyScreen() {
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState(Frequency[0]);
  const { uid } = useContext(UserContext);
  const { shots, setShots, loading, setLoading } = useContext(GlobalContext);

  useEffect(() => {
    setShots({ ...shots, frequency });
  }, [frequency]);

  const handleNextOrSkip = async () => {
    setLoading(true);
    await createOrUpdateShotsInfo({ uid, newShot: shots });
    setLoading(false);
    navigate(Paths.LAST_REMINDER);
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
          Frequency
        </label>
        <select
          className="w-full p-2 h-12 mb-3 border border-gray-300 rounded-lg"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          {Frequency.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between w-full max-w-xs mb-5">
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

export default ShotsFrequencyScreen;
