import firestore from "@react-native-firebase/firestore";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
  UserPost,
} from "../../utility/types";
import { FirebaseuserActivityAndAccumulatedTime } from "../typeFirebase";
import { parse } from "date-fns";

export const incrementTotalHoursForMonthYearAccumulatedTime = (
  userId: User["id"],
  confirmedHours: number,
  hoursThisYear: number,
  activitiesAndTime: FirebaseuserActivityAndAccumulatedTime[],
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
  approvedBy: User["id"],
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
  } catch (error) {
    console.log(error);
  }
};


export const updatePostInFirestore = async (post: UserPost) => {
  
  const convertToDateStamp = typeof post.date === 'string'
  ? parse(post.date, "yyyy-MM-dd", new Date())
  : post.date;

  try {
    const postData = {
      ...(post.userID && { user_id: post.userID }),
      ...(post.activityID && { activity_id: post.activityID }),
      ...(post.activityCity && { activity_city: post.activityCity }),
      ...(post.activityTitle && { activity_title: post.activityTitle }),
      ...(post.activityImage && { activity_image: post.activityImage }),
      ...(post.userFirstName && { first_name: post.userFirstName }),
      ...(post.userLastName && { last_name: post.userLastName }),
      ...(post.changed && { changed: true}),
      ...(post.description && { description: post.description }),
      ...(post.emoji && { emoji: post.emoji }),
      ...(post.imageURL && { image_url: post.imageURL }),
      ...(post.comments && { comments: post.comments }),
      ...(post.date && { date: convertToDateStamp})
    };

    await firestore().collection("UserPosts").doc(post.id).update(postData);
  } catch (error) {
    return Promise.reject(error);
  }
};
