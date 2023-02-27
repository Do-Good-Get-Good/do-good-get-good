import { useState, useEffect } from "react";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { format } from "date-fns";

const useTimeEntriesForAdmin = (userData) => {
  const [myUsers, setMyUsers] = useState([]);
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    return firestore()
      .collection("timeentries")
      .where("admin_id", "==", auth().currentUser.uid)
      .where("status_confirmed", "==", false)
      .orderBy("date", "desc")
      .onSnapshot(
        (snapshot) => {
          setSnapshot(null);
          setSnapshot(snapshot);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [userData]);

  useEffect(() => {
    if (snapshot != null && userData.length !== 0) {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          addTimeEntry(change);
        }
        if (change.type === "modified") {
          updateTimeEntry(change);
        }
        if (change.type === "removed") {
          removeTimeEntry(change);
        }
      });
    }
  }, [userData, snapshot]);

  const addTimeEntry = async (change) => {
    let fullName;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].userID === change.doc.data().user_id) {
        fullName = `${userData[i].firstName} ${userData[i].lastName}`;
      }
    }

    var cheackIfThisTimeEntriesAlreadyExist = myUsers.findIndex(
      (x) => x.timeEntryId === change.doc.id
    );
    if (cheackIfThisTimeEntriesAlreadyExist === -1) {
      const timeEntryData = {
        userID: change.doc.data().user_id,
        fullName: fullName,
        activityID: change.doc.data().activity_id,
        activityName: change.doc.data().activity_title,
        timeEntryDate: format(change.doc.data().date.toDate(), "yyyy-MM-dd"),
        timeEntryHours: change.doc.data().time,
        timeEntryId: change.doc.id,
        checked: false,
        isOpen: false,
      };

      setMyUsers((prev) => [...prev, timeEntryData]);
    }
  };

  const updateTimeEntry = (change) => {
    let modifiedMyUsersArray = myUsers.map((user) => {
      if (user.timeEntryId !== change.doc.id) return user;

      return {
        ...user,
        timeEntryDate: format(change.doc.data().date.toDate(), "yyyy-MM-dd"),
        timeEntryHours: change.doc.data().time,
      };
    });
    setMyUsers(modifiedMyUsersArray);
  };

  const removeTimeEntry = (change) => {
    let newUserTimeEntryArray = myUsers.filter((timeEntry) => {
      if (timeEntry.timeEntryId != change.doc.id) {
        return timeEntry;
      }
    });
    setMyUsers(newUserTimeEntryArray);
  };

  return { myUsers, setMyUsers };
};

export default useTimeEntriesForAdmin;
