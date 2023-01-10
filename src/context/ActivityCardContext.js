import React, { useContext, useState, useEffect } from "react";
import {
  updateActivityActiveStatus,
  updateActivityFavoriteStatus,
  updateActivityInfo,
} from "../customFirebaseHooks/updateFunctions";
import { deleteActivity } from "../customFirebaseHooks/deleteFunctions";

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
    if (activityID !== "" && changeStatusPopular !== null) {
      updateActivityFavoriteStatus(activityID, changeStatusPopular);
      setChangeStatusPopular(null);
      setStatusPopularHasBeenChanged(true);
    }
  }, [changeStatusPopular, activityID]);

  useEffect(() => {
    if (activityID !== "" && changeStatusActive !== null) {
      if (changeStatusActive) {
        updateActivityActiveStatus(activityID, true);
      } else {
        updateActivityActiveStatus(activityID, false);
      }
      setChangeStatusActive(null);
      setStatusActiveHasBeenChanged(true);
    }
  }, [changeStatusActive, activityID]);

  useEffect(() => {
    if (confirmToDelete && activityID !== "") {
      deleteActivity(activityID)
        .then(() => {
          console.log("Activity deleted");
        })
        .catch((error) => console.log(error));
    }
  }, [confirmToDelete]);

  useEffect(() => {
    if (activityWithChangedInfor.id !== "" && changeActivityToTrue) {
      updateActivityInfo(activityWithChangedInfor);
      setChangeActivityToTrue(false);
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
