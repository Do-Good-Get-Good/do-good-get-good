import { useEffect } from "react";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { getUserByStatus } from "../../firebase-functions/getTS/get";
import { Role } from "../../utility/enums";
import { User } from "../../utility/types";

export const useGetAllUsersThatExistInTheSystem = (
  userLevel: Role | undefined
) => {
  const context = useSuperAdminFunction();

  const onGetAllActiveUsers = async (): Promise<void> => {
    await getAllUsersByStatus(true, []);
  };

  const getAllUsersByStatus = async (isActive: boolean, prev: User[]) => {
    if (userLevel === Role.superadmin) {
      try {
        const data = await getUserByStatus(isActive);
        data && context?.setAllUsersInSystem([...prev, ...data]);
      } catch (error) {
        console.log("SuperAdminContext errorMessage ", error);
      }
    }
  };
  useEffect(() => {
    if (userLevel !== Role.superadmin) {
      context?.setAllUsersInSystem([]);
    }
  }, [userLevel]);

  return { getAllUsersByStatus, onGetAllActiveUsers };
};
