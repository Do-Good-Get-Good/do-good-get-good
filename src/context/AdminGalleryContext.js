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

    const setInactive = async () => {
      const allActiveActivities = await firestore()
        .collection("Activities")
        .where("active_status", "==", false)
        .get();

      let activities = allActiveActivities.docs.map((doc) => doc.data());
      let docId = allActiveActivities.docs.map((doc) => doc.id);

      if (activities != null && activities.length > activitiesGallery.length) {
        for (let i = 0; i < activities.length; i++) {
          const dataInfo = {
            id: docId[i],
            title: activities[i].activity_title,
            active: activities[i].active_status,
            city: activities[i].activity_city,
            description: activities[i].activity_description,
            photo: activities[i].activity_photo,
            popular: activities[i].tg_favorite,
          };
          inactiveArray.push(dataInfo);

          setInactiveActivitiesGallery(inactiveArray);
        }
        console.log("ActivityGaleryContext inactive activity in useEffect");
      }
    };
    setInactive();
  }, []);

  return (
    <AdminGalleryContext.Provider
      value={{
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
