import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
const SuggestionContext = React.createContext();

export const useSuggestionFunction = () => {
  return useContext(SuggestionContext);
};

export const SuggestionProvider = ({ children }) => {
  const [suggestionsFB, setSuggestionsFB] = useState([]);

  useEffect(() => {
    const popularActivities = async () => {
      const popularTrueActivities = await firestore()
        .collection("Activities")
        .where("tg_favorite", "==", true)
        .get();

      let activities = popularTrueActivities.docs.map((doc) => doc.data());
      console.log(
        "popularTrueActivities.docs.map((doc) => doc.data())",
        activities.length
      );
      if (activities != null && activities.length > suggestionsFB.length) {
        for (let i = 0; i < activities.length; i++) {
          const dataInfo = {
            id: activities[i].activityID,
            title: activities[i].activity_title,
            city: activities[i].activity_city,
            description: activities[i].activity_description,
            photo: activities[i].activity_photo,
          };
          setSuggestionsFB((prev) => [...prev, dataInfo]);
        }
      }
    };
    console.log("suggestionsFB", suggestionsFB);
    popularActivities();
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
