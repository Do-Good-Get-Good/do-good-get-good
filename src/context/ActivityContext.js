import React, { useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { el } from "date-fns/locale";

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
  const [startPointAfterScroll, setStartPointAfterScroll] = useState({});
  const [timeEntriesAfterScrolling, setTimeEntriesAfterScrolling] = useState(
    []
  );
  //1 look for today day
  //2 onSnapshot   startAt point(today day)  endAt point(today day + 2 month)
  //3 if array with onSnapshot array less then 25 length then  get() limit (25) start(start point thaat last timeentrie from onSnap)

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

  //=========================================================================
  //===================================================================================

  //////////////////////////////////////
  /////////////////////////////////////

  useEffect(() => {
    if (isFinishedToLoadActivitiesID === true) {
      const today = new Date();
      const twoMonthBefore = subtractTwoMonths(2, today);

      let allActivityTimeEntryAndStatus = firestore()
        .collection("timeentries")
        .where("user_id", "==", auth().currentUser.uid)
        .orderBy("date", "desc")
        .startAt(today)
        .endAt(twoMonthBefore)
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
            setStart(snap.docs[snap.docs.length - 1]);
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
  // console.log("start  ", start);

  function subtractTwoMonths(numOfMonths, date = new Date()) {
    const dateCopy = new Date(date.getTime());
    dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);
    return dateCopy;
  }

  useEffect(() => {
    if (scrollToGetMoreTimeEntries) {
      const getMoreTimeEntries = async () => {
        let startPoint = null;
        if (Object.keys(startPointAfterScroll).length != 0) {
          startPoint = startPointAfterScroll;
        } else {
          startPoint = start;
        }
        console.log("startPoint  ", startPoint);
        let timeEntriesArray = [];

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
              setTimeEntriesAfterScrolling(timeEntriesArray);

              setStartPointAfterScroll(response.docs[response.docs.length - 1]);
              //setScrollToGetMoreTimeEntries(false);

              // console.log("With limit ", timeEntriesArray);
            })
            .catch((error) => {
              console.log("errorMessage ", error);
            });
        } catch (error) {
          console.log("AdminContex errorMessage ", error);
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
