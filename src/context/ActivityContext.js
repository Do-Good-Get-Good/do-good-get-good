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
  const [isFinishedToLoadActivitiesID, setIsFinishedToLoadActivitiesID] =
    useState(false);
  const [isFinishedToLoadMyEntries, setIsFinishedToLoadMyEntries] =
    useState(false);
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
            for (let i = 0; i < data.length; i++) {
              var userConnectedActivitiesIndex = doc
                .data()
                .connected_activities.findIndex(
                  (x) => x === data[i].activity_id
                );

              if (userConnectedActivitiesIndex != -1) {
                let idAndTime = {
                  accumulatedTime: data[i].accumulated_time,
                  activityID: data[i].activity_id,
                  adminID: doc.data().admin_id,
                  connectedActivities: doc.data().connected_activities,
                  paidTime: doc.data().total_confirmed_hours,
                  timeForYear: doc.data().total_hours_year,
                  currentForMonth: doc.data().total_hours_month,
                };
                temArray.push(idAndTime);
              }
            }
            setMyActivitiesIDandAccumTime(temArray);
            setIsFinishedToLoadActivitiesID(true);

            if (doc.data().connected_activities.length != 0) {
              setIsFinishedToLoadMyEntries(true);
            } else {
              setActivitiesInformation([]);
            }
          }

          temArray = [];
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
    if (isFinishedToLoadActivitiesID === true) {
      let allActivityTimeEntryAndStatus = firestore()
        .collection("timeentries")
        .where("user_id", "==", auth().currentUser.uid)
        .orderBy("date", "desc")
        .limit(limitAmountForTimeEntries)
        .onSnapshot(
          (snap) => {
            console.log("With limit");
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
    // }, [isFinishedToLoadActivitiesID, limitAmountForTimeEntries]);
  }, [isFinishedToLoadActivitiesID]);

  ////////
  useEffect(() => {
    if (limitAmountForTimeEntries === 20) {
      let allActivityTimeEntryAndStatus = firestore()
        .collection("timeentries")
        .where("user_id", "==", auth().currentUser.uid)
        .orderBy("date", "desc")
        .onSnapshot(
          (snap) => {
            let docs = [];
            snap.forEach((doc) => docs.push({ ...doc.data(), doc_id: doc.id }));
            console.log("No limit", docs.length);

            setTimeEntryArrayForMyTimePage(docs);
          },
          (error) => {
            console.log(error);
          }
        );

      return () => {
        allActivityTimeEntryAndStatus();
      };
    }
  }, [limitAmountForTimeEntries]);
  //////

  useEffect(() => {
    if (isFinishedToLoadMyEntries === true) {
      let inactiveArray = [];
      const getActivitiesInformation = async () => {
        for (let i = 0; i < myActivitiesIDandAccumTime.length; i++) {
          var id = myActivitiesIDandAccumTime[i];
          try {
            await firestore()
              .collection("Activities")
              .doc(id.activityID)
              .get()
              .then((doc) => {
                let info = doc.data();
                let dataInfo = {};
                if (info != null) {
                  dataInfo = {
                    id: id.activityID,
                    title: info.activity_title,
                    city: info.activity_city,
                    photo: info.activity_photo,
                  };
                  inactiveArray.push(dataInfo);
                }
              })
              .catch((error) => {
                console.log("errorMessage ", error);
              });
          } catch (error) {
            console.log("ActivitynContex errorMessage ", error);
          }
        }

        setActivitiesInformation(inactiveArray);

        setIsFinishedToLoadMyEntries(false);
      };

      getActivitiesInformation();
    }
  }, [isFinishedToLoadMyEntries]);

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
