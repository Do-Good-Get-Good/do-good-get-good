import { useCallback, useEffect, useState } from "react";
import {
  getActivityByID,
  getUserData,
} from "../../firebase-functions/getTS/get";
import { Activity, User, UserPost } from "../../utility/types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { userPostObject } from "../../firebase-functions/adaptedObject";
import { onSnapshotUserPosts } from "../../firebase-functions/onSnapshotsFunctions";

const currentUser = auth().currentUser;

type Props = {
  getChatData: boolean;
};

export const useChat = ({ getChatData }: Props) => {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [limit, setlimit] = useState(20);
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
  const [activitiesConnectedToUser, setActivitiesConnectedToUser] = useState<
    Activity[]
  >([]);
  const [usersInChat, setUsersInChat] = useState<User[]>([]);

  useEffect(() => {
    const subscriber = onSnapshotUserPosts((posts) => setPosts(posts));
    return () => subscriber && subscriber();
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
