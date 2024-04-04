import { User } from "../../utility/types";
import functions from "@react-native-firebase/functions";

export const superAdminUpdatesUserInfo = async (user: User) => {
  try {
    const updateUser = functions().httpsCallable("updateUser");
    const res = await updateUser(user);
    console.log("Super admin update user data ");
    return res.data;
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
