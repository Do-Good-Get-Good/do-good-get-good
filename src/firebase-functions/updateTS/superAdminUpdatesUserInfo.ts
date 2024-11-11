import functions from "@react-native-firebase/functions";
import { getProject } from "../../lib/project";
import { User } from "../../utility/types";

export const superAdminUpdatesUserInfo = async (user: User) => {
  try {
    const updateUser = functions().httpsCallableFromUrl(
      `https://europe-north1-${getProject()}.cloudfunctions.net/updateUserSecondGen`
    );
    const res = await updateUser(user);
    console.log("Super admin update user data ");
    return res.data;
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
