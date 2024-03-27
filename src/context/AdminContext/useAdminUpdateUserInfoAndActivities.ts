import { updateUserAsAdmin } from "../../firebase-functions/updateTS/update";
import { User } from "../../utility/types";
import { useAdminContext } from "./useAdminContext";

export const useAdminUpdateUserInfoAndActivities = () => {
  const { onShowUnApprovedTimeEntriesAdminPage } = useAdminContext();

  const updateUserAfterChanges = async (updatedUser: User) => {
    await updateUserAsAdmin(updatedUser);
    await onShowUnApprovedTimeEntriesAdminPage();
  };

  return { updateUserAfterChanges };
};
