import {
  useState,
  createContext,
  useContext,
  FC,
  ReactNode,
  useEffect,
} from "react";
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

export const UserLevelProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userLevel, setUserLevel] = useState<Role | undefined>();

  useEffect(() => {
    console.log("UserLevel: ", userLevel);
  }, [userLevel, setUserLevel]);

  return (
    <UserLevelContext.Provider value={{ userLevel, setUserLevel }}>
      {children}
    </UserLevelContext.Provider>
  );
};
