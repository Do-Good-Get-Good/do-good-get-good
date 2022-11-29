import React, { useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

import {
  getAllUserData,
  getUsersFiveNewestTimeEntries,
} from "../customFirebaseHooks/getFunctions.js";

const AdminHomePageContext = React.createContext();

export const useAdminHomePageFunction = () => {
  return useContext(AdminHomePageContext);
};

export const AdminHomePageProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [reloadOneUserData, setReloadOneUserData] = useState(false);
  const [confirmedTimeEntries, setConfirmedTimeEntries] = useState([]);
  const [usersId, setUsersId] = useState([]);
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      let userData = await getAllUserData(auth().currentUser.uid);
      setUserData(userData);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (usersId.length != 0 && reloadOneUserData) {
      const fetchTimeEntryData = async () => {
        let timeEntryData = [];
        for (let i = 0; i < usersId.length; i++) {
          try {
            let response = await getUsersFiveNewestTimeEntries(usersId[i]);
            timeEntryData.push(response);
          } catch (error) {
            console.log(error);
          }
        }
        setConfirmedTimeEntries(timeEntryData);
      };
      fetchTimeEntryData();
    }
  }, [reloadOneUserData]);

  return (
    <AdminHomePageContext.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
        setReloadOneUserData: setReloadOneUserData,
        reloadOneUserData: reloadOneUserData,
        confirmedTimeEntries: confirmedTimeEntries,
        setUsersId: setUsersId,
        newUser: newUser,
        setNewUser: setNewUser,
      }}
    >
      {children}
    </AdminHomePageContext.Provider>
  );
};
