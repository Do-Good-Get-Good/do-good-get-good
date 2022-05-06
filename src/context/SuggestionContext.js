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
        let tempArray = [];
        let activities = [];
        await firestore()
          .collection("Activities")
          .where("tg_favorite", "==", true)
          .get()
          .then((popularTrueActivities) => {
            popularTrueActivities.forEach((doc) =>
              activities.push({ ...doc.data(), doc_id: doc.id })
            );

            if (
              activities != null &&
              activities.length > suggestionsFB.length
            ) {
              for (let i = 0; i < activities.length; i++) {
                const dataInfo = {
                  id: activities[i].doc_id,

                  title: activities[i].activity_title,
                  city: activities[i].activity_city,
                  place: activities[i].activity_place,
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
