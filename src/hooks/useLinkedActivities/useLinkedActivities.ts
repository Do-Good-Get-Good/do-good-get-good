import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ActivityInfo, TimeObject } from "../../screens/HomePage/type";
import {
  checkConnectedActivitiesAndPrepareAccumTimeArr,
  makeActivityInfoObjectArr,
} from "./linkedActivitiesFunctions";

export const useLinkedActivities = () => {
  const [activityInfo, setActivityInfo] = useState<ActivityInfo[]>([]);
  const [activityIdAndAccumTime, setActivityIdAndAccumTime] = useState<
    TimeObject[]
  >([]);
  const [loading, setLoading] = useState(true);
  const userID = auth()?.currentUser?.uid;

  useEffect(() => {
    return firestore()
      .collection("Users")
      .doc(userID)
      .onSnapshot(
        async (snapshot) => {
          setLoading(true);
          await checkConnectedActivitiesAndPrepareAccumTimeArr(
            snapshot,
            setActivityIdAndAccumTime,
          );
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  useEffect(() => {
    if (
      activityIdAndAccumTime !== undefined &&
      activityIdAndAccumTime.length !== 0
    ) {
      makeActivityInfoObjectArr(
        activityIdAndAccumTime,
        setActivityInfo,
        setLoading,
      );
    }
  }, [activityIdAndAccumTime]);

  return {
    timeObject: activityIdAndAccumTime,
    activities: activityInfo,
    isLoading: loading,
  };
};
