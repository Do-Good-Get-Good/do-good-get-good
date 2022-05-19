import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
const SuperAdminContext = React.createContext();

export const useSuperAdminFunction = () => {
  return useContext(SuperAdminContext);
};

export const SuperAdminProvider = ({ children }) => {
  const [allUsersInSystem, setAllUsersInSystem] = useState([]);
  const [getAllUsers, setGetAllUsers] = useState(false);
  const [userLevel, setUserLevel] = useState(null);

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
  //After User name, status active, .... need to find this object in array and made changes there as well

  return (
    <SuperAdminContext.Provider
      value={{
        allUsersInSystem: allUsersInSystem,
        setGetAllUsers: setGetAllUsers,
        userLevel: setUserLevel,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
