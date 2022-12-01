import React, { useContext, useState, useEffect } from "react";
import { getAllInactiveActivities } from "../customFirebaseHooks/getFunctions";
const AdminGalleryContext = React.createContext();

export const useAdminGalleryFunction = () => {
  return useContext(AdminGalleryContext);
};

export const AdminGalleryProvider = ({ children }) => {
  const [chooseInactive, setchooseInactive] = useState(true);
  const [inactiveActivitiesGallery, setInactiveActivitiesGallery] = useState(
    []
  );
  const [searchWordHasNoMatch, setSearchWordHasNoMatch] = useState(false);
  const [cleanUpSearchBarComponent, setCleanUpSearchBarComponent] =
    useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [searchingWord, setSearchingWord] = useState("");

  useEffect(() => {
    const setInactive = async () => {
      try {
        let inactiveActivities = await getAllInactiveActivities();
        setInactiveActivitiesGallery(inactiveActivities);
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
        setInactiveActivitiesGallery: setInactiveActivitiesGallery,
      }}
    >
      {children}
    </AdminGalleryContext.Provider>
  );
};
