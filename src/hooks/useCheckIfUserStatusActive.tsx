import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { AlertInfo } from "../components/Alerts/AlertInfo";
import { getUserData } from "../firebase-functions/getTS/get";

const textInfoForInactiveUser =
  "Ditt konto är inaktivt. Be din konsultchef att aktivera ditt konto.";

export const useCheckIfUserStatusActive = () => {
  const checkIfUserStatusActive = async (
    user: FirebaseAuthTypes.User | null | undefined
  ): Promise<boolean> => {
    if (user === undefined || user === null) return false;

    const userID = user.uid;
    const userCollectionData = await getUserData(userID);
    const isUserActive = userCollectionData?.statusActive ?? false;

    !isUserActive && AlertInfo(textInfoForInactiveUser);
    return isUserActive;
  };

  return { checkIfUserStatusActive };
};
