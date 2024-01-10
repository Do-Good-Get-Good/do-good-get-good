import { useEffect, useState } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";
import { UserClames } from "../utilily/firebaseTypes";

import { Role } from "../utilily/enums";
import userLevelStore from "../store/userLevel";

export const useAuthStateListener = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userClaims, setUserClaims] = useState<UserClames | undefined>(
    undefined,
  );

  async function onAuthStateChanged(userState: FirebaseAuthTypes.User | null) {
    setUser(userState);
    if (userState) {
      try {
        let userIdToken: FirebaseAuthTypes.IdTokenResult =
          await userState.getIdTokenResult();
        setUserClaims(userIdToken?.claims);

        userLevelStore.setUserLevel(
          userIdToken?.claims?.admin
            ? Role.admin
            : userIdToken?.claims?.superadmin
              ? Role.superadmin
              : userIdToken?.claims?.user
                ? Role.user
                : undefined,
        );
      } catch (error: any) {
        crashlytics().log("There was an error getting the users ID Token");
        crashlytics().recordError(error);
        console.log(error);
      }
    } else {
      setUserClaims(undefined);
    }
    if (initializing) setInitializing(false);
  }

  const signOut = () => auth().signOut();

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return { initializing, user, userClaims, signOut };
};
