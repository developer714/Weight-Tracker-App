import React, { useContext, useState } from "react";
import MeasurementSystemModal from "../MeasurementSystemModal/MeasurementSystemModal";
import AddMedicineModal from "../AddMedicineModal/AddMedicineModal";
import UpdateWeightModal from "../UpdateWeightModal/UpdateWeightModal";
import { useNavigate } from "react-router-dom";
import ContactUsModal from "../ContactUsModal/ContactUsModal";
import RateUsModal from "../RateUsModal/RateUsModal";
import { Paths } from "../../AppConstants";
import { mutationUserWeights } from "../../firebaseApis/healthApis";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../../pages/Loading/Loading";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const MoreTabContent = ({ medicinesList, handleMedicineConfirm }) => {
  const { setUid } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("uid");
      navigate(Paths.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  const PrimaryButtons = [
    {
      label: "Change Password",
      onClick: () => handleNavigation(Paths.CHANGE_PASSWORD),
    },
    {
      label: "Measurement system",
      onClick: () => toggleModal("measurement", true),
    },
    {
      label: "Edit shot schedule",
      onClick: () => toggleModal("addMedicine", true),
    },
    {
      label: "Change weight goals",
      onClick: () => toggleModal("updateWeight", true),
    },
    { label: "Health Connect", onClick: () => {} },
  ];

  const SecondaryButtons = [
    { label: "Contact us", onClick: () => toggleModal("contactUs", true) },
    { label: "Rate Us", onClick: () => toggleModal("rateUs", true) },
    {
      label: "Privacy policy",
      onClick: () => handleNavigation(Paths.PRIVACY_POLICY),
    },
    {
      label: "Terms of use",
      onClick: () => handleNavigation(Paths.TERMS_OF_USE),
    },
    {
      label: "Sign out",
      onClick: handleSignOut,
      className: "text-red-500",
    },
  ];

  const [modals, setModals] = useState({
    measurement: false,
    addMedicine: false,
    updateWeight: false,
    contactUs: false,
    rateUs: false,
  });

  const [dreamWeight, setDreamWeight] = useState("70");
  const { uid } = useContext(UserContext);
  const { loading, setLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const toggleModal = (modalName, state) => {
    setModals((prev) => ({ ...prev, [modalName]: state }));
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await mutationUserWeights({
        uid,
        key: "dream_weight",
        value: dreamWeight,
      });
      if (res.data.result) console.log(res.data.result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleModal("updateWeight", false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-white p-4 w-full">
      <div className="flex flex-col items-center">
        <img
          className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
          alt="Profile"
          src="static/img/avatar.svg"
        />
        <h2 className="text-xl font-bold mt-4">Maria Adams</h2>
      </div>
      <div className="mt-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          {PrimaryButtons.map((item, index) => (
            <button
              key={index}
              className="w-full text-left py-2 border-b flex justify-between items-center"
              onClick={item.onClick}
            >
              <span>{item.label}</span>
              <img
                alt="green"
                src="static/img/right-arrow-green.svg"
                className="w-6 h-6"
              />
            </button>
          ))}
          <div className="flex justify-between items-center py-2 border-b">
            <span>Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#50B498] peer-focus:ring-4 peer-focus:ring-[#50B498]"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          {SecondaryButtons.map((item, index) => (
            <button
              key={index}
              className={`w-full text-left py-2 border-b flex justify-between items-center ${
                item.className || ""
              }`}
              onClick={item.onClick}
            >
              <span>{item.label}</span>
              <img
                alt="arrow"
                src="static/img/right-arrow-green.svg"
                className="w-6 h-6"
              />
            </button>
          ))}
        </div>
      </div>
      <MeasurementSystemModal
        isOpen={modals.measurement}
        onClose={() => toggleModal("measurement", false)}
      />
      {medicinesList.length > 0 && (
        <AddMedicineModal
          medicinesList={medicinesList}
          isOpen={modals.addMedicine}
          onRequestClose={() => toggleModal("addMedicine", false)}
          onConfirm={handleMedicineConfirm}
        />
      )}
      <UpdateWeightModal
        isOpen={modals.updateWeight}
        onRequestClose={() => toggleModal("updateWeight", false)}
        startWeight={dreamWeight}
        setStartWeight={setDreamWeight}
        onConfirm={handleConfirm}
        title={"Change Weight Goals"}
      />
      <ContactUsModal
        isOpen={modals.contactUs}
        onClose={() => toggleModal("contactUs", false)}
      />
      <RateUsModal
        isOpen={modals.rateUs}
        onClose={() => toggleModal("rateUs", false)}
      />
    </div>
  );
};

export default MoreTabContent;
