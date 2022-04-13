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
      const response = await firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .get();

      if (response.data().role === "admin") {
        setUserLevel("admin");
      } else {
        setUserLevel("user");
      }
    };
    checkIfUserIsAdmin();
  }, []);

  return (
    <AdminContext.Provider value={userLevel}>{children}</AdminContext.Provider>
  );
};
