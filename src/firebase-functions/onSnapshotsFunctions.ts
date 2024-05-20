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
          arr.push(userPostObject(doc));
        });
        setUserPost(arr);
      });
  } catch (error) {
    setUserPost([]);
    console.log(error);
  }
};

export const onSnapshotSelectedPost =(postId: UserPost['id'] , setUserPost: (posts: UserPost| undefined) => void,)=>{
  try {
    return firestore()
      .collection("UserPosts").doc(postId)
      .onSnapshot((doc) => {
      return setUserPost(userPostObject(doc)) 
      });
  } catch (error) {
    setUserPost(undefined) 
    console.log(error);
  }
}
