import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { FirebaseUserType } from "../../utility/firebaseTypes";

type Token = {
  token: string;
  timestamp: Date | string;
};

export const useSaveTokenToDatabase = () => {
  const userId = auth()?.currentUser?.uid;

  const saveToken = async (token: Token) => {
    userId &&
      (await firestore()
        .collection("Users")
        .doc("58oIQpSpafejh6SfnQSrDqScrHu2")
        // .doc(userId)
        .update({
          tokens: firestore.FieldValue.arrayUnion("token.token"),
          // tokens: firestore.FieldValue.arrayUnion(token.token),
          get_push_notifi: true,
        }));
  };

  const getAndRefreshToken = async () => {
    const timestamp = new Date(firestore.Timestamp.now().toMillis());
    // get user, check if tiken exist. if no then add token and time stemp if yes then just update timestemp

    await messaging()
      .getToken()
      .then((token) => {
        return saveToken({ token, timestamp: timestamp });
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveToken({ token, timestamp: timestamp });
    });
  };

  return {
    getAndRefreshToken,
  };
};
