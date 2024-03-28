import { User } from "../../utility/types";
import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";

export const superAdminUpdatesUserInfo = async (user: User) => {
  try {
    const updateUserRoleClaims = functions().httpsCallable(
      "updateUserRoleClaims",
    );
    await updateUserRoleClaims(user);
    firestore().collection("Users").doc(user.id).update({
      first_name: user.firstName,
      last_name: user.lastName,
      status_active: user.statusActive,
      role: user.role,
      admin_id: user.adminID,
    });
    console.log("Super admin update user data");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
