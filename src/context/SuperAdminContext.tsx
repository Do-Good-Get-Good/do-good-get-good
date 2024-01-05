import React, { useContext, useState, useEffect } from "react";
import { superAdminUpdatesUserInfo } from "../firebase-functions/updateTS/superAdminUpdatesUserInfo";
import { getAllUsersData } from "../firebase-functions/getTS/getAllUsersData";
import { User, UserObjectForSuperAdmin } from "../utilily/types";
import { Role } from "../utilily/enums";

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
};
// const defaultValue: SuperAdminContextType = {
//   userLevel: () => undefined,
//   buttonToSaveChanhgesPressed: false,

//   // setGetAllUsers: () => false,
//   allUsersInSystem: undefined,
//   getAllUsers: false,
//   allAdminsAnsSuperAdmins: undefined,
//   makeChangesForSelectedUser: undefined,
//   userIDToConnectAnotherAdmin: "",
// };

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
          allUsers && findAdminsAndSuperAdmins(allUsers);
        } catch (error) {
          console.log("SuperAdminContext errorMessage ", error);
        }
      };

      getAllUsersThatExistInTheSystem();
    }
  }, [getAllUsers]);

  console.log(getAllUsers, "----------  getAllUsers");

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
  console.log(allUsersInSystem);
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
