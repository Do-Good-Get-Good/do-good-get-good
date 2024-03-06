import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { User } from "../../utility/types";
import { superAdminMakeUserObject } from "./utils";
// import { auth } from "firebase-admin";
 

export const useOnSelectUser = () => {
  const context = useSuperAdminFunction();
  const allAdminsAndSuperAdmin = context?.allAdminsAndSuperAdmins;
  const allUsersInTheSystem = context?.allUsersInSystem;

  // console.log(auth , ' ////////////////////////// auth')
 

  const onSelectUser = async(selectedUser: User) => {
    //  const email= await auth()?.getUserByEmail(selectedUser.id)
    allUsersInTheSystem &&
      context.setMakeChangesForSelectedUser(
        superAdminMakeUserObject(
          selectedUser,
          allUsersInTheSystem,
          allAdminsAndSuperAdmin,
        // "email"
        ),
      );
  };

  return { onSelectUser };
};
