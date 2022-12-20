import React, { useContext, useState, useEffect } from "react";
import { getAllActivitiesWithStatus } from "../customFirebaseHooks/getFunctions";

const CreateActivityContext = React.createContext();

export const useCreateActivityFunction = () => {
  return useContext(CreateActivityContext);
};

export const CreateActivityProvider = ({ children }) => {
  const [
    answerFromDropDownInCreateActivity,
    setAnswerFromDropDownInCreateActivity,
  ] = useState("");

  const [allActiveActvivitiesFB, setAllActiveActvivitiesFB] = useState([]);
  const [updateActivityGallery, setUpdateActivityGallery] = useState(false);
  const [searchWordHasNoMatch, setSearchWordHasNoMatch] = useState(false);

  const [searchArray, setSearchArray] = useState([]);
  const [searchingWord, setSearchingWord] = useState("");

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

  const [activityID, setActivityID] = useState({
    id: "",
    active: null,
    title: "",
    city: "",
    photo: "",
    description: "",
    popular: "",
  });

  useEffect(() => {
    const getActiveActivities = async () => {
      try {
        let activities = await getAllActivitiesWithStatus(true);
        setAllActiveActvivitiesFB(activities);
      } catch (error) {
        console.log("CreateActivityContext errorMessage ", error);
      }
    };
    getActiveActivities();
  }, []);

  useEffect(() => {
    if (changedOneActivity === true) {
      const dataInfo = {
        id: activityID.activityInfo.id,
        active: activityID.statusActive,
        city: activityID.activityInfo.city,
        description: activityID.activityInfo.description,
        place: activityID.activityInfo.place,
        photo: activityID.activityInfo.photo,
        title: activityID.activityInfo.title,
        popular: activityID.popular,
      };
      setNewChangeActivity(dataInfo);
      setChangedOneActivity(false);
      setUpdateActivityGallery(true);
    }
  }, [changedOneActivity]);

  useEffect(() => {
    let newArray = allActiveActvivitiesFB;
    let arrayWithFoundObjects = [];
    if (searchingWord != "") {
      for (let i = 0; i < newArray.length; i++) {
        if (
          newArray[i].title
            .toLowerCase()
            .includes(searchingWord.toLowerCase()) ||
          newArray[i].city.toLowerCase().includes(searchingWord.toLowerCase())
        ) {
          var searchAtTitle = newArray[i].title;
          var searchAtFCity = newArray[i].city;

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
      }
      if (arrayWithFoundObjects.length === 0) {
        setSearchWordHasNoMatch(true);
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
        activeActivities: allActiveActvivitiesFB,
        setAllActiveActvivitiesFB: setAllActiveActvivitiesFB,

        changedActivity: newChangeActivity,
        activityHasChanged: setChangedOneActivity,

        activityHasChangedID: setActivityID,
        updateGallery: updateActivityGallery,
        setUpdateGallery: setUpdateActivityGallery,

        searchWordHasNoMatch: searchWordHasNoMatch,
        setSearchWordHasNoMatch: setSearchWordHasNoMatch,
        word: setSearchingWord,
        showSearchObject: searchArray,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  );
};
