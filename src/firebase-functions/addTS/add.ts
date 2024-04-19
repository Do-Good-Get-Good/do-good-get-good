import { UserPost } from "../../utility/types";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export const addChatPost = async (post: UserPost) => {
  try {
    const res = await firestore().collection("UserPosts").add({
      user_id: post.userID,
      activity_id: post.activityID,
      activity_city: post.activityCity,
      activity_title: post.activityTitle,
      activity_image: post.activityImage,
      changed: post.changed,
      date: post.date,
      description: post.description,
      emoji: post.emoji,
      image_url: post.imageURL,
      comments: post.comments,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
