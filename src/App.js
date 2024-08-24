import "./index.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import WelcomeScreen from "./pages/WelcomeScreen/WelcomeScreen";
import UserInfoScreen from "./pages/UserInfoScreen/UserInfoScreen";
import ReminderScreen from "./pages/ReminderScreen/ReminderScreen";
import WeightLossScreen from "./pages/WeightLossScreen/WeightLossScreen";
import CommunityScreen from "./pages/CommunityScreen/CommunityScreen";
import HealthConnectScreen from "./pages/HealthConnectScreen/HealthConnectScreen";
import StartWeightScreen from "./pages/StartWeightScreen/StartWeightScreen";
import CurrentWeightScreen from "./pages/CurrentWeightScreen/CurrentWeightScreen";
import DreamWeightScreen from "./pages/DreamWeightScreen/DreamWeightScreen";
import CheckCurrentWeightScreen from "./pages/CheckCurrentWeightScreen/CheckCurrentWeightScreen";
import TodayWeightScreen from "./pages/TodayWeightScreen/TodayWeightScreen";
import MedicineNameScreen from "./pages/MedicineNameScreen/MedicineNameScreen";
import DosageScreen from "./pages/DosageScreen/DosageScreen";
import LastShotScreen from "./pages/LastShotScreen/LastShotScreen";
import ShotsFrequencyScreen from "./pages/ShotsFrequencyScreen/ShotsFrequencyScreen";
import LastReminderScreen from "./pages/LastReminderScreen/LastReminderScreen";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Management from "./pages/Management/Management";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import { Paths } from "./AppConstants";
import { GlobalContext } from "./contexts/GlobalContext";

const App = () => {
  const { allowed } = useContext(GlobalContext);

  return (
    <Router>
      <Routes>
        <Route path={Paths.WELCOME} exact element={<WelcomeScreen />} />
        <Route path={Paths.USER_INFO} element={<UserInfoScreen />} />
        <Route path={Paths.REMINDER} element={<ReminderScreen />} />
        <Route path={Paths.WEIGHT_LOSS} element={<WeightLossScreen />} />
        <Route path={Paths.COMMUNITY} element={<CommunityScreen />} />
        <Route path={Paths.HEALTH_CONNECT} element={<HealthConnectScreen />} />
        <Route path={Paths.START_WEIGHT} element={<StartWeightScreen />} />
        <Route path={Paths.CURRENT_WEIGHT} element={<CurrentWeightScreen />} />
        <Route path={Paths.DREAM_WEIGHT} element={<DreamWeightScreen />} />
        <Route
          path={Paths.CHECK_CURRENT_WEIGHT}
          element={<CheckCurrentWeightScreen />}
        />
        <Route path={Paths.TODAY_WEIGHT} element={<TodayWeightScreen />} />
        <Route path={Paths.MEDICINE_NAME} element={<MedicineNameScreen />} />
        <Route path={Paths.MEDICINE_DOSAGE} element={<DosageScreen />} />
        <Route path={Paths.LAST_SHOT} element={<LastShotScreen />} />
        <Route
          path={Paths.SHOTS_FREQUENCY}
          element={<ShotsFrequencyScreen />}
        />
        <Route path={Paths.LAST_REMINDER} element={<LastReminderScreen />} />
        <Route path={Paths.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={Paths.MANAGEMENT} element={<Management />} />
        <Route path={Paths.HOME} element={<Home />} />
        <Route path={Paths.SIGNUP} element={<SignUp />} />
        <Route path={Paths.SIGNIN} element={<SignIn />} />
        <Route path={Paths.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={Paths.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={Paths.TERMS_OF_USE} element={<TermsOfUse />} />
      </Routes>
    </Router>
  );
};

export default App;
