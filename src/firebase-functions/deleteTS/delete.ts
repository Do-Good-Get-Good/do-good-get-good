import firestore from "@react-native-firebase/firestore";
import { UserPost } from "../../utility/types";
import storage from "@react-native-firebase/storage";
import crashlytics from "@react-native-firebase/crashlytics";

export const deleteUserPostAndImageInStorage = async (post: UserPost) => {
  try {
    await storage()
      .refFromURL(post.imageURL)
      .delete()
      .then(async () => {
        await deleteUserPost(post.id);
      });
  } catch (error: any) {
    crashlytics().log("There was an error to delete user post");
    crashlytics().recordError(error);
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
