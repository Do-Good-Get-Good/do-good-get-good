import messaging from "@react-native-firebase/messaging";
import { Token } from "../../utility/types";
import functions from "@react-native-firebase/functions";
import Config from "react-native-config";
const project =
  Config.NODE_ENV === "prod"
    ? "do-good-get-good-2f6cc"
    : "dev-do-good-get-good";

export const useSaveTokenToDatabase = () => {
  const saveToken = async (token: Token["token"]) => {
    try {
      const updateToken = functions().httpsCallableFromUrl(
        `https://europe-north1-${project}.cloudfunctions.net/updateTokensSecondGen`,
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
