import { useState } from "react";
import functions from "@react-native-firebase/functions";
import { User } from "../utilily/types";

export const useUpdateUserInfo = (userID: User["id"]) => {
  const [loading, setLoading] = useState<boolean>(false);
  //   const email = functions().httpsCallable("getUserEmail");
  const email = "sdf@sdf.serrr";

  const [error, setError] = useState<any>(null);

  const updateUserEmail = async (newEmail: string) => {
    if (newEmail !== email) {
      try {
        setLoading(true);
        let updateUser = functions().httpsCallable("updateUser");
        await updateUser({
          email: newEmail,
        }).then(() => setLoading(false));
      } catch (err) {
        console.log(err, " ------------   updateUserEmail");
        setError(err);
      }
    }
  };

  return { loading, error, email, updateUserEmail };
};
