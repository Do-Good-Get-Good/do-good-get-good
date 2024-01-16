import React, { useContext, useState, useEffect } from "react";
import { superAdminUpdatesUserInfo } from "../firebase-functions/updateTS/superAdminUpdatesUserInfo";
import { getAllUsersData } from "../firebase-functions/getTS/getAllUsersData";
import { User, UserObjectForSuperAdmin } from "../utilily/types";
import { Role } from "../utilily/enums";
import { findIndex, set } from "lodash";

type SuperAdminContextType = {
  allUsersInSystem: User[] | undefined;
  userLevel: (value: Role | undefined) => void;
  getAllUsers: boolean;
  setGetAllUsers: (value: boolean) => void;
  setMakeChangesForSelectedUser: (
    value: UserObjectForSuperAdmin | undefined,
  ) => void;
  buttonToSaveChanhgesPressed: boolean;
  setButtonToSaveChanhgesPressed: (value: boolean) => void;
  allAdminsAnsSuperAdmins: User[] | undefined;
  userIDToConnectAnotherAdmin: User["id"];
  setUserIDToConnectAnotherAdmin: (value: User["id"]) => void;
  makeChangesForSelectedUser: UserObjectForSuperAdmin | undefined;
  updateUserAfterChanges: (value: User) => void;
};

const updateUserArray = (arrayToUpdate: Array<User>, changedUser: User) => {
  const index = findIndex(arrayToUpdate, ["id", changedUser.id]);
  if (index !== -1) {
    const newArray = [...arrayToUpdate];
    newArray.splice(index, 1, changedUser);
    return newArray;
  } else arrayToUpdate;
};

const SuperAdminContext = React.createContext<
  SuperAdminContextType | undefined
>(undefined);

export const useSuperAdminFunction = () => {
  return useContext(SuperAdminContext);
};

export const SuperAdminProvider = ({ children }) => {
  const [allUsersInSystem, setAllUsersInSystem] = useState<User[] | undefined>(
    [],
  );
  const [getAllUsers, setGetAllUsers] = useState(false);
  const [userLevel, setUserLevel] = useState<Role | undefined>(undefined);
  const [allAdminsAnsSuperAdmins, setAllAdminsAnsSuperAdmins] = useState<
    User[] | undefined
  >(undefined);
  const [makeChangesForSelectedUser, setMakeChangesForSelectedUser] = useState<
    UserObjectForSuperAdmin | undefined
  >(undefined);
  const [buttonToSaveChanhgesPressed, setButtonToSaveChanhgesPressed] =
    useState(false);
  const [userIDToConnectAnotherAdmin, setUserIDToConnectAnotherAdmin] =
    useState<User["id"]>("");

  useEffect(() => {
    if (getAllUsers === true && userLevel === Role.superadmin) {
      const getAllUsersThatExistInTheSystem = async () => {
        try {
          let allUsers = await getAllUsersData();
          setAllUsersInSystem(allUsers);
          allUsers && findAdminsAndSuperAdmins(allUsers);
        } catch (error) {
          console.log("SuperAdminContext errorMessage ", error);
        }
      };

      getAllUsersThatExistInTheSystem();
    }
  }, [getAllUsers]);

  const updateUserAfterChanges = (changedUser: User) => {
    if (makeChangesForSelectedUser?.user.id === changedUser.id) {
      setMakeChangesForSelectedUser(
        set(makeChangesForSelectedUser, "user", changedUser),
      );
    }

    makeChangesForSelectedUser?.arrayOfUsersIfAdmin &&
      setMakeChangesForSelectedUser(
        set(
          makeChangesForSelectedUser,
          "arrayOfUsersIfAdmin",
          updateUserArray(
            makeChangesForSelectedUser.arrayOfUsersIfAdmin,
            changedUser,
          ),
        ),
      );

    allUsersInSystem &&
      setAllUsersInSystem(updateUserArray(allUsersInSystem, changedUser));

    allUsersInSystem && findAdminsAndSuperAdmins(allUsersInSystem);
  };

  const findAdminsAndSuperAdmins = (userArray: Array<User>) => {
    let adminArray: Array<User> = [];
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

        updateUserAfterChanges: updateUserAfterChanges,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
