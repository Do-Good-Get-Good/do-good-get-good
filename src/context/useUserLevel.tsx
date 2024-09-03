import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Role } from "../utility/enums";

type UserLevelContextType = {
  userLevel?: Role;
  setUserLevel: (role: Role) => void;
};

const UserLevelContext = createContext<UserLevelContextType>({
  setUserLevel: () => {},
});

export const useUserLevel = () => {
  return useContext(UserLevelContext);
};

export const UserLevelProvider = ({ children }: PropsWithChildren) => {
  const [userLevel, setUserLevel] = useState<Role | undefined>();

  return (
    <UserLevelContext.Provider value={{ userLevel, setUserLevel }}>
      {children}
    </UserLevelContext.Provider>
  );
};
