import React, { useContext, useState, useEffect } from "react";
import { updateUserInfoFromAdminScreen } from "../customFirebaseHooks/updateFunctions";

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
      updateUserInfoFromAdminScreen(newChangesInUserInfo);
      setReloadAfterUserNameChanged(true);
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
