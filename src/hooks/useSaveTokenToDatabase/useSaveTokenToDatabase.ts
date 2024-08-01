import messaging from "@react-native-firebase/messaging";
import { Token } from "../../utility/types";
import functions from "@react-native-firebase/functions";

export const useSaveTokenToDatabase = () => {
  const saveToken = async (token: Token["token"]) => {
    try {
      const updateToken = functions().httpsCallableFromUrl(
        "https://europe-north1-dev-do-good-get-good.cloudfunctions.net/updateTokensSecondGen",
      );
      await updateToken(token);
    } catch (error) {
      console.log(error, "-----");
    }
  };

  const getAndRefreshToken = async () => {
    await messaging()
      .getToken()
      .then((token) => {
        return saveToken(token);
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveToken(token);
    });
  };

  return {
    getAndRefreshToken,
  };
};
