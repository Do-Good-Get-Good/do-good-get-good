import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
const CreateActivityContext = React.createContext();

export const useCreateActivityFunction = () => {
  return useContext(CreateActivityContext);
};

export const CreateActivityProvider = ({ children }) => {
  const [
    answerFromDropDownInCreateActivity,
    setAnswerFromDropDownInCreateActivity,
  ] = useState("");

  const [showAllActiveActivities, setShowAllActiveActivities] = useState(true);

  const [allActiveActvivitiesFB, setAllActiveActvivitiesFB] = useState([]);

  useEffect(() => {
    if (showAllActiveActivities === true) {
      const getAllActiveActivities = async () => {
        const allActiveActivities = await firestore()
          .collection("Activities")
          .where("active_status", "==", true)
          .get();

        let activities = allActiveActivities.docs.map((doc) => doc.data());

        if (
          activities != null &&
          activities.length > allActiveActvivitiesFB.length
        ) {
          for (let i = 0; i < activities.length; i++) {
            const dataInfo = {
              id: activities[i].activityID,
              title: activities[i].activity_title,
              city: activities[i].activity_city,
              place: activities[i].activity_place,
              description: activities[i].activity_description,
              photo: activities[i].activity_photo,
            };
            setAllActiveActvivitiesFB((prev) => [...prev, dataInfo]);
          }
        }
      };
      console.log("AllActiveActvivitiesFB", allActiveActvivitiesFB);
      getAllActiveActivities();
    }
  }, []);
  //   }, [adminNeedToSeeActivities]);

  console.log(
    "Create Activity context answerFromDropDownInCreateActivity",
    answerFromDropDownInCreateActivity
  );

  return (
    <CreateActivityContext.Provider
      value={{
        chooseInDropDown: setAnswerFromDropDownInCreateActivity,
        sendChoiceFromDropDown: answerFromDropDownInCreateActivity,
        sendFechToFBToGetActiveActivities: setShowAllActiveActivities,
        activeActivities: allActiveActvivitiesFB,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  );
};
