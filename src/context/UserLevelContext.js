import React, { useState, useContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { getUserLevel } from "../firebase-functions/get";
import { UserLevels } from "../userlevels";

const UserLevelContext = React.createContext();

export const useUserLevelCheckFunction = () => {
  return useContext(UserLevelContext);
};

export const UserLevelProvider = ({ children }) => {
  const [userLevel, setUserLevel] = useState(null);

  const fetchUserLevel = async () => {
    const response = await getUserLevel(auth().currentUser.uid);

    switch (response) {
      case UserLevels.User:
        setUserLevel(UserLevels.User);
        break;
      case UserLevels.Admin:
        setUserLevel(UserLevels.Admin);
        break;
      case UserLevels.SuperAdmin:
        setUserLevel(UserLevels.SuperAdmin);
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
