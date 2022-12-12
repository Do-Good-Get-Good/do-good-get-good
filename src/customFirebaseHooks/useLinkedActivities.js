import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { getActivityInformation } from "./getFunctions";

const useLinkedActivities = () => {
  const [activityInfo, setActivityInfo] = useState([]);
  const [activityIdAndAccumTime, setActivityIdAndAccumTime] = useState([]);

  useEffect(() => {
    return firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .onSnapshot(
        (snapshot) => {
          let tempArr = [];
          let activityIdAndTime =
            snapshot.data().activities_and_accumulated_time;

          if (activityIdAndTime !== null || activityIdAndTime !== undefined) {
            activityIdAndTime.map((data) => {
              var userConnectedActivitiesIndex = snapshot
                .data()
                .connected_activities.findIndex((x) => x === data.activity_id);

              if (userConnectedActivitiesIndex !== -1) {
                let idAndTime = {
                  accumulatedTime: data.accumulated_time,
                  activityID: data.activity_id,
                  adminID: snapshot.data().admin_id,
                  connectedActivities: snapshot.data().connected_activities,
                  paidTime: snapshot.data().total_confirmed_hours,
                  timeForYear: snapshot.data().total_hours_year,
                  currentForMonth: snapshot.data().total_hours_month,
                };
                tempArr.push(idAndTime);
              }
            });
            setActivityIdAndAccumTime(tempArr);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    if (
      activityIdAndAccumTime !== undefined &&
      activityIdAndAccumTime.length !== 0
    ) {
      const getActivitiesInformation = async () => {
        let activityArr = [];
        for (let i = 0; i < activityIdAndAccumTime.length; i++) {
          let data = activityIdAndAccumTime[i];
          let activityId = data.activityID;
          try {
            let activity = await getActivityInformation(activityId);
            activity["time"] = data.accumulatedTime;
            activity["adminId"] = data.adminID;
            activityArr.push(activity);
          } catch (error) {
            console.log(error);
          }
        }
        setActivityInfo(activityArr);
      };

      getActivitiesInformation();
    }
  }, [activityIdAndAccumTime]);

  return {
    timeObject: activityIdAndAccumTime,
    activities: activityInfo,
  };
};

export default useLinkedActivities;
