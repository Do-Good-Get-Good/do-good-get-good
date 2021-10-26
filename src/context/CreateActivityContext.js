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
  const [createNewActivityInFB, setCreateNewActivityInFB] = useState({
    active_status: "",
    activity_city: "",
    activity_description: "",
    activity_photo: "",
    activity_place: "",
    activity_title: "",
    tg_favorite: false,
  });

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
      console.log("CreateActivityContext all active actvivitiesFB useEffect");
      getAllActiveActivities();
    }
  }, []);

  useEffect(() => {
    if (
      createNewActivityInFB.activity_title &&
      createNewActivityInFB.activity_place &&
      createNewActivityInFB.activity_city
    ) {
      const setNewActivityToFireBase = async () => {
        firestore()
          .collection("Activities")
          .add({
            active_status: createNewActivityInFB.active_status,
            activity_city: createNewActivityInFB.activity_city,
            activity_description: createNewActivityInFB.activity_description,
            activity_photo: createNewActivityInFB.activity_photo,
            activity_place: createNewActivityInFB.activity_place,
            activity_title: createNewActivityInFB.activity_title,
            tg_favorite: createNewActivityInFB.tg_favorite,
          })
          .then(() => {
            console.log("New Activity added to FireBase!");
          });
      };
      setNewActivityToFireBase();
    }
  }, [createNewActivityInFB]);

  // console.log(
  //   "CreactActivityContext createNewActivityInFB",
  //   createNewActivityInFB.activity_title
  // );

  return (
    <CreateActivityContext.Provider
      value={{
        chooseInDropDown: setAnswerFromDropDownInCreateActivity,
        sendChoiceFromDropDown: answerFromDropDownInCreateActivity,
        sendFechToFBToGetActiveActivities: setShowAllActiveActivities,
        activeActivities: allActiveActvivitiesFB,
        setNewActivity: setCreateNewActivityInFB,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  );
};
