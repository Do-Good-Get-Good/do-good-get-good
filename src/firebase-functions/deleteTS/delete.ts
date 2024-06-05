import firestore from "@react-native-firebase/firestore";
import { Comment, PostEmoji, UserPost } from "../../utility/types";
import storage from "@react-native-firebase/storage";
import crashlytics from "@react-native-firebase/crashlytics";

const deleteImage = async (post: UserPost) => {
  try {
    post.imageURL && (await storage().refFromURL(post?.imageURL).delete());
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserPostAndImageInStorage = async (post: UserPost) => {
  try {
    await deleteImage(post);
    await deleteUserPost(post.id);
  } catch (error: any) {
    console.log(error);
    crashlytics().log("There was an error to delete user post");
    crashlytics().recordError(error);
  }
};

export const deleteUserPost = async (postID: UserPost["id"]) => {
  try {
    const res = await firestore().collection("UserPosts").doc(postID).delete();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmoji = async (emoji: PostEmoji, postID: UserPost["id"]) => {
  try {
    await firestore()
      .collection("UserPosts")
      .doc(postID)
      .update({
        emoji: firestore.FieldValue.arrayRemove(emoji),
      });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteComment = async (
  comment: Comment,
  postID: UserPost["id"],
) => {
  try {
    await firestore()
      .collection("UserPosts")
      .doc(postID)
      .update({
        comments: firestore.FieldValue.arrayRemove(comment),
      });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
