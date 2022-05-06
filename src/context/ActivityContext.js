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

  const [isFinishedToLoadActivitiesID, setIsFinishedToLoadActivitiesID] =
    useState(false);
  const [isFinishedToLoadMyEntries, setIsFinishedToLoadMyEntries] =
    useState(false);
  const [timeEntryArrayForMyTimePage, setTimeEntryArrayForMyTimePage] =
    useState([]);

  const [scrollToGetMoreTimeEntries, setScrollToGetMoreTimeEntries] =
    useState(false);

  const [startPointAfterScroll, setStartPointAfterScroll] = useState(undefined);

  const [timeEntriesAfterScrolling, setTimeEntriesAfterScrolling] = useState(
    []
  );
  const [noMoreData, setNoMoreData] = useState(false);
  const [addMoreTimeEntriesAfterScroll, setAddMoreTimeEntriesAfterScroll] =
    useState(false);
  const [
    userHasLassThanFiveTimeEntriesForLastTwoMonthes,
    setUserHasLassThanFiveTimeEntriesForLastTwoMonthes,
  ] = useState([]);

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

  let startPoint = todayDatefunction(true);
  let endPoint = todayDatefunction(false);

  function todayDatefunction(getStartPoint) {
    const today = new Date();
    let year = undefined;
    let month = undefined;
    let day = undefined;
    let yearMonthDay = undefined;

    if (getStartPoint) {
      let getStartOfTheNextMonth = new Date(
        today.setMonth(today.getMonth() + 1)
      );
      year = getStartOfTheNextMonth.getUTCFullYear();
      month = getStartOfTheNextMonth.getMonth() + 1;
      day = 1;
    } else {
      let subtracTwoMonths = new Date(today.setMonth(today.getMonth() - 2));
      year = subtracTwoMonths.getUTCFullYear();
      month = subtracTwoMonths.getMonth() + 1;
      day = today.getUTCDate();
    }

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    yearMonthDay = new Date(year + "-" + month + "-" + day + "T00:00:00.000Z");
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
              functionUserHasLassThanFiveTimeEntriesForLastTwoMonthes(
                [],
                firstFive
              );
            } else {
              for (let i = 0; i < docs.length; i++) {
                firstFive.push(docs[i]);
              }
              if (timeEntriesAfterScrolling.length != 0) {
                functionUserHasLassThanFiveTimeEntriesForLastTwoMonthes(
                  timeEntriesAfterScrolling,
                  firstFive
                );
              }
            }

            setLastFiveTimeEntries(firstFive);
            if (firstFive.length < 5) {
              setScrollToGetMoreTimeEntries(true);
            }
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
  }, [isFinishedToLoadActivitiesID]);

  useEffect(() => {
    if (scrollToGetMoreTimeEntries) {
      const getMoreTimeEntries = async () => {
        let startPoint = undefined;

        if (startPointAfterScroll != undefined) {
          startPoint = startPointAfterScroll;
        } else if (
          startPointAfterScroll === undefined &&
          timeEntriesAfterScrolling.length === 0
        ) {
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
              .limit(20)
              .get()
              .then((response) => {
                response.forEach((doc) =>
                  timeEntriesArray.push({ ...doc.data(), doc_id: doc.id })
                );
                if (timeEntriesArray.length === 0) {
                  setNoMoreData(true);
                }

                let tempArray = timeEntriesAfterScrolling;

                for (let i = 0; i < timeEntriesArray.length; i++) {
                  tempArray.push(timeEntriesArray[i]);
                }

                startPoint = response.docs[response.docs.length - 1];
                setStartPointAfterScroll(startPoint);
                if (lastFiveTimeEntries.length < 5 && tempArray.length != 0) {
                  functionUserHasLassThanFiveTimeEntriesForLastTwoMonthes(
                    tempArray,
                    lastFiveTimeEntries
                  );
                }
                setTimeEntriesAfterScrolling(tempArray);
                setAddMoreTimeEntriesAfterScroll(true);
                setScrollToGetMoreTimeEntries(false);
              })
              .catch((error) => {
                console.log("errorMessage ", error);
              });
          } catch (error) {
            console.log("AdminContex errorMessage ", error);
          }
        } else if (
          startPoint === undefined &&
          timeEntriesAfterScrolling.length != 0
        ) {
          setAddMoreTimeEntriesAfterScroll(true);
          setScrollToGetMoreTimeEntries(false);
        }
      };

      getMoreTimeEntries();
    }
  }, [scrollToGetMoreTimeEntries]);

  function functionUserHasLassThanFiveTimeEntriesForLastTwoMonthes(
    arrayWithOldTimeEntries,
    lastFive
  ) {
    let tempArray = [];
    let amountOfTimeEntriesForLastTwoMonthes =
      lastFive.length + arrayWithOldTimeEntries.length;
    if (amountOfTimeEntriesForLastTwoMonthes >= 5) {
      amountOfTimeEntriesForLastTwoMonthes = 5 - lastFive.length;
    } else if (amountOfTimeEntriesForLastTwoMonthes <= 5) {
      amountOfTimeEntriesForLastTwoMonthes = arrayWithOldTimeEntries.length;
    }
    for (let j = 0; j < amountOfTimeEntriesForLastTwoMonthes; j++) {
      tempArray.push(arrayWithOldTimeEntries[j]);
    }
    setUserHasLassThanFiveTimeEntriesForLastTwoMonthes(tempArray);
  }

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
        myActivities: activitiesInformation,
        activitiesIDandAccumTime: myActivitiesIDandAccumTime,
        allListOfTimeEntry: timeEntryArrayForMyTimePage,
        scrollToGetMoreTimeEntries: scrollToGetMoreTimeEntries,
        setScrollToGetMoreTimeEntries: setScrollToGetMoreTimeEntries,
        timeEntriesAfterScrolling: timeEntriesAfterScrolling,
        addMoreTimeEntriesAfterScroll: addMoreTimeEntriesAfterScroll,
        setAddMoreTimeEntriesAfterScroll: setAddMoreTimeEntriesAfterScroll,
        userHasLassThanFiveTimeEntriesForLastTwoMonthes:
          userHasLassThanFiveTimeEntriesForLastTwoMonthes,
        noMoreData: noMoreData,
      }}
    >
      {children}
    </ActivitynContext.Provider>
  );
};
