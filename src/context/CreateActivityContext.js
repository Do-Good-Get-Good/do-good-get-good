import React, { useContext, useState, useEffect } from "react";
import functions from "@react-native-firebase/functions";
import { getAllActiveActivities } from "../customFirebaseHooks/getFunctions";
import { addActivities } from "../customFirebaseHooks/addFunctions";
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

  const [showAllActiveActivities, setShowAllActiveActivities] = useState(true);

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
    if (showAllActiveActivities === true) {
      let tempArray = [];
      const getActiveActivities = async () => {
        try {
          getAllActiveActivities().then((allActiveActivities) => {
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
                tempArray.push(dataInfo);
              }
            }
          });
        } catch (error) {
          console.log("CreateActivityContext errorMessage ", error);
        }
      };
      getActiveActivities();
      setAllActiveActvivitiesFB(tempArray);
    }
  }, []);

  const createActivityAndLinkNewUser = async (newActivityAndUser) => {
    let newFirebaseActivity = {
      active_status: newActivityAndUser.active_status,
      activity_city: newActivityAndUser.activity_city,
      activity_description: newActivityAndUser.activity_description,
      activity_photo: newActivityAndUser.activity_photo,
      activity_place: newActivityAndUser.activity_place,
      activity_title: newActivityAndUser.activity_title,
      tg_favorite: newActivityAndUser.tg_favorite,
    };
    addActivities(newFirebaseActivity)
      .then(async (newActivity) => {
        let newActivityToAddLocally = {
          id: newActivity.id,
          title: newActivityAndUser.activity_title,
          active: newActivityAndUser.active_status,
          city: newActivityAndUser.activity_city,
          place: newActivityAndUser.activity_place,
          description: newActivityAndUser.activity_description,
          photo: newActivityAndUser.activity_photo,
          popular: newActivityAndUser.tg_favorite,
        };
        setAllActiveActvivitiesFB((prev) => [...prev, newActivityToAddLocally]);
        if (
          newActivityAndUser.newUserInfo != null ||
          newActivityAndUser.newUserInfo != undefined
        ) {
          var createUser = functions().httpsCallable("createUser");
          await createUser({
            firstName: newActivityAndUser.newUserInfo.firstName,
            lastName: newActivityAndUser.newUserInfo.lastName,
            email: newActivityAndUser.newUserInfo.email,
            password: newActivityAndUser.newUserInfo.password,
            role: "user",
            activityId: newActivity.id,
          })
            .then((res) => {
              let newUser = res.data.createdUser;
              setNewUserInfo(newUser);
            })
            .catch((error) => console.log(error));
        } else {
          setOnlyActivityCreated(true);
        }
      })
      .catch((error) => Alert.alert("Ett fel uppstod.", error.message));
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
        sendFechToFBToGetActiveActivities: setShowAllActiveActivities,
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
