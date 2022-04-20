import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
const AdminGalleryContext = React.createContext();

export const useAdminGalleryFunction = () => {
  return useContext(AdminGalleryContext);
};

export const AdminGalleryProvider = ({ children }) => {
  const [chooseInactive, setchooseInactive] = useState(true);
  const [activitiesGallery, setActivitiesGallery] = useState([]);
  const [inactiveActivitiesGallery, setInactiveActivitiesGallery] = useState(
    []
  );
  const [searchWordHasNoMatch, setSearchWordHasNoMatch] = useState(false);
  const [cleanUpSearchBarComponent, setCleanUpSearchBarComponent] =
    useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [searchingWord, setSearchingWord] = useState("");

  useEffect(() => {
    let inactiveArray = [];

    const setInactive = async () => {
      try {
        await firestore()
          .collection("Activities")
          .where("active_status", "==", false)
          .get()
          .then((allActiveActivities) => {
            let activities = allActiveActivities.docs.map((doc) => doc.data());
            let docId = allActiveActivities.docs.map((doc) => doc.id);

            if (
              activities != null &&
              activities.length > activitiesGallery.length
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
                inactiveArray.push(dataInfo);

                setInactiveActivitiesGallery(inactiveArray);
              }
              console.log(
                "ActivityGaleryContext inactive activity in useEffect"
              );
            }
          })
          .catch((error) => {
            console.log("errorMessage ", error);
          });
      } catch (error) {
        console.log("AdminContex errorMessage ", error);
      }
    };
    setInactive();
  }, []);

  useEffect(() => {
    let newArray = inactiveActivitiesGallery;
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
    <AdminGalleryContext.Provider
      value={{
        showSearchObject: searchArray,
        chooseActiveOrNot: setchooseInactive,
        word: setSearchingWord,
        inactiveActivities: inactiveActivitiesGallery,
        activeOrInactiveActivity: chooseInactive,
        searchWordHasNoMatch: searchWordHasNoMatch,
        setSearchWordHasNoMatch: setSearchWordHasNoMatch,
        cleanUpSearchBarComponent: cleanUpSearchBarComponent,
        setCleanUpSearchBarComponent: setCleanUpSearchBarComponent,
      }}
    >
      {children}
    </AdminGalleryContext.Provider>
  );
};
