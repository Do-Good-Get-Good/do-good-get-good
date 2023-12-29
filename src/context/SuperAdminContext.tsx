import React, { useContext, useState, useEffect } from "react";
import { superAdminUpdatesUserInfo } from "../firebase-functions/updateTS/superAdminUpdatesUserInfo";
import { getAllUsersData } from "../firebase-functions/getTS/getAllUsersData";
import { User, UserObjectForSuperAdmin } from "../utilily/types";
import { Role } from "../utilily/enums";

type SuperAdminContextType = {
  allUsersInSystem: User[] | undefined;
  getAllUsers: boolean;
  allAdminsAnsSuperAdmins: User[] | undefined;
  makeChangesForSelectedUser: UserObjectForSuperAdmin | undefined;
};
const defaultValue: SuperAdminContextType = {
  allUsersInSystem: undefined,
  getAllUsers: false,
  allAdminsAnsSuperAdmins: undefined,
  makeChangesForSelectedUser: undefined,
};

const SuperAdminContext =
  React.createContext<SuperAdminContextType>(defaultValue);

export const useSuperAdminFunction = () => {
  return useContext(SuperAdminContext);
};

export const SuperAdminProvider = ({ children }) => {
  const [allUsersInSystem, setAllUsersInSystem] = useState<User[] | undefined>(
    [],
  );
  const [getAllUsers, setGetAllUsers] = useState(false);
  const [userLevel, setUserLevel] = useState<Role | null>(null);
  const [allAdminsAnsSuperAdmins, setAllAdminsAnsSuperAdmins] = useState<
    User[]
  >([]);
  const [makeChangesForSelectedUser, setMakeChangesForSelectedUser] = useState<
    UserObjectForSuperAdmin | undefined
  >(undefined);
  const [buttonToSaveChanhgesPressed, setButtonToSaveChanhgesPressed] =
    useState(false);
  const [userIDToConnectAnotherAdmin, setUserIDToConnectAnotherAdmin] =
    useState<User["id"]>("");

  const [arrayOfIdOfChangedUserInfo, setArrayOfIdOfChangedUserInfo] = useState(
    [],
  );

  useEffect(() => {
    if (getAllUsers === true && userLevel === Role.superadmin) {
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

  // useEffect(() => {
  //   if (buttonToSaveChanhgesPressed) {
  //     const changeUserData = () => {
  //       for (let i = 0; i < arrayOfIdOfChangedUserInfo.length; i++) {
  //         let user: User | undefined = undefined;

  //         const index =
  //           makeChangesForSelectedUser?.arrayOfUsersIfAdmin?.findIndex(
  //             (x) => x.id === arrayOfIdOfChangedUserInfo[i],
  //           );

  //         if (
  //           makeChangesForSelectedUser?.user.id ===
  //           arrayOfIdOfChangedUserInfo[i]
  //         ) {
  //           user = makeChangesForSelectedUser.user;
  //         } else if (index != -1) {
  //           user = makeChangesForSelectedUser?.arrayOfUsersIfAdmin[index].user;
  //         }

  //         if (user != null) {
  //           superAdminUpdatesUserInfo(user).then((res) => {
  //             if (res.success) {
  //               let tempArray = allUsersInSystem;
  //               let findIndexInArray = tempArray.findIndex(
  //                 (x) => x.id === user.id,
  //               );
  //               tempArray.splice(findIndexInArray, 1, user);
  //               setAllUsersInSystem(tempArray);

  //               //After User name, status active, .... need to find this object in array and made changes there as well
  //             }
  //           });
  //         }
  //         setButtonToSaveChanhgesPressed(false);
  //       }
  //     };

  //     changeUserData();
  //   }
  // }, [buttonToSaveChanhgesPressed]);

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

        arrayOfIdOfChangedUserInfo: arrayOfIdOfChangedUserInfo,
        setArrayOfIdOfChangedUserInfo: setArrayOfIdOfChangedUserInfo,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
