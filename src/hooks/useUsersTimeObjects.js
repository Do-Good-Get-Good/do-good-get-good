import { useEffect } from "react";
import adminStore from "../store/adminStore";
import firestore from "@react-native-firebase/firestore";

export const useUsersTimeObjects = () => {
  useEffect(() => {
    let unsubscribeArr = [];
    const subscribeToUserTimeObjects = async () => {
      adminStore.allUsers.map((user) => {
        let unsubscribe = firestore()
          .collection("Users")
          .doc(user.userID)
          .onSnapshot((snapshot) => {
            let userId = snapshot.id;
            let timeObject = {
              paidTime: snapshot.data().total_hours_year,
              currentForMonth: snapshot.data().total_hours_month,
            };
            adminStore.updateUserTimeObject(userId, timeObject);
          });
        unsubscribeArr.push(unsubscribe);
      });
    };

    subscribeToUserTimeObjects();

    return () => {
      unsubscribeArr.map((unsubscribe) => unsubscribe());
    };
  }, []);
};
