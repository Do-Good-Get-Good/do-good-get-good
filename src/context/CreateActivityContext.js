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
  const [updateActivityGallery, setUpdateActivityGallery] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [searchingWord, setSearchingWord] = useState("");

  const [createNewActivityInFB, setCreateNewActivityInFB] = useState({
    active_status: "",
    activity_city: "",
    activity_description: "",
    activity_photo: "",
    activity_place: "",
    activity_title: "",
    tg_favorite: false,
  });
  const [newChangeActivity, setNewChangeActivity] = useState({
    id: "",
    active: null,
    title: "",
    city: "",
    photo: "",
    description: "",
    popular: "",
  });
  const [changedOneActivity, setChangedOneActivity] = useState(false);
  const [activityID, setActivityID] = useState(null);

  useEffect(() => {
    if (showAllActiveActivities === true) {
      const getAllActiveActivities = async () => {
        const allActiveActivities = await firestore()
          .collection("Activities")
          .where("active_status", "==", true)
          .get();

        let activities = allActiveActivities.docs.map((doc) => doc.data());
        let docId = allActiveActivities.docs.map((doc) => doc.id);

        if (
          activities != null &&
          activities.length > allActiveActvivitiesFB.length
        ) {
          for (let i = 0; i < activities.length; i++) {
            const dataInfo = {
              id: docId[i],
              title: activities[i].activity_title,
              active: activities[i].active_status,
              city: activities[i].activity_city,
              place: activities[i].activity_place,
              description: activities[i].activity_description,
              photo: activities[i].activity_photo,
              popular: activities[i].tg_favorite,
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
      createNewActivityInFB.activity_title != "" &&
      createNewActivityInFB.activity_place != "" &&
      createNewActivityInFB.activity_city != ""
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

  useEffect(() => {
    if (changedOneActivity === true && activityID != null) {
      const getChangedActivity = async () => {
        const getActivity = await firestore()
          .collection("Activities")
          .doc(activityID)
          .get();

        let info = getActivity.data();
        if (info != null) {
          const dataInfo = {
            id: activityID,
            active: info.active_status,
            title: info.activity_title,
            city: info.activity_city,
            photo: info.activity_photo,
            description: info.activity_description,
            popular: info.tg_favorite,
          };

          setNewChangeActivity(dataInfo);
        }
        setChangedOneActivity(false);
        setActivityID(null);
        setUpdateActivityGallery(true);
        console.log(
          "CreateActivityContext newChangeActivity in useEffect dataInfo "
        );
      };
      getChangedActivity();
    }
  }, [changedOneActivity]);

  useEffect(() => {
    let newArray = allActiveActvivitiesFB;
    let arrayWithFoundObjects = [];

    if (searchingWord != "") {
      for (let i = 0; i < newArray.length; i++) {
        var searchAtFCity = newArray[i].city.search(searchingWord);
        var searchAtTitle = newArray[i].title.search(searchingWord);

        if (searchAtFCity != -1 || searchAtTitle != -1) {
          var cheackIfObjectOlreadyExistInArray = searchArray.findIndex(
            (x) => x.id === newArray[i].id
          );
          if (cheackIfObjectOlreadyExistInArray === -1) {
            arrayWithFoundObjects.push(newArray[i]);
            setSearchArray(arrayWithFoundObjects);
          }
        }
      }
    } else {
      setSearchArray([]);
    }
  }, [searchingWord]);

  return (
    <CreateActivityContext.Provider
      value={{
        chooseInDropDown: setAnswerFromDropDownInCreateActivity,
        sendChoiceFromDropDown: answerFromDropDownInCreateActivity,
        sendFechToFBToGetActiveActivities: setShowAllActiveActivities,
        activeActivities: allActiveActvivitiesFB,
        setNewActivity: setCreateNewActivityInFB,

        changedActivity: newChangeActivity,
        activityHasChanged: setChangedOneActivity,

        activityHasChangedID: setActivityID,
        updateGallery: updateActivityGallery,
        setUpdateGallery: setUpdateActivityGallery,

        word: setSearchingWord,
        showSearchObject: searchArray,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  );
};
