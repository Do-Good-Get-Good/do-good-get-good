import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const ChangeUserInfoContext = React.createContext();

export const useChangeUserInfoFunction = () => {
  return useContext(ChangeUserInfoContext);
};

export const ChangeUserInfoProvider = ({ children }) => {
  const [newChangesInUserInfo, setNewChangesInUserInfo] = useState({
    userID: " ",
    userFirstName: " ",
    userLastName: " ",
    statusActive: null,
  });
  const [reloadAfterUserNameChanged, setReloadAfterUserNameChanged] =
    useState(false);

  useEffect(() => {
    if (newChangesInUserInfo.userID != " ") {
      const setchangedUserFirstNameToFirebase = () => {
        firestore()
          .collection("Users")
          .doc(newChangesInUserInfo.userID)
          .update({
            first_name: newChangesInUserInfo.userFirstName,
            last_name: newChangesInUserInfo.userLastName,
            status_active: newChangesInUserInfo.statusActive,
          })
          .then(() => {
            console.log("User first name has been changed");
            setReloadAfterUserNameChanged(true);
          });
      };
      setchangedUserFirstNameToFirebase();
    }
  }, [newChangesInUserInfo]);

  return (
    <ChangeUserInfoContext.Provider
      value={{
        setNewChangesInUserInfo: setNewChangesInUserInfo,
        reloadAfterUserNameChanged: reloadAfterUserNameChanged,
        setReloadAfterUserNameChanged: setReloadAfterUserNameChanged,
        newChangesInUserInfo: newChangesInUserInfo,
      }}
    >
      {children}
    </ChangeUserInfoContext.Provider>
  );
};
