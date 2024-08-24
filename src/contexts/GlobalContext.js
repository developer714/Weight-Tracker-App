import { createContext, useMemo, useState } from "react";
import { mutationUserWeights } from "../firebaseApis/healthApis";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [userWeights, setUserWeights] = useState(null);
  const [userShotsInfo, setUserShotsInfo] = useState(null);
  const [shots, setShots] = useState({});
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const memorizeValues = useMemo(() => {
    return {
      userWeights,
      setUserWeights,
      userShotsInfo,
      setUserShotsInfo,
      mutationUserWeights,
      shots,
      setShots,
      loading,
      setLoading,
      allowed,
      setAllowed,
      activeTab,
      setActiveTab,
    };
  }, [
    userWeights,
    setUserWeights,
    userShotsInfo,
    setUserShotsInfo,
    shots,
    setShots,
    loading,
    setLoading,
    allowed,
    setAllowed,
    activeTab,
    setActiveTab,
  ]);
  return (
    <GlobalContext.Provider value={memorizeValues}>
      {children}
    </GlobalContext.Provider>
  );
};
