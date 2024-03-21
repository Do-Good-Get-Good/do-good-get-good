import { useEffect } from "react";

import { Role } from "../../utility/enums";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import {  getUserByStatus } from "../../firebase-functions/getTS/get";

export const useGetAllUsersThatExistInTheSystem = (
  userLevel: Role | undefined,
) => {
  const context = useSuperAdminFunction();
  const allUsersInSystem = context?.allUsersInSystem ?? []

  const getAllUsersByStatus= async (isActive: boolean) => {
    if (userLevel === Role.superadmin) {
    try {
  
      const getUsers = await getUserByStatus(isActive)
      getUsers && context?.setAllUsersInSystem([...allUsersInSystem ,...getUsers]);
     
    } catch (error) {
      console.log("SuperAdminContext errorMessage ", error);
    }}
  };

  useEffect(() => {
    if (userLevel !== Role.superadmin) {
      context?.setAllUsersInSystem(undefined);
    }
  }, [userLevel]);

  return {getAllUsersByStatus}
};
