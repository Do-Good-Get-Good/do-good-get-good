import { useCallback, useEffect, useState } from "react";
import {
  getActivityByID,
  getUserData,
} from "../../firebase-functions/getTS/get";
import { Activity, User, UserPost } from "../../utility/types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { userPostObject } from "../../firebase-functions/adaptedObject";

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
    let arr: UserPost[] = [];

    const subscriber = firestore()
      .collection("UserPosts")
      .orderBy("date", "asc")
      .limit(limit)
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
  };
};
