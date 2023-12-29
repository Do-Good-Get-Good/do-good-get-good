import firestore from "@react-native-firebase/firestore";
import { User } from "../../utilily/types";

export const superAdminUpdatesUserInfo = async (
  id: User["id"],
  firstName: User["firstName"],
  lastName: User["lastName"],
  statusActive: User["statusActive"],
  role: User["role"],
  adminID: User["adminID"],
) => {
  try {
    firestore().collection("Users").doc(id).update({
      first_name: firstName,
      last_name: lastName,
      status_active: statusActive,
      role: role,
      admin_id: adminID,
    });
    console.log("Super admin update user data");
  } catch (error) {
    console.log(error);
  }
};
