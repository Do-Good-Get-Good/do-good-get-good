import firestore from "@react-native-firebase/firestore";
import { User } from "../../utilily/types";

export const superAdminUpdatesUserInfo = async (newChangesInUserInfo: User) => {
  try {
    console.log("newChangesInUserInfo  ", newChangesInUserInfo);
    firestore().collection("Users").doc(newChangesInUserInfo.id).update({
      first_name: newChangesInUserInfo.firstName,
      last_name: newChangesInUserInfo.lastName,
      status_active: newChangesInUserInfo.statusActive,
      role: newChangesInUserInfo.role,
      admin_id: newChangesInUserInfo.adminID,
    });
    console.log("Super admin update user data");
  } catch (error) {
    console.log(error);
  }
};
