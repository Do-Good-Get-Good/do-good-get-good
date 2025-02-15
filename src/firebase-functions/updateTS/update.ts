import firestore from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";

import { TimeEntry, User, UserPost } from "../../utility/types";

import { parse } from "date-fns";
import { getProject } from "../../lib/project";
import { FirebaseActivitiesAndAccumulatedTime } from "../../utility/firebaseTypes";
import { addImageToStorage } from "../addTS/add";
import { deleteImage } from "../deleteTS/delete";

export const incrementTotalHoursForMonthYearAccumulatedTime = (
  userId: User["id"],
  confirmedHours: number,
  hoursThisYear: number,
  activitiesAndTime: FirebaseActivitiesAndAccumulatedTime[]
) => {
  try {
    firestore()
      .collection("Users")
      .doc(userId)
      .update({
        total_confirmed_hours: firestore.FieldValue.increment(confirmedHours),
        total_hours_year: firestore.FieldValue.increment(hoursThisYear),
        activities_and_accumulated_time: activitiesAndTime,
      });
  } catch (error) {
    console.log("There was an error incrementing total hours", error);
  }
};

export const confirmTimeEntry = async (
  timeEntryID: TimeEntry["id"],
  approvedBy: User["id"]
) => {
  try {
    let response = await firestore()
      .collection("timeentries")
      .doc(timeEntryID)
      .update({
        status_confirmed: true,
        approved_by: approvedBy,
      });
    // Normaly you need to use incrementTotalHoursForMonthYearAccumulatedTime after you run confirmTimeEntry. look useApproveTimeEntry
    // TODO: Make incrementTotalHoursForMonthYearAccumulatedTime as cloud function
    return Promise.resolve(response);
  } catch (error) {
    console.log("There was an error confirming the timeentry");
    return Promise.reject(error);
  }
};

export const updateUserAsAdmin = async (user: User) => {
  try {
    await firestore().collection("Users").doc(user.id).update({
      first_name: user.firstName,
      last_name: user.lastName,
      status_active: user.statusActive,
    });

    const updateEmail = functions().httpsCallableFromUrl(
      `https://europe-north1-${getProject()}.cloudfunctions.net/changeUserEmail`
    );
    await updateEmail({ userId: user.id, newEmail: user.email });
  } catch (error) {
    console.log(error);
  }
};

const updateImage = async (updatedImage: string, oldImage: string) => {
  const fbStorageImagePath = await addImageToStorage(updatedImage);
  await deleteImage(oldImage);
  return fbStorageImagePath;
};

export const updatePostInFirestore = async (
  post: UserPost,
  updatedImage: UserPost["imageURL"]
) => {
  const convertToDateStamp =
    typeof post.date === "string"
      ? parse(post.date, "yyyy-MM-dd", new Date())
      : post.date;

  let img = post.imageURL;
  if (updatedImage && post.imageURL && updatedImage !== post.imageURL) {
    img = await updateImage(updatedImage, post.imageURL);
  }
  try {
    const postData = {
      ...(post.userID && { user_id: post.userID }),
      ...(post.activityID && { activity_id: post.activityID }),
      ...(post.activityCity && { activity_city: post.activityCity }),
      ...(post.activityTitle && { activity_title: post.activityTitle }),
      ...(post.activityImage && { activity_image: post.activityImage }),
      ...(post.userFirstName && { first_name: post.userFirstName }),
      ...(post.userLastName && { last_name: post.userLastName }),
      ...(post.emoji && { emoji: post.emoji }),
      ...(post.comments && { comments: post.comments }),
      ...(post.date && { date: convertToDateStamp }),
      ...(img && { image_url: img }),
      changed: true,
      description: post.description,
    };

    await firestore().collection("UserPosts").doc(post.id).update(postData);
  } catch (error) {
    return Promise.reject(error);
  }
};
