import firestore from "@react-native-firebase/firestore";
import { UserPost } from "../utility/types";
import { userPostObject } from "./adaptedObject";

export const onSnapshotUserPosts = (
  setUserPost: (posts: UserPost[]) => void,
  limit: number
) => {
  let arr: UserPost[] = [];
  try {
    return firestore()
      .collection("UserPosts")
      .orderBy("date", "desc")
      .limit(limit)
      .onSnapshot((querySnapshot) => {
        arr = [];
        querySnapshot?.docs.forEach((doc) => {
          arr.push(userPostObject(doc));
        });
        setUserPost(arr);
      });
  } catch (error) {
    setUserPost([]);
    console.log(error);
  }
};

export const onSnapshotSelectedPost = (
  postId: UserPost["id"],
  setUserPost: (posts: UserPost | undefined) => void
) => {
  try {
    return firestore()
      .collection("UserPosts")
      .doc(postId)
      .onSnapshot((doc) => {
        return setUserPost(doc?.data() ? userPostObject(doc) : undefined);
      });
  } catch (error) {
    setUserPost(undefined);
    console.log(error);
  }
};
