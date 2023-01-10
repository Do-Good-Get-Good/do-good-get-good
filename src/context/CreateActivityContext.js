import React, { useContext, useState, useEffect } from "react";
import functions from "@react-native-firebase/functions";
import { getAllActivitiesWithStatus } from "../customFirebaseHooks/getFunctions";
import { addActivity } from "../customFirebaseHooks/addFunctions";
import { Alert } from "react-native";

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

  const [newUserInfo, setNewUserInfo] = useState(null);
  const [onlyActivityCreated, setOnlyActivityCreated] = useState(null);

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

  const createActivityAndLinkNewUser = async (newActivityAndUser) => {
    let newActivity = {
      active_status: newActivityAndUser.active_status,
      activity_city: newActivityAndUser.activity_city,
      activity_description: newActivityAndUser.activity_description,
      activity_photo: newActivityAndUser.activity_photo,
      activity_place: newActivityAndUser.activity_place,
      activity_title: newActivityAndUser.activity_title,
      tg_favorite: newActivityAndUser.tg_favorite,
    };

    try {
      let createdActivityId = await addActivity(newActivity);
      setAllActiveActvivitiesFB((prev) => [
        ...prev,
        { id: createdActivityId, ...newActivity },
      ]);

      if (
        newActivityAndUser.newUserInfo != null ||
        newActivityAndUser.newUserInfo != undefined
      ) {
        try {
          var createUser = functions().httpsCallable("createUser");
          let result = await createUser({
            firstName: newActivityAndUser.newUserInfo.firstName,
            lastName: newActivityAndUser.newUserInfo.lastName,
            email: newActivityAndUser.newUserInfo.email,
            password: newActivityAndUser.newUserInfo.password,
            role: newActivityAndUser.newUserInfo.role,
            activityId: createdActivityId,
          });

          let newUser = result.data.createdUser;
          setNewUserInfo(newUser);
        } catch (error) {
          Alert.alert(
            "Ett fel uppstod! Det gick inte att skapa användaren",
            error.message
          );
        }
      } else {
        setOnlyActivityCreated(true);
      }
    } catch (error) {
      Alert.alert(
        "Ett fel uppstod! Det gick inte att skapa aktiviteten",
        error.message
      );
    }
  };

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

        createNewActivityAndUser: createActivityAndLinkNewUser,

        changedActivity: newChangeActivity,
        activityHasChanged: setChangedOneActivity,

        activityHasChangedID: setActivityID,
        updateGallery: updateActivityGallery,
        setUpdateGallery: setUpdateActivityGallery,

        searchWordHasNoMatch: searchWordHasNoMatch,
        setSearchWordHasNoMatch: setSearchWordHasNoMatch,
        word: setSearchingWord,
        showSearchObject: searchArray,

        newUserInfo: newUserInfo,
        setNewUserInfo: setNewUserInfo,

        onlyActivityCreated: onlyActivityCreated,
        setOnlyActivityCreated: setOnlyActivityCreated,
      }}
    >
      {children}
    </CreateActivityContext.Provider>
  );
};
