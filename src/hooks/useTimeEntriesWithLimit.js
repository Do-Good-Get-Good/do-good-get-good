import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

const useTimeEntriesWithLimit = (limit) => {
  const [timeEntries, setTimeEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    return firestore()
      .collection("timeentries")
      .where("user_id", "==", auth().currentUser.uid)
      .orderBy("date", "desc")
      .limit(limit)
      .onSnapshot(
        (snapshot) => {
          setTimeEntries([]);
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
          setIsLoading(false);
          setError(error);
          console.log(error);
        }
      );
  }, [limit]);

  return { timeEntries, isLoading, error };
};

export default useTimeEntriesWithLimit;
