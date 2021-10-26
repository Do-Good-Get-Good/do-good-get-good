import React, { useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const ActivitynContext = React.createContext();

export const useActivityFunction = () => {
  return useContext(ActivitynContext);
};

export const ActivityProvider = ({ children }) => {
  const [activitiesInformation, setActivitiesInformation] = useState([]);
  const [timeEntry, setTimeEntry] = useState([]);
  const [myActivitiesIDandAccumTime, setMyActivitiesIDandAccumTime] = useState(
    []
  );
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const getActivitiesID = async () => {
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
            setMyActivitiesIDandAccumTime((prev) => [...prev, idAndTime]);
            setIsFinished(true);
          }
      }
    };
    getActivitiesID();
  }, []);

  useEffect(() => {
    if (isFinished === true) {
      const fetchActivityTimeEntryAndStatus = async () => {
        const timeAndStatus = await firestore()
          .collection("Users")
          .doc(auth().currentUser.uid)
          .collection("time_entries")
          .orderBy("date", "desc")
          .get();
        let data = timeAndStatus.docs.map((doc) => doc.data());
        let docId = timeAndStatus.docs.map((doc) => doc.id);

        if (data != null) {
          for (let i = 0; i < data.length; i++) {
            // data[i]

            let entryTime = {
              activityId: data[i].activity_id,
              date: data[i].date,
              time: data[i].time,
              statusConfirmed: data[i].status_confirmed,
              fbDocumentID: docId[i],
            };
            setTimeEntry((prev) => [...prev, entryTime]);
          }

          // setTimeEntry(timeAndStatus.docs.map((doc) => doc.data()))
        }
      };
      // console.log('HELLO FRON INFO PLACE')
      fetchActivityTimeEntryAndStatus();
    }
  }, [myActivitiesIDandAccumTime]);

  useEffect(() => {
    if (
      isFinished === true &&
      myActivitiesIDandAccumTime.length > activitiesInformation.length
    ) {
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
            };
            setActivitiesInformation((prev) => [...prev, dataInfo]);
            setIsFinished(false);
          }
          // console.log('information.data()', information.data())

          // const preventReplay = activitiesInformation.filter(
          //   (object) => object.id === id.activityID
          // )
          // console.log('preventReplay.id', preventReplay)
          // if (preventReplay.id != id.activityID) {

          // }
          // setActivitiesInformation(dataInfo)r
          // if ( (activitiesInformation.length) < || != (myActivitiesIDandAccumTime.length) ) {}
        }

        // return activitiesInformation
      };
      getActivitiesInformation();
    }
  }, [myActivitiesIDandAccumTime]);
  // getActivitiesID()
  // getActivitiesInformation()
  // getActivitiesInformation()

  // console.log(
  //   'myActivitiesIDandAccumTime !!!!!!!!!!',
  //   myActivitiesIDandAccumTime
  //   // 'myActivitiesIDandAccumTime.length',
  //   // myActivitiesIDandAccumTime.length
  // )
  // console.log('INFORMATION', activitiesInformation)
  // console.log('INFORMATION.length', activitiesInformation.length)
  // console.log('TIME ENTRY USE EFFECT timeEntry', timeEntry)
  // console.log('TIME ENTRY USE EFFECT timeEntry timeEntry.length', timeEntry)

  return (
    <ActivitynContext.Provider
      value={{
        timeAndStatus: timeEntry,
        myActivities: activitiesInformation,
        activitiesIDandAccumTime: myActivitiesIDandAccumTime,
      }}
    >
      {children}
    </ActivitynContext.Provider>
  );
};
