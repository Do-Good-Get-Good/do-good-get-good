import firestore from "@react-native-firebase/firestore";
import { TimeEntry, User } from "../../utilily/types";

export const confirmTimeEntry = async (
  timeEntryID: TimeEntry["id"],
  approvedBy: User["id"],
) => {
  try {
    let response = await firestore()
      .collection("timeentries")
      .doc(timeEntryID)
      .update({
        status_confirmed: true,
        approved_by: approvedBy,
      });
    return Promise.resolve(response);
  } catch (error) {
    console.log("There was an error confirming the timeentry");
    return Promise.reject(error);
  }
};
