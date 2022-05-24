import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { superAdminUpdatesUserInfo } from "../customFirebaseHooks/updateFunctions";
const SuperAdminContext = React.createContext();

export const useSuperAdminFunction = () => {
  return useContext(SuperAdminContext);
};

export const SuperAdminProvider = ({ children }) => {
  const [allUsersInSystem, setAllUsersInSystem] = useState([]);
  const [getAllUsers, setGetAllUsers] = useState(false);
  const [userLevel, setUserLevel] = useState(null);
  const [allAdminsAnsSuperAdmins, setAllAdminsAnsSuperAdmins] = useState([]);
  const [makeChangesForSelectedUser, setMakeChangesForSelectedUser] = useState(
    {}
  );
  const [buttonToSaveChanhgesPressed, setButtonToSaveChanhgesPressed] =
    useState(false);
  const [
    makeChangesForSelectedUserFromPopup,
    setMakeChangesForSelectedUserFromPopup,
  ] = useState({});

  useEffect(() => {
    if (getAllUsers && userLevel === "superadmin") {
      const getAllUsersThatExistInTheSystem = async () => {
        try {
          await firestore()
            .collection("Users")
            .get()
            .then((response) => {
              let allUsers = [];
              response.forEach((doc) =>
                allUsers.push({ ...doc.data(), doc_id: doc.id })
              );

              setAllUsersInSystem(allUsers);
              findAdminsAndSuperAdmins(allUsers);
            })
            .catch((error) => {
              console.log("errorMessage ", error);
            });
        } catch (error) {
          console.log("SuperAdminContext errorMessage ", error);
        }
      };
      getAllUsersThatExistInTheSystem();
    }
  }, [getAllUsers]);

  useEffect(() => {
    if (buttonToSaveChanhgesPressed) {
      const changeUserData = () => {
        superAdminUpdatesUserInfo(makeChangesForSelectedUser.user).then(
          (res) => {
            if (res.success) {
              //After User name, status active, .... need to find this object in array and made changes there as well
            }
          }
        );
      };
      changeUserData();
    }
  }, [buttonToSaveChanhgesPressed]);

  const findAdminsAndSuperAdmins = (userArray) => {
    let adminArray = [];
    for (let i = 0; i < userArray.length; i++) {
      if (userArray[i].role === "admin" || userArray[i].role === "superadmin") {
        adminArray.push(userArray[i]);
      }
    }
    setAllAdminsAnsSuperAdmins(adminArray);
  };

  useEffect(() => {
    setMakeChangesForSelectedUser(makeChangesForSelectedUserFromPopup);
  }, [makeChangesForSelectedUserFromPopup]);

  console.log("buttonToSaveChanhgesPressed  ", buttonToSaveChanhgesPressed);
  console.log("makeChangesForSelectedUser  ", makeChangesForSelectedUser);

  return (
    <SuperAdminContext.Provider
      value={{
        allUsersInSystem: allUsersInSystem,
        setGetAllUsers: setGetAllUsers,
        userLevel: setUserLevel,
        allAdminsAnsSuperAdmins: allAdminsAnsSuperAdmins,
        makeChangesForSelectedUser: makeChangesForSelectedUser,
        setMakeChangesForSelectedUser: setMakeChangesForSelectedUser,
        buttonToSaveChanhgesPressed: buttonToSaveChanhgesPressed,
        setButtonToSaveChanhgesPressed: setButtonToSaveChanhgesPressed,
        setMakeChangesForSelectedUserFromPopup:
          setMakeChangesForSelectedUserFromPopup,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
