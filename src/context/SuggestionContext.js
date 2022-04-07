import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
const SuggestionContext = React.createContext();

export const useSuggestionFunction = () => {
  return useContext(SuggestionContext);
};

export const SuggestionProvider = ({ children }) => {
  const [suggestionsFB, setSuggestionsFB] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished === false) {
      const popularActivities = async () => {
        try {
          let tempArray = [];
          await firestore()
            .collection("Activities")
            .where("tg_favorite", "==", true)
            .get()
            .then((popularTrueActivities) => {
              let activities = popularTrueActivities.docs.map((doc) =>
                doc.data()
              );

              if (
                activities != null &&
                activities.length > suggestionsFB.length
              ) {
                for (let i = 0; i < activities.length; i++) {
                  const dataInfo = {
                    id: activities[i].activityID,
                    title: activities[i].activity_title,
                    city: activities[i].activity_city,
                    description: activities[i].activity_description,
                    photo: activities[i].activity_photo,
                    popular: activities[i].tg_favorite,
                  };
                  tempArray.push(dataInfo);
                }
                console.log("SuggestionContext popular activity useEffect");
              }
              setSuggestionsFB(tempArray);
              setIsFinished(true);
            })
            .catch((error) => {
              console.log("errorMessage ", error);
            });
        } catch (error) {
          console.log("SuggestionContext errorMessage ", error);
        }
      };

      popularActivities();
    }
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
