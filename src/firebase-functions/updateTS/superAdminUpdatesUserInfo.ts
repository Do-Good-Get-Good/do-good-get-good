import { User } from "../../utility/types";
import functions from "@react-native-firebase/functions";
import Config from "react-native-config";
const project =
  Config.NODE_ENV === "prod"
    ? "do-good-get-good-2f6cc"
    : "dev-do-good-get-good";

export const superAdminUpdatesUserInfo = async (user: User) => {
  try {
    const updateUser = functions().httpsCallableFromUrl(
      `https://europe-north1-${project}.cloudfunctions.net/updateUserSecondGen`,
    );
    const res = await updateUser(user);
    console.log("Super admin update user data ");
    return res.data;
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
