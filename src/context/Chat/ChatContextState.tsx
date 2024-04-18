import React, { useContext, useEffect, useState } from "react";
import { Activity, User } from "../../utility/types";

type ChatContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  activitiesConnectedToUser: Activity[];
  setActivitiesConnectedToUser: (activities: Activity[]) => void;
};

const ChatContext = React.createContext<ChatContextType>({
  user: undefined,
  setUser: () => undefined,
  activitiesConnectedToUser: [],
  setActivitiesConnectedToUser: () => [],
});

export const useChatFunction = () => {
  return useContext(ChatContext);
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [activitiesConnectedToUser, setActivitiesConnectedToUser] = useState<
    Activity[]
  >([]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        activitiesConnectedToUser,
        setActivitiesConnectedToUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
