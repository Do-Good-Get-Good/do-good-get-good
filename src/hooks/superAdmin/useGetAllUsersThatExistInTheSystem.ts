import { useEffect } from "react";

import { Role } from "../../utility/enums";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { getAllUsersData } from "../../firebase-functions/getTS/get";

export const useGetAllUsersThatExistInTheSystem = (
  userLevel: Role | undefined,
) => {
  const context = useSuperAdminFunction();

  const getAllUsersThatExistInTheSystem = async () => {
    try {
      let allUsers = await getAllUsersData();
      allUsers && context?.setAllUsersInSystem(allUsers);
    } catch (error) {
      console.log("SuperAdminContext errorMessage ", error);
    }
  };

  useEffect(() => {
    if (userLevel === Role.superadmin) {
      getAllUsersThatExistInTheSystem();
    } else {
      context?.setAllUsersInSystem(undefined);
    }
  }, [userLevel]);
};
