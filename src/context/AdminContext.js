import React, { useState, useContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const AdminContext = React.createContext();

export const useAdminCheckFunction = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [userLevel, setUserLevel] = useState(null);

  useEffect(() => {
    const checkIfUserIsAdmin = async () => {
      try {
        await firestore()
          .collection("Users")
          .doc(auth().currentUser.uid)
          .get()
          .then((response) => {
            if (response.data().role === "superadmin") {
              setUserLevel("superadmin");
            } else if (response.data().role === "admin") {
              setUserLevel("admin");
            } else {
              setUserLevel("user");
            }
          })
          .catch((error) => {
            console.log("errorMessage ", error);
          });
      } catch (error) {
        console.log("AdminContex errorMessage ", error);
      }
    };
    checkIfUserIsAdmin();
  }, []);

  return (
    <AdminContext.Provider value={userLevel}>{children}</AdminContext.Provider>
  );
};
