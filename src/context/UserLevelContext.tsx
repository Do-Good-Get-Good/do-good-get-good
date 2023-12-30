import React, { useContext, PropsWithChildren } from "react";
import { UserPermissionLevel } from "../utilily/types";

type UserLevel = { userLevel: UserPermissionLevel };

const UserLevelContext = React.createContext<UserPermissionLevel>({
  superadmin: false,
  admin: false,
  user: false,
  developer: false,
});

export const useUserLevel = () => {
  return useContext(UserLevelContext);
};

export const UserLevelProvider = ({
  userLevel,
  children,
}: PropsWithChildren<UserLevel>) => {
  return (
    <UserLevelContext.Provider value={userLevel}>
      {children}
    </UserLevelContext.Provider>
  );
};
