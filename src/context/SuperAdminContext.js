import React, { useContext, useState, useEffect } from "react";
import { superAdminUpdatesUserInfo } from "../firebase-functions/update";
import { getAllUsersData } from "../firebase-functions/get";

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
    {},
  );
  const [buttonToSaveChanhgesPressed, setButtonToSaveChanhgesPressed] =
    useState(false);
  const [userIDToConnectAnotherAdmin, setUserIDToConnectAnotherAdmin] =
    useState("");

  const [arrayOfIdOfChangedUserInfo, setArrayOfIdOfChangedUserInfo] = useState(
    [],
  );

  useEffect(() => {
    if (getAllUsers === true && userLevel?.superadmin) {
      const getAllUsersThatExistInTheSystem = async () => {
        try {
          let allUsers = await getAllUsersData();
          setAllUsersInSystem(allUsers);
          findAdminsAndSuperAdmins(allUsers);
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
        for (let i = 0; i < arrayOfIdOfChangedUserInfo.length; i++) {
          let user = null;

          var index = makeChangesForSelectedUser.arrayOfUsersIfAdmin.findIndex(
            (x) => x.user.docId === arrayOfIdOfChangedUserInfo[i],
          );

          if (
            makeChangesForSelectedUser.user.docId ===
            arrayOfIdOfChangedUserInfo[i]
          ) {
            user = makeChangesForSelectedUser.user;
          } else if (index != -1) {
            user = makeChangesForSelectedUser.arrayOfUsersIfAdmin[index].user;
            console.log(" user  ", user);
          }

          if (user != null) {
            superAdminUpdatesUserInfo(user).then((res) => {
              if (res.success) {
                let tempArray = allUsersInSystem;
                let findIndexInArray = tempArray.findIndex(
                  (x) => x.docId === user.docId,
                );
                tempArray.splice(findIndexInArray, 1, user);
                setAllUsersInSystem(tempArray);

                //After User name, status active, .... need to find this object in array and made changes there as well
              }
            });
          }
          setButtonToSaveChanhgesPressed(false);
        }
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

  return (
    <SuperAdminContext.Provider
      value={{
        allUsersInSystem: allUsersInSystem,
        setGetAllUsers: setGetAllUsers,
        getAllUsers: getAllUsers,
        userLevel: setUserLevel,
        allAdminsAnsSuperAdmins: allAdminsAnsSuperAdmins,

        makeChangesForSelectedUser: makeChangesForSelectedUser,
        setMakeChangesForSelectedUser: setMakeChangesForSelectedUser,

        buttonToSaveChanhgesPressed: buttonToSaveChanhgesPressed,
        setButtonToSaveChanhgesPressed: setButtonToSaveChanhgesPressed,

        userIDToConnectAnotherAdmin: userIDToConnectAnotherAdmin,
        setUserIDToConnectAnotherAdmin: setUserIDToConnectAnotherAdmin,

        arrayOfIdOfChangedUserInfo: arrayOfIdOfChangedUserInfo,
        setArrayOfIdOfChangedUserInfo: setArrayOfIdOfChangedUserInfo,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
