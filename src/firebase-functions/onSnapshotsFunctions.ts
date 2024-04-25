import firestore from "@react-native-firebase/firestore";
import { userPostObject } from "./adaptedObject";
import { UserPost } from "../utility/types";

export const onSnapshotUserPosts = (
  setUserPost: (posts: UserPost[]) => void,
) => {
  let arr: UserPost[] = [];
  try {
    return firestore()
      .collection("UserPosts")
      .orderBy("date", "asc")
      .limit(20)
      .onSnapshot((querySnapshot) => {
        arr = [];
        querySnapshot.docs.forEach((doc) => {
          arr.push(userPostObject("name", "surname", doc));
        });
        setUserPost(arr);
      });
  } catch (error) {
    setUserPost([]);
    console.log(error);
  }
};
