import { Platform } from "react-native";
import {  Comment, Post, PostEmoji, User, UserPost } from "../../utility/types";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

const addImageToStorage = async (imageURL: string) => {
  const uploadUri =
    Platform.OS === "ios" ? imageURL.replace("file://", "") : imageURL;
  let filename = imageURL.substring(imageURL.lastIndexOf("/") + 1);

  let fullPath = "";

  await storage()
    .ref(`chat-images/${filename}`)
    .putFile(uploadUri)
    .then(async (response) => {
      fullPath = await storage()
        .ref(response.metadata.fullPath)
        .getDownloadURL();
    });
  return fullPath;
};
export const saveImageToChatImageStoreAndCreateUserPost = async (
  post: UserPost,
) => {
  try {
    const timestamp = firestore.Timestamp.now().toMillis();
    const formattedDate = new Date(timestamp);

    const fullPath =
      post?.imageURL && (await addImageToStorage(post?.imageURL));

    addChatPost({
      ...post,
      imageURL: fullPath,
      date: formattedDate,
    });
  } catch (e) {
    console.error(e);
  }
};

const addChatPost = async (post: UserPost) => {
  const timestamp = firestore.Timestamp.now().toMillis();
  const formattedDate = new Date(timestamp);
  try {
    const postData = {
      ...(post.userID && { user_id: post.userID }),
      ...(post.activityID && { activity_id: post.activityID }),
      ...(post.activityCity && { activity_city: post.activityCity }),
      ...(post.activityTitle && { activity_title: post.activityTitle }),
      ...(post.activityImage && { activity_image: post.activityImage }),
      ...(post.userFirstName && { first_name: post.userFirstName }),
      ...(post.userLastName && { last_name: post.userLastName }),
      ...(post.changed && { changed: post.changed }),
      ...(post.description && { description: post.description }),
      ...(post.emoji && { emoji: post.emoji }),
      ...(post.imageURL && { image_url: post.imageURL }),
      ...(post.comments && { comments: post.comments }),
      date: formattedDate,
    };
    const res = await firestore().collection("UserPosts").add(postData);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addEmoji = async (emoji: PostEmoji, postID: UserPost["id"]) => {
  try {
    await firestore()
      .collection("UserPosts")
      .doc(postID)
      .update({
        emoji: firestore.FieldValue.arrayUnion(emoji),
      });
  } catch (error) {
    console.log(error)
  } 
}

export const addComment = async(comment:Comment, postID : UserPost['id'])=>{
  try {
    await firestore().collection("UserPosts").doc(postID).update({
      comments:  firestore.FieldValue.arrayUnion(comment)
    })
   
  } catch (error) {
    console.log(error)
  } 
}
