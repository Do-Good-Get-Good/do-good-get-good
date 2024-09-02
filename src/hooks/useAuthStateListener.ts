import { useEffect, useState } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";
import { UserClaims } from "../utility/firebaseTypes";

import { Role } from "../utility/enums";
import intersection from "lodash/intersection";
import head from "lodash/head";
import { useUserLevel } from "../context/useUserLevel";

export const useAuthStateListener = () => {
  const { setUserLevel } = useUserLevel();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userClaims, setUserClaims] = useState<UserClaims | undefined>(
    undefined,
  );

  async function onAuthStateChanged(userState: FirebaseAuthTypes.User | null) {
    setUser(userState);
    if (userState) {
      try {
        let userIdToken: FirebaseAuthTypes.IdTokenResult =
          await userState.getIdTokenResult();
        setUserClaims(userIdToken?.claims);

        const searchUserRoleInClaims = intersection(
          Object.keys(userIdToken?.claims),
          Object.keys(Role),
        );
        const role = Role[head(searchUserRoleInClaims) as keyof typeof Role];
        setUserLevel(role);
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
