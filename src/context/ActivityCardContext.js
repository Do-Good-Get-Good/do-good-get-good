import React, { useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
const ActivityCardContext = React.createContext();

export const useActivityCardContext = () => {
  return useContext(ActivityCardContext);
};

export const ActivityCardProvider = ({ children }) => {
  const [changeStatusPopular, setChangeStatusPopular] = useState(null);
  const [changeStatusActive, setChangeStatusActive] = useState(null);
  const [activityID, setActivityID] = useState("");
  const [confirmToDelete, setConfirmToDelete] = useState(false);
  const [changeActivityInfo, setChangeActivityInfo] = useState(false);
  const [statusActiveHasBeenChanged, setStatusActiveHasBeenChanged] =
    useState(false);
  const [statusPopularHasBeenChanged, setStatusPopularHasBeenChanged] =
    useState(false);
  // const [activityInfo, setActivityInfo] = useState({
  //   city: "",
  //   description: "",
  //   photo: "",
  //   place: "",
  //   title: "",
  // });

  useEffect(() => {
    if (activityID != "" && changeStatusPopular != null) {
      const updateStatusPopular = async () => {
        firestore()
          .collection("Activities")
          .doc(activityID)
          .update({
            tg_favorite: changeStatusPopular,
          })

          .then(() => {
            console.log("Actyvity tg_favorite changed");
            setChangeStatusPopular(null);
            setStatusPopularHasBeenChanged(true);
          });
      };
      updateStatusPopular();
    }
  }, [changeStatusPopular, activityID]);

  useEffect(() => {
    if (activityID != "" && changeStatusActive != null) {
      const updateStatusActive = async () => {
        firestore()
          .collection("Activities")
          .doc(activityID)
          .update({
            active_status: changeStatusActive,
          })
          .then(() => {
            console.log("Actyvity active_status changed");
            setChangeStatusActive(null);
            setStatusActiveHasBeenChanged(true);
          });
      };
      updateStatusActive();
    }
  }, [changeStatusActive, activityID]);

  useEffect(() => {
    if (confirmToDelete === true && activityID != "") {
      const deleteActivityFromFB = async () => {
        firestore()
          .collection("Activities")
          .doc(activityID)
          .delete()
          .then(() => {
            console.log("Activity deleted!");
          });
      };
      deleteActivityFromFB();
    }
  }, [confirmToDelete]);

  useEffect(() => {
    // if (activityID != "") {
    //   const updateActivityCard = async () => {
    //     firestore()
    //       .collection("Activities")
    //       .doc(activityID)
    //       .update({
    //         activity_title: activityInfo.title,
    //         activity_city: activityInfo.city,
    //         activity_place: activityInfo.place,
    //         activity_description: activityInfo.description,
    //         activity_photo: activityInfo.photo,
    //       })
    //       .then(() => {
    //         console.log("Actyvity Info changed");
    //       });
    //   };
    //   updateActivityCard();
    // }
  }, [changeActivityInfo, activityID]);

  return (
    <ActivityCardContext.Provider
      value={{
        changePopular: setChangeStatusPopular,
        changeActive: setChangeStatusActive,
        idActivity: setActivityID,
        confirmToDeleteActivity: setConfirmToDelete,
        changeActivityCard: setChangeActivityInfo,
        // activityInformation: setActivityInfo,
        popular: statusPopularHasBeenChanged,
        active: statusActiveHasBeenChanged,
        changePopularStatusInAdminGallery: setStatusPopularHasBeenChanged,
        changeActiveStatusInAdminGallery: setStatusActiveHasBeenChanged,
        oneActivityHasBeenDeleted: confirmToDelete,
        idOfTheActivityWhichHasBeenDeleted: activityID,
      }}
    >
      {children}
    </ActivityCardContext.Provider>
  );
};
