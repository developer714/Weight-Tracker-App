import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GlobalContext } from "./GlobalContext";
import { getAuth } from "firebase/auth"; // Add this import

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setAllowed } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState(() => {
    const storedUid = sessionStorage.getItem("uid");
    return storedUid || "";
  });

  useEffect(() => {
    const auth = getAuth(); // Initialize auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        sessionStorage.setItem("uid", user.uid);
      } else {
        setUid("");
        sessionStorage.removeItem("uid");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const sessionUid = sessionStorage.getItem("uid");
    if (uid === sessionUid) setAllowed(true);
  }, [uid, setAllowed]); // Add setAllowed to dependency array

  const memorizedValues = useMemo(() => {
    return { username, setUsername, uid, setUid };
  }, [username, setUsername, uid, setUid]);

  return (
    <UserContext.Provider value={memorizedValues}>
      {children}
    </UserContext.Provider>
  );
};
