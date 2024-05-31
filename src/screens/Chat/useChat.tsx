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
  const [limit, setlimit] = useState(3);
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
  const [activitiesConnectedToUser, setActivitiesConnectedToUser] = useState<
    Activity[]
  >([]);

  useEffect(() => {
    const subscriber = onSnapshotUserPosts((posts) => setPosts(posts), limit);
    return () => subscriber && subscriber();
  }, [getChatData, limit]);

  useEffect(() => {
    getUser();
  }, [currentUser]);

  const getAllActivitiesConnectedToUser = async (
    connectedActivitiesID: User["connectedActivities"],
  ) => {
    let arr: Activity[] = [];
    const promises = connectedActivitiesID.map(async (item) => {
      let activityData = await getActivityByID(item);
      activityData && arr.push(activityData);
    });
    await Promise.all(promises);
    return arr;
  };

  const getUser = async () => {
    if (currentUser) {
      const getUserInfo = await getUserData(currentUser?.uid);
      setLoggedInUser(getUserInfo);
    }
  };

  return {
    getUser,
    getAllActivitiesConnectedToUser,
    posts,
    activitiesConnectedToUser,
    loggedInUser,
    setlimit,
    limit,
  };
};
