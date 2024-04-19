import { useCallback, useEffect, useState } from "react";
import {
  getActivityByID,
  getUserData,
} from "../../firebase-functions/getTS/get";
import { Activity, User, UserPost } from "../../utility/types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { userPostObject } from "../../firebase-functions/adaptedObject";
import { ar } from "date-fns/locale";

const currentUser = auth().currentUser;

type Props = {
  getChatData: boolean;
};

export const useChat = ({ getChatData }: Props) => {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
  const [activitiesConnectedToUser, setActivitiesConnectedToUser] = useState<
    Activity[]
  >([]);
  const [usersInChat, setUsersInChat] = useState<User[]>([]);

  useEffect(() => {
    let arr: UserPost[] = [];
    const subscriber = firestore()
      .collection("UserPosts")
      .orderBy("date", "desc")
      .limit(20)
      .onSnapshot((documentSnapshot) => {
        documentSnapshot.docs.forEach((change) => {
          arr.push(userPostObject(change));
        });
        setPosts(arr);
        arr = [];
        console.log(" onSnapshot UserPost");
      });

    return () => subscriber();
  }, [getChatData]);

  const getAllActivitiesConnectedToUser = async (
    connectedActivitiesID: User["connectedActivities"],
  ) => {
    let arr: Activity[] = [];
    connectedActivitiesID.map(async (item) => {
      let activityData = await getActivityByID(item);
      activityData && arr.push(activityData);
    });

    return arr;
  };

  const getUser = async () => {
    currentUser && (await getUserData(currentUser?.uid));
  };

  return {
    getUser,
    getAllActivitiesConnectedToUser,
    posts,
    activitiesConnectedToUser,
    loggedInUser,
  };
};
