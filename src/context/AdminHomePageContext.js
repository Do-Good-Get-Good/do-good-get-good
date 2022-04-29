import React, { useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { useAllUserData } from "../customFirebaseHooks/useAllUserData";

const AdminHomePageContext = React.createContext();

export const useAdminHomePageFunction = () => {
  return useContext(AdminHomePageContext);
};

export const AdminHomePageProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [reloadOneUserData, setReloadOneUserData] = useState(false);
  const [confirmedTimeEntries, setConfirmedTimeEntries] = useState([]);
  const [usersId, setUsersId] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      let data = await useAllUserData(auth().currentUser.uid);
      setUserData(data);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (usersId.length != 0 && reloadOneUserData) {
      const fetchTimeEntryData = async () => {
        let timeEntryData = [];
        for (let i = 0; i < usersId.length; i++) {
          try {
            await firestore()
              .collection("timeentries")
              .where("user_id", "==", usersId[i])
              .where("status_confirmed", "==", true)
              .orderBy("date", "desc")
              .limit(5)
              .get()
              .then((response) => {
                timeEntryData.push(response.docs.map((doc) => doc.data()));
              })
              .catch((error) => console.log(error));
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
      }}
    >
      {children}
    </AdminHomePageContext.Provider>
  );
};
