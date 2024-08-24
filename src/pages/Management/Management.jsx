import React, { useState, useEffect, useContext } from "react";
import CurrentWeight from "../../component/CurrentWeight/CurrentWeight";
import UpdateWeightModal from "../../component/UpdateWeightModal/UpdateWeightModal";
import ShotsManagement from "../../component/ShotsManagement/ShotsManagement";
import AddMedicineModal from "../../component/AddMedicineModal/AddMedicineModal";
import MoreTabContent from "../../component/MoreTabContent/MoreTabContent";
import Summary from "../../component/Summary/Summary";
import AddShotModal from "../../component/AddShotModal/AddShotModal";
import { UserContext } from "../../contexts/UserContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  getAllMedicines,
  getUserShots,
  getUserWeights,
  mutationUserWeights,
} from "../../firebaseApis/healthApis";
import Loading from "../Loading/Loading";
import { timestampToDate } from "../../component/dateConverter";
import ManagementLayout from "./ManagementLayout";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../AppConstants";

const Management = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startWeight, setStartWeight] = useState("102");
  const [dreamWeight, setDreamWeight] = useState("62");
  const [currentWeight, setCurrentWeight] = useState("70");
  const [lastRead, setLastRead] = useState("76");
  const [sinceStart, setSinceStart] = useState("29");
  const [medicinesList, setMedicinesList] = useState([]);
  const [isAddMedicineModalOpen, setIsAddMedicineModalOpen] = useState(false);
  const [isAddShotModalOpen, setIsAddShotModalOpen] = useState(false);
  const { uid } = useContext(UserContext);
  const { loading, setLoading, activeTab, setActiveTab } =
    useContext(GlobalContext);
  const [medLog, setMedLog] = useState([]);
  const navigate = useNavigate();

  const closeMedicineModal = () => {
    setIsAddMedicineModalOpen(false);
  };

  const openMedicineModal = () => {
    setIsAddMedicineModalOpen(true);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleMedicineConfirm = () => {
    setIsAddMedicineModalOpen(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await mutationUserWeights({
      uid,
      key: "current_weight",
      value: currentWeight,
    })
      .then((res) => {
        if (res.data.result) console.log(res.data.result);
      })
      .catch((err) => console.error(err));
    setLoading(false);
    closeModal();
  };

  const handleShotConfirm = () => {
    setIsAddShotModalOpen(false);
  };

  const openShotModal = () => {
    setIsAddShotModalOpen(true);
  };

  const closeShotModal = () => {
    setIsAddShotModalOpen(false);
  };
  const seeMore = () => {
    setActiveTab("weight");
  };

  const [weightData, setWeightData] = useState([
    { date: "2023-01-01", weight: 70 },
    { date: "2023-02-01", weight: 71 },
    { date: "2023-03-01", weight: 69 },
  ]);

  const [chartData, setChartData] = useState({
    dates: ["2023-01-01", "2023-02-01", "2023-03-01"],
    weights: [70, 71, 69],
  });

  const schedule = {
    dosage: "50mg",
    frequency: "Everyday",
  };

  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Weight", accessor: "weight" },
    { header: "Change", accessor: "change" },
    { header: "Since Start", accessor: "sinceStart" },
  ];
  const shotsColumns = [
    { header: "Date", accessor: "date" },
    { header: "Medicine Name", accessor: "medicineName" },
    { header: "Dosage", accessor: "dosage" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const f_user_weights = await getUserWeights({ uid });
        const f_user_shots = await getUserShots({ uid });
        const f_medicines_list = await getAllMedicines({ uid });

        if (f_user_weights.data && f_user_weights.data.data) {
          const userWeightData = f_user_weights.data.data.today_weight;
          const userShotsData = f_user_shots.data.data.shots;
          setMedicinesList(f_medicines_list.data.data);

          const convertedUserWeightData = userWeightData.map(
            (wData, _index) => ({
              date: timestampToDate(wData.timestamp),
              weight: wData.value,
              change:
                _index > 0
                  ? userWeightData[_index].value -
                    userWeightData[_index - 1].value
                  : 0,
              sinceStart:
                f_user_weights.data.data.start_weight -
                userWeightData[_index].value,
            })
          );

          const convertedUserShotsData = userShotsData
            .map((sData) => {
              if (sData.shoted_dates) {
                return sData.shoted_dates.map((sedData) => ({
                  date: sedData.date,
                  medicineName: sData.shot_name,
                  dosage: sData.dosage,
                }));
              }
            })
            .flat()
            .filter(Boolean);

          setMedLog(convertedUserShotsData);
          setWeightData(convertedUserWeightData);
          setStartWeight(f_user_weights.data.data.start_weight);
          setDreamWeight(f_user_weights.data.data.dream_weight);
          setCurrentWeight(f_user_weights.data.data.current_weight);
          setLastRead(userWeightData[userWeightData.length - 1].value);
          setSinceStart(
            f_user_weights.data.data.start_weight -
              f_user_weights.data.data.current_weight
          );
          const dates = userWeightData.map((entry) =>
            timestampToDate(entry.timestamp)
          );
          const weights = userWeightData.map((entry) => entry.value);
          setChartData({ dates, weights });
        } else {
          console.error(
            "User weights data is not available",
            f_user_weights.data
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <ManagementLayout>
      <div
        className={
          activeTab === "summary"
            ? "bg-gradient-to-b from-[#FEC180] via-[#F5F0F0] to-[#F5F0F0]"
            : "bg-gray-100"
        }
      >
        <div className="flex flex-col items-start max-w-md mx-auto mb-2">
          {activeTab !== "more" && activeTab !== "summary" && (
            <div className="flex justify-around mb-4 mt-4 rounded-lg bg-white mx-auto w-full">
              <button
                className={`w-1/3 py-2 mt-2 mb-2 ml-2 ${
                  activeTab === "weight"
                    ? "bg-[#50B498] text-white rounded-lg"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("weight")}
              >
                Weight
              </button>
              <button
                className={`w-1/3 py-2 mt-2 mb-2 ${
                  activeTab === "shots"
                    ? "bg-[#50B498] text-white rounded-lg"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("shots")}
              >
                Shots
              </button>
            </div>
          )}
          {activeTab === "weight" && (
            <h2 className="text-xl font-bold mb-4 ml-4">Weight Management</h2>
          )}
          <div
            className={`${
              activeTab === "summary" ? "" : "bg-white"
            } rounded-lg p-4 w-full`}
          >
            {activeTab === "summary" && (
              <Summary
                currentWeight={currentWeight}
                startWeight={startWeight}
                dreamWeight={dreamWeight}
                lastRead={lastRead}
                sinceStart={sinceStart}
                openMedicineModal={openMedicineModal}
                openModal={openModal}
                seeMore={seeMore}
              />
            )}
            {activeTab === "weight" && (
              <CurrentWeight
                currentWeight={currentWeight}
                startWeight={startWeight}
                dreamWeight={dreamWeight}
                chartData={chartData}
                weightData={weightData}
                lastRead={lastRead}
                columns={columns}
                openModal={openModal}
              />
            )}

            {activeTab === "shots" && (
              <ShotsManagement
                schedule={schedule}
                daysLeft={9}
                medLog={medLog}
                shotscolumns={shotsColumns}
                openMedicineModal={openMedicineModal}
                currentWeight={currentWeight}
                startWeight={startWeight}
                dreamWeight={dreamWeight}
                openShotModal={openShotModal}
              />
            )}
            {activeTab === "more" && (
              <MoreTabContent
                medicinesList={medicinesList}
                handleMedicineConfirm={handleMedicineConfirm}
              />
            )}
          </div>
        </div>

        <UpdateWeightModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          startWeight={currentWeight}
          setStartWeight={setCurrentWeight}
          onConfirm={handleConfirm}
          title={"Update today Weight"}
        />
        {medicinesList.length > 0 && (
          <>
            <AddMedicineModal
              medicinesList={medicinesList}
              isOpen={isAddMedicineModalOpen}
              onRequestClose={closeMedicineModal}
              onConfirm={handleMedicineConfirm}
            />
            <AddShotModal
              medicinesList={medicinesList}
              isOpen={isAddShotModalOpen}
              onRequestClose={closeShotModal}
              onConfirm={handleShotConfirm}
            />
          </>
        )}
      </div>
    </ManagementLayout>
  );
};

export default Management;
