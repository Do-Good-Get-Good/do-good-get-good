import React, { useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { getAllUserData } from "../customFirebaseHooks/getFunctions.js";

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
      getAllUserData(auth().currentUser.uid).then((querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(data);
      });
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
        newUser: newUser,
        setNewUser: setNewUser,
      }}
    >
      {children}
    </AdminHomePageContext.Provider>
  );
};
