import React, { useState, useContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const AdminContext = React.createContext();

export const useAdminCheckFunction = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkIfUserIsAdmin = async () => {
      const response = await firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .get();
      if (response.data().role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    checkIfUserIsAdmin();
  }, []);

  return (
    <AdminContext.Provider value={isAdmin}>{children}</AdminContext.Provider>
  );
};
