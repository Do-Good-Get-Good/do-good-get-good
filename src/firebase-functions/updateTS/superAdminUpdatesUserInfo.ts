import firestore from "@react-native-firebase/firestore";
import { User } from "../../utility/types";

export const superAdminUpdatesUserInfo = async (user: User) => {
  try {
    firestore().collection("Users").doc(user.id).update({
      first_name: user.firstName,
      last_name: user.lastName,
      status_active: user.statusActive,
      role: user.role,
      admin_id: user.adminID,
    });
    console.log("Super admin update user data");
  } catch (error) {
    console.log(error);
  }
};
