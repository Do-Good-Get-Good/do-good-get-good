import firestore from "@react-native-firebase/firestore";
import { UserPost } from "../../utility/types";
import storage from "@react-native-firebase/storage";

export const deleteUserPostAndImageInStorage = async (post: UserPost) => {
  try {
    await storage()
      .refFromURL(post.imageURL)
      .delete()
      .then(async () => {
        await deleteUserPost(post.id);
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserPost = async (postID: UserPost["id"]) => {
  try {
    const res = await firestore().collection("UserPosts").doc(postID).delete();
    return res;
  } catch (error) {
    console.log(error);
  }
};
