import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { deleteActivityConnectionFromUser } from "../firebase-functions/deleteTS/delete";
import { ActivityInfo, TimeObject } from "../screens/HomePage/type";
import { FirebaseUser } from "../utility/firebaseTypes";
import { getActivityInformation } from "../firebase-functions/getTS/get";

const useLinkedActivities = () => {
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
        (snapshot) => {
          setLoading(true);

          let tempArr: TimeObject[] = [];
          const activityIdAndTime: FirebaseUser["activities_and_accumulated_time"] =
            snapshot?.data()?.activities_and_accumulated_time;
          const userConnectedActivitiesIndex: FirebaseUser["connected_activities"] =
            snapshot?.data()?.connected_activities;

          if (activityIdAndTime) {
            activityIdAndTime.map(async (data) => {
              const isActivityConnected =
                userConnectedActivitiesIndex.findIndex(
                  (x) => x === data.activity_id,
                );

              if (isActivityConnected !== -1) {
                let idAndTime = {
                  accumulatedTime: data.accumulated_time,
                  activityID: data.activity_id,
                  adminID: snapshot?.data()?.admin_id,
                  connectedActivities: snapshot?.data()?.connected_activities,
                  paidTime: snapshot?.data()?.total_confirmed_hours,
                  timeForYear: snapshot?.data()?.total_hours_year,
                  currentForMonth: snapshot?.data()?.total_hours_month,
                };
                tempArr.push(idAndTime);
              }
            });
            setActivityIdAndAccumTime(tempArr);
          }
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
      makeActivityInfoObjectArr();
    }
  }, [activityIdAndAccumTime]);

  const makeActivityInfoObjectArr = async () => {
    let activityArr: ActivityInfo[] = [];

    for (let i = 0; i < activityIdAndAccumTime.length; i++) {
      let data = await getActivitiesInfo(activityIdAndAccumTime[i]);
      data && activityArr.push(data);
    }
    setActivityInfo(activityArr);
    setLoading(false);
  };

  const getActivitiesInfo = async (activityIdAndAccumTime: TimeObject) => {
    const activityId = activityIdAndAccumTime.activityID;
    try {
      let activity = await getActivityInformation(activityId);

      if (activity) {
        return {
          ...activity,
          time: activityIdAndAccumTime.accumulatedTime,
          adminId: activityIdAndAccumTime.adminID,
        };
      } else {
        userID && (await deleteActivityConnectionFromUser(activityId, userID));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    timeObject: activityIdAndAccumTime,
    activities: activityInfo,
    isLoading: loading,
  };
};

export default useLinkedActivities;
