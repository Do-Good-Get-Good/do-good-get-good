import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { getUserData } from "../firebase-functions/getTS/get";
import { useEffect } from "react";
import { AlertInfo } from "../components/Alerts/AlertInfo";

const signOut = () => auth().signOut();

const textInfoForInactiveUser =
  "Ditt konto är inaktivt. Be din konsultchef att aktivera ditt konto.";

export const useCheckIfUserStatusActive = (
  user: FirebaseAuthTypes.User | null,
) => {
  const userID = user?.uid;

  useEffect(() => {
    checkIfUserStatusActive();
  }, [user]);

  const checkIfUserStatusActive = async () => {
    const userCollectionData = userID ? await getUserData(userID) : undefined;

    if (user !== null && userCollectionData?.statusActive === false) {
      showAlertForInactiveUserAndSignOut();
    }
  };

  const showAlertForInactiveUserAndSignOut = async () => {
    AlertInfo(textInfoForInactiveUser, signOut);
  };
};
