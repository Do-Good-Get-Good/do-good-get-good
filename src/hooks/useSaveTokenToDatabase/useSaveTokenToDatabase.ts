import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import { Token } from "../../utility/types";
import { updateTokens } from "../../firebase-functions/updateTS/update";

export const useSaveTokenToDatabase = () => {
  const userId = auth()?.currentUser?.uid;

  const saveToken = async (token: Token) => {
    userId && (await updateTokens(token, userId));
  };

  const getAndRefreshToken = async () => {
    const timestamp = new Date(firestore.Timestamp.now().toDate());
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
