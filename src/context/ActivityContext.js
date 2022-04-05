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
  const [limitAmountForTimeEntries, setLimitAmountForTimeEntries] = useState(5);
  const [isFinished, setIsFinished] = useState(false);
  const [timeEntryArrayForMyTimePage, setTimeEntryArrayForMyTimePage] =
    useState([]);

  useEffect(() => {
    let temArray = [];
    const getActivitiesID = firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .onSnapshot(
        (doc) => {
          let data = doc.data().activities_and_accumulated_time;
          if (data != null) {
            if (data.length > myActivitiesIDandAccumTime)
              for (let i = 0; i < data.length; i++) {
                let idAndTime = {
                  accumulatedTime: data[i].accumulated_time,
                  activityID: data[i].activity_id,
                  adminID: doc.data().admin_id,
                };
                temArray.push(idAndTime);
              }

            setMyActivitiesIDandAccumTime(temArray);
            setIsFinished(true);
            temArray = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );

    return () => {
      getActivitiesID();
    };
  }, []);

  useEffect(() => {
    if (isFinished === true) {
      let allActivityTimeEntryAndStatus = firestore()
        .collection("timeentries")
        .where("user_id", "==", auth().currentUser.uid)
        .orderBy("date", "desc")
        .limit(limitAmountForTimeEntries)
        .onSnapshot(
          (snap) => {
            let docs = [];
            snap.forEach((doc) => docs.push({ ...doc.data(), doc_id: doc.id }));
            if (limitAmountForTimeEntries === 5) {
              setLastFiveTimeEntries(docs);
            } else {
              setTimeEntryArrayForMyTimePage(docs);
            }
          },
          (error) => {
            console.log(error);
          }
        );

      return () => {
        allActivityTimeEntryAndStatus();
      };
    }
  }, [isFinished, limitAmountForTimeEntries]);

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
        setIsFinished(false);
      };
      getActivitiesInformation();
    }
  }, [isFinished]);

  return (
    <ActivitynContext.Provider
      value={{
        lastFiveTimeEntries: lastFiveTimeEntries,
        setLimitAmountForTimeEntries: setLimitAmountForTimeEntries,
        myActivities: activitiesInformation,
        activitiesIDandAccumTime: myActivitiesIDandAccumTime,
        allListOfTimeEntry: timeEntryArrayForMyTimePage,
      }}
    >
      {children}
    </ActivitynContext.Provider>
  );
};
