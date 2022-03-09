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
  const [changeActivityToTrue, setChangeActivityToTrue] = useState(false);
  const [statusActiveHasBeenChanged, setStatusActiveHasBeenChanged] =
    useState(false);
  const [statusPopularHasBeenChanged, setStatusPopularHasBeenChanged] =
    useState(false);
  const [activityWithChangedInfor, setActivityWithChangedInfor] = useState({});

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
      if (changeStatusActive === false) {
        const updateStatusActive = async () => {
          firestore()
            .collection("Activities")
            .doc(activityID)
            .update({
              active_status: false,
              tg_favorite: false,
            })
            .then(() => {
              console.log("Actyvity active_status changed");
              setChangeStatusActive(null);
              setStatusActiveHasBeenChanged(true);
            });
        };
        updateStatusActive();
      } else if (changeStatusActive === true) {
        const updateStatusActive = async () => {
          firestore()
            .collection("Activities")
            .doc(activityID)
            .update({
              active_status: true,
            })
            .then(() => {
              console.log("Actyvity active_status changed");
              setChangeStatusActive(null);
              setStatusActiveHasBeenChanged(true);
            });
        };
        updateStatusActive();
      }
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
    if (activityWithChangedInfor != 0 && changeActivityToTrue != false) {
      const updateActivityCard = async () => {
        firestore()
          .collection("Activities")
          .doc(activityWithChangedInfor.id)
          .update({
            activity_title: activityWithChangedInfor.title,
            activity_city: activityWithChangedInfor.city,
            activity_place: activityWithChangedInfor.place,
            activity_description: activityWithChangedInfor.description,
            activity_photo: activityWithChangedInfor.photo,
          })
          .then(() => {
            console.log("Actyvity Info changed");
            setChangeActivityToTrue(false);
          });
      };
      updateActivityCard();
    }
  }, [changeActivityToTrue]);

  return (
    <ActivityCardContext.Provider
      value={{
        changePopular: setChangeStatusPopular,
        changeActive: setChangeStatusActive,
        idActivity: setActivityID,
        confirmToDeleteActivity: setConfirmToDelete,
        popular: statusPopularHasBeenChanged,
        active: statusActiveHasBeenChanged,
        changePopularStatusInAdminGallery: setStatusPopularHasBeenChanged,
        changeActiveStatusInAdminGallery: setStatusActiveHasBeenChanged,
        oneActivityHasBeenDeleted: confirmToDelete,
        idOfTheActivityWhichHasBeenDeleted: activityID,

        changeActivityCard: setChangeActivityToTrue,
        activityWithChangedInfor: setActivityWithChangedInfor,
      }}
    >
      {children}
    </ActivityCardContext.Provider>
  );
};
