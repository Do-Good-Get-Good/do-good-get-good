import React, { useState, useContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { getUserLevel } from "../firebase-functions/get";

const UserLevelContext = React.createContext();

export const useUserLevelCheckFunction = () => {
  return useContext(UserLevelContext);
};

export const UserLevelProvider = ({ children }) => {
  const [userLevel, setUserLevel] = useState(null);

  const fetchUserLevel = async () => {
    const response = await getUserLevel(auth().currentUser.uid);

    switch (response) {
      case "user":
        setUserLevel("user");
        break;
      case "admin":
        setUserLevel("admin");
        break;
      case "superadmin":
        setUserLevel("superadmin");
        break;
    }
  };

  useEffect(() => {
    fetchUserLevel();
  }, []);

  return (
    <UserLevelContext.Provider value={userLevel}>
      {children}
    </UserLevelContext.Provider>
  );
};
