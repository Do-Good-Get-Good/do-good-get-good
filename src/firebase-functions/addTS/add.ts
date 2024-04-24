import { Platform } from "react-native";
import { UserPost } from "../../utility/types";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
const postTime = new Date();

export const saveImageToChatImageStoreAndCreateUserPost = async (
  post: UserPost,
) => {
  const uploadUri =
    Platform.OS === "ios"
      ? post.imageURL.replace("file://", "")
      : post.imageURL;
  let filename = post.imageURL.substring(post.imageURL.lastIndexOf("/") + 1);

  const ref = storage().ref(`chat-images/${filename}`);
  const task = ref.putFile(uploadUri);

  try {
    await task.then(async (response) => {
      const fullPath = await storage()
        .ref(response.metadata.fullPath)
        .getDownloadURL();

      addChatPost({
        ...post,
        imageURL: fullPath,
        date: postTime,
      });
    });
  } catch (e) {
    console.error(e);
  }
};

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