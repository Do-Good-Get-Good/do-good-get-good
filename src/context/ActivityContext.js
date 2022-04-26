import React, { useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { format } from "date-fns";

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

  ///////
  const [scrollToGetMoreTimeEntries, setScrollToGetMoreTimeEntries] =
    useState(false);

  const [start, setStart] = useState({});
  const [startPointAfterScroll, setStartPointAfterScroll] = useState(undefined);

  const [timeEntriesAfterScrolling, setTimeEntriesAfterScrolling] = useState(
    []
  );

  ///////////

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

            if (startPointAfterScroll === undefined) {
              setIsFinishedToLoadActivitiesID(true);
            }

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

  //=========================================================================
  //===================================================================================

  //////////////////////////////////////
  /////////////////////////////////////
  const today = new Date();
  let startPoint = todayDatefunction(
    today.getUTCFullYear(),
    today.getMonth() + 2,
    1
  );
  let endPoint = todayDatefunction(
    today.getUTCFullYear(),
    today.getMonth() - 1,
    today.getUTCDate()
  );

  function todayDatefunction(currentYear, currentMonth, currentDay) {
    let year = currentYear;
    let month = currentMonth;
    let day = currentDay;
    if (currentMonth < 10) {
      month = "0" + month;
    }

    if (currentDay < 10) {
      day = "0" + day;
    }

    let yearMonthDay = new Date(
      year + "-" + month + "-" + day + "T00:00:00.000Z"
    );

    return yearMonthDay;
  }

  useEffect(() => {
    if (isFinishedToLoadActivitiesID === true) {
      let allActivityTimeEntryAndStatus = firestore()
        .collection("timeentries")
        .where("user_id", "==", auth().currentUser.uid)
        .orderBy("date", "desc")
        .startAfter(startPoint)
        .endAt(endPoint)
        .onSnapshot(
          (snap) => {
            let docs = [];
            snap.forEach((doc) => docs.push({ ...doc.data(), doc_id: doc.id }));
            let firstFive = [];

            if (docs.length >= 5) {
              for (let i = 0; i < 5; i++) {
                firstFive.push(docs[i]);
              }
            } else {
              for (let i = 0; i < docs.length; i++) {
                firstFive.push(docs[i]);
              }
            }

            setLastFiveTimeEntries(firstFive);
            setTimeEntryArrayForMyTimePage(docs);
            // if (Object.keys(start).length != 0) {
            // setStart(snap.docs[snap.docs.length - 1]);
            // }
          },
          (error) => {
            console.log(error);
          }
        );

      return () => {
        allActivityTimeEntryAndStatus();
      };
    }
  }, [isFinishedToLoadActivitiesID]);
  console.log("start  ", start);

  useEffect(() => {
    if (scrollToGetMoreTimeEntries) {
      const getMoreTimeEntries = async () => {
        let startPoint = undefined;

        if (startPointAfterScroll != undefined) {
          startPoint = startPointAfterScroll;
        } else if (startPointAfterScroll === undefined) {
          startPoint = endPoint;
        }

        let timeEntriesArray = [];

        if (startPoint != undefined) {
          try {
            await firestore()
              .collection("timeentries")
              .where("user_id", "==", auth().currentUser.uid)
              .orderBy("date", "desc")
              .startAfter(startPoint)
              .limit(2)
              .get()
              .then((response) => {
                response.forEach((doc) =>
                  timeEntriesArray.push({ ...doc.data(), doc_id: doc.id })
                );
                let tempArray = timeEntriesAfterScrolling;

                for (let i = 0; i < timeEntriesArray.length; i++) {
                  tempArray.push(timeEntriesArray[i]);
                }
                setTimeEntriesAfterScrolling(tempArray);

                setStartPointAfterScroll(
                  response.docs[response.docs.length - 1]
                );
              })
              .catch((error) => {
                console.log("errorMessage ", error);
              });
          } catch (error) {
            console.log("AdminContex errorMessage ", error);
          }
        }
      };
      getMoreTimeEntries();
    }
  }, [scrollToGetMoreTimeEntries]);

  ////////////////////////////////////////////
  ////////////////////////////////////////////

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
        scrollToGetMoreTimeEntries: scrollToGetMoreTimeEntries,
        setScrollToGetMoreTimeEntries: setScrollToGetMoreTimeEntries,
        timeEntriesAfterScrolling: timeEntriesAfterScrolling,
      }}
    >
      {children}
    </ActivitynContext.Provider>
  );
};
