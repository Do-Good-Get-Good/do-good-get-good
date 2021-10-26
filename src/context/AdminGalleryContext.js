import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
const AdminGalleryContext = React.createContext();

export const useAdminGalleryFunction = () => {
  return useContext(AdminGalleryContext);
};

export const AdminGalleryProvider = ({ children }) => {
  const [chooseInactive, setchooseInactive] = useState(false);
  const [activitiesGallery, setActivitiesGallery] = useState([]);
  const [inactiveActivitiesGallery, setInactiveActivitiesGallery] = useState(
    []
  );
  const [searchArray, setSearchArray] = useState([]);
  const [searchingWord, setSearchingWord] = useState("");

  useEffect(() => {
    let inactiveArray = [];
    // if (chooseInactive === true) {
    const setInactive = async () => {
      const allActiveActivities = await firestore()
        .collection("Activities")
        .where("active_status", "==", false)
        .get();

      let activities = allActiveActivities.docs.map((doc) => doc.data());

      if (activities != null && activities.length > activitiesGallery.length) {
        for (let i = 0; i < activities.length; i++) {
          const dataInfo = {
            id: activities[i].activityID,
            title: activities[i].activity_title,
            city: activities[i].activity_city,
            description: activities[i].activity_description,
            popular: activities[i].activity_tg_favorite,
            photo: activities[i].activity_photo,
          };
          inactiveArray.push(dataInfo);

          setInactiveActivitiesGallery(inactiveArray);
        }
        console.log("ActivityGaleryContext inactive activity in useEffect");
      }
    };
    setInactive();
    // }
  }, []);

  // useEffect(() => {
  //   let array = [];
  //   const serchForRightObject = () => {
  //     if (searchingWord != "") {
  //       const searchingThrough = activitiesGallery.filter(
  //         (object) =>
  //           object.title === searchingWord || object.city === searchingWord
  //       );
  //       array.push(searchingThrough);
  //       setSearchArray(array);
  //     }
  //   };
  //   serchForRightObject();
  // }, [searchingWord]);

  return (
    <AdminGalleryContext.Provider
      value={{
        // gallery: activitiesGallery,
        showSearchObject: searchArray,
        chooseActiveOrNot: setchooseInactive,
        word: setSearchingWord,
        inactiveActivities: inactiveActivitiesGallery,
        activeOrInactiveActivity: chooseInactive,
      }}
    >
      {children}
    </AdminGalleryContext.Provider>
  );
};
