import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import {
  Activity,
  Comment,
  PostEmoji,
  User,
  UserPost,
} from "../../utility/types";
import { userWaitingForActicityID } from "../../utility/utils";
import { connectTestActivityIfUserHasNoActivity } from "../addTS/add";
import { getUserData } from "../getTS/get";

export const deleteImage = async (postImageURL: UserPost["imageURL"]) => {
  try {
    postImageURL && (await storage().refFromURL(postImageURL).delete());
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserPostAndImageInStorage = async (post: UserPost) => {
  try {
    await deleteImage(post.imageURL);
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
  postID: UserPost["id"]
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

export const deleteActivityConnectionFromUser = async (
  activityID: Activity["id"],
  userID: User["id"]
) => {
  try {
    await firestore()
      .collection("Users")
      .doc(userID)
      .update({
        connected_activities: firestore.FieldValue.arrayRemove(activityID),
      })
      .then(async () => {
        let user = await getUserData(userID);
        if (user.connectedActivities.length === 0) {
          await connectTestActivityIfUserHasNoActivity(userID);
        }
      });

    return true;
  } catch (error) {
    console.log("deleteActivityConnectionFromUser: ", error);
    return false;
  }
};

export const disconnectTestActivityIfUserHasRealActivity = async (
  userID: User["id"]
) => {
  try {
    const getUser = await getUserData(userID);
    if (getUser.connectedActivities.length > 1) {
      await firestore()
        .collection("Users")
        .doc(userID)
        .update({
          connected_activities: firestore.FieldValue.arrayRemove(
            userWaitingForActicityID
          ),

          activities_and_accumulated_time: firestore.FieldValue.arrayRemove({
            accumulated_time: 0,
            activity_id: userWaitingForActicityID,
          }),
        });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
