import React, { useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const ActivitynContext = React.createContext();

export const useActivityFunction = () => {
  return useContext(ActivitynContext);
};

export const ActivityProvider = ({ children }) => {
  const [activitiesInformation, setActivitiesInformation] = useState([]);
  const [lastFiveTimeEntries, setLastFiveTimeEntries] = useState([]);
  const [myActivitiesIDandAccumTime, setMyActivitiesIDandAccumTime] = useState(
    []
  );
  const [isFinished, setIsFinished] = useState(false);

  const [timeEntryArrayForMyTimePage, setTimeEntryArrayForMyTimePage] =
    useState([]);

  useEffect(() => {
    const getActivitiesID = async () => {
      let temArray = [];
      const user = await firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .get();
      let data = user.data().activities_and_accumulated_time;
      if (data != null) {
        if (data.length > myActivitiesIDandAccumTime)
          for (let i = 0; i < data.length; i++) {
            let idAndTime = {
              accumulatedTime: data[i].accumulated_time,
              activityID: data[i].activity_id,
            };
            temArray.push(idAndTime);
          }
        setMyActivitiesIDandAccumTime(temArray);
        setIsFinished(true);
      }
    };
    getActivitiesID();
  }, []);

  useEffect(() => {
    let timeArray = [];
    let onlyFive = [];

    if (isFinished === true) {
      const allActivityTimeEntryAndStatus = async () => {
        const timeAndStatus = await firestore()
          .collection("Users")
          .doc(auth().currentUser.uid)
          .collection("time_entries")
          .orderBy("date", "desc")
          .get();
        let data = timeAndStatus.docs.map((doc) => doc.data());
        let docId = timeAndStatus.docs.map((doc) => doc.id);

        if (data != null && data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            let entryTime = {
              activityId: data[i].activity_id,
              date: data[i].date,
              time: data[i].time,
              statusConfirmed: data[i].status_confirmed,
              fbDocumentID: docId[i],
            };

            timeArray.push(entryTime);
          }
          let empuntOfItems = 0;
          if (timeArray.length > 0 && timeArray.length < 5) {
            empuntOfItems = timeArray.length;
          } else {
            empuntOfItems = 5;
          }

          for (let j = 0; j < empuntOfItems; j++) {
            onlyFive.push(timeArray[j]);
          }
        }
        setLastFiveTimeEntries(onlyFive);
        setTimeEntryArrayForMyTimePage(timeArray);
      };

      allActivityTimeEntryAndStatus();
    }
  }, [isFinished]);

  useEffect(() => {
    if (
      isFinished === true &&
      myActivitiesIDandAccumTime.length > activitiesInformation.length
    ) {
      let inactiveArray = [];
      const getActivitiesInformation = async () => {
        for (let i = 0; i < myActivitiesIDandAccumTime.length; i++) {
          var id = myActivitiesIDandAccumTime[i];
          const information = await firestore()
            .collection("Activities")
            .doc(id.activityID)
            .get();
          let info = information.data();
          if (info != null) {
            const dataInfo = {
              id: id.activityID,
              title: info.activity_title,
              city: info.activity_city,
              photo: info.activity_photo,
            };
            inactiveArray.push(dataInfo);
          }
        }
        setActivitiesInformation(inactiveArray);
      };
      getActivitiesInformation();
    }
  }, [isFinished]);

  return (
    <ActivitynContext.Provider
      value={{
        timeAndStatus: lastFiveTimeEntries,
        myActivities: activitiesInformation,
        activitiesIDandAccumTime: myActivitiesIDandAccumTime,
        allListOfTimeEntry: timeEntryArrayForMyTimePage,
      }}
    >
      {children}
    </ActivitynContext.Provider>
  );
};
