import auth from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";
import { useState } from "react";

export const useSignIn = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  const onSignIn = (email: string, pass: string) => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("Den e-post adressen används redan");
        }
        if (error.code === "auth/user-not-found") {
          setAuthError("Fel e-post eller lösenord");
        }
        if (error.code === "auth/wrong-password") {
          setAuthError("Fel e-post eller lösenord");
        }
        if (error.code === "auth/invalid-email") {
          setAuthError("Ange en giltig e-post");
        }
        crashlytics().recordError(error);
        crashlytics().setAttributes({ email });
        console.error(error);
      });
  };

  return {
    authError,
    onSignIn,
  };
};
