import React, { useContext, useState, useEffect } from "react";
import { getAllFavoriteActivities } from "../customFirebaseHooks/getFunctions";

const SuggestionContext = React.createContext();

export const useSuggestionFunction = () => {
  return useContext(SuggestionContext);
};

export const SuggestionProvider = ({ children }) => {
  const [suggestionsFB, setSuggestionsFB] = useState([]);

  const fetchFavoriteActivities = async () => {
    let favoriteActivities = await getAllFavoriteActivities();
    setSuggestionsFB(favoriteActivities);
  };

  useEffect(() => {
    fetchFavoriteActivities();
  }, []);

  return (
    <SuggestionContext.Provider
      value={{
        popularActivities: suggestionsFB,
      }}
    >
      {children}
    </SuggestionContext.Provider>
  );
};
