import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const useTimeEntries = (limit) => {
  const [timeEntries, setTimeEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    return firestore()
      .collection("timeentries")
      .where("user_id", "==", auth().currentUser.uid)
      .orderBy("date", "desc")
      .limit(limit)
      .onSnapshot(
        (snapshot) => {
          setTimeEntries([]);
          setIsLoading(true);
          setTimeEntries(
            snapshot.docs.map((doc) => {
              return {
                adminID: doc.data().admin_id,
                timeEntryID: doc.id,
                date: doc.data().date.toDate(),
                statusConfirmed: doc.data().status_confirmed,
                time: doc.data().time,
                title: doc.data().activity_title,
                activityID: doc.data().activity_id,
              };
            })
          );
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  }, []);

  return { timeEntries, isLoading, error };
};

export default useTimeEntries;
