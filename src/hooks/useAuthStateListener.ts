import { useEffect, useState } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";
import { UserPermissionLevel } from "../utilily/types";

export const useAuthStateListener = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userLevel, setUserLevel] = useState<UserPermissionLevel>();

  async function onAuthStateChanged(userState: FirebaseAuthTypes.User | null) {
    setUser(userState);
    if (userState) {
      try {
        let userIdToken = await userState.getIdTokenResult();
        setUserLevel(userIdToken.claims);
      } catch (error: any) {
        crashlytics().log("There was an error getting the users ID Token");
        crashlytics().recordError(error);
        console.log(error);
      }
    } else {
      setUserLevel(undefined);
    }
    if (initializing) setInitializing(false);
  }

  const signOut = () => auth().signOut();

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return { initializing, user, userLevel, signOut };
};
