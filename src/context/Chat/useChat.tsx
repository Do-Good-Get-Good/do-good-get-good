import {
  getActivityByID,
  getUserData,
} from "../../firebase-functions/getTS/get";
import { Activity, User } from "../../utility/types";
import auth from "@react-native-firebase/auth";
import { useChatFunction } from "./ChatContextState";
const currentUser = auth().currentUser;
export const useChat = () => {
  const { setUser, setActivitiesConnectedToUser } = useChatFunction();

  const getAllActivitiesConnectedToUser = async (
    connectedActivitiesID: User["connectedActivities"],
  ) => {
    let arr: Activity[] = [];
    connectedActivitiesID.map(async (item) => {
      let activityData = await getActivityByID(item);
      console.log(activityData);
      //  activityData && arr.push(activityData)
    });

    setActivitiesConnectedToUser(arr);
  };
  const getUser = async () => {
    currentUser && (await getUserData(currentUser?.uid));
  };

  return { getUser, getAllActivitiesConnectedToUser };
};
