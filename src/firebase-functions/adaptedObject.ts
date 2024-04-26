import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { format } from "date-fns";
import { FirebaseuserActivityAndAccumulatedTime } from "./typeFirebase";
import { User } from "../utility/types";

const userActivitiesAndAccumulatedTime = (
  arr: FirebaseuserActivityAndAccumulatedTime[],
): User["activitiesAndAccumulatedTime"] => {
  let temArr: User["activitiesAndAccumulatedTime"] = [];
  arr.forEach((item) =>
    temArr.push({
      accumulatedTime: item.accumulated_time,
      activityID: item.activity_id,
    }),
  );
  return temArr;
};

export const userObject = (
  doc:
    | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | FirebaseFirestoreTypes.DocumentData,
) => {
  let user: User = {
    id: doc.id,
    activitiesAndAccumulatedTime: userActivitiesAndAccumulatedTime(
      doc.data().activities_and_accumulated_time,
    ),
    adminID: doc.data().admin_id,
    connectedActivities: doc.data().connected_activities,
    firstName: doc.data().first_name,
    lastName: doc.data().last_name,
    role: doc.data().role,
    statusActive: doc.data().status_active,
    totalConfirmedHours: doc.data().total_confirmed_hours,
    totalHoursMonth: doc.data().total_hours_month,
    totalHoursYear: doc.data().total_hours_year,
  };

  return user;
};
export const timeEntryObject = (
  doc:
    | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | FirebaseFirestoreTypes.DocumentData,
) => {
  return {
    id: doc.id,
    activityID: doc.data().activity_id,
    adminID: doc.data().admin_id,
    userID: doc.data().user_id,
    activityTitle: doc.data().activity_title,
    date: format(doc.data().date.toDate(), "yyyy-MM-dd"),
    statusConfirmed: doc.data().status_confirmed,
    time: doc.data().time,
  };
};

export const activityObject = (
  doc:
    | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | FirebaseFirestoreTypes.DocumentData,
) => {
  return {
    id: doc.id,
    title: doc.data().activity_title,
    active: doc.data().active_status,
    city: doc.data().activity_city,
    place: doc.data().activity_place,
    description: doc.data().activity_description,
    photo: doc.data().activity_photo,
    popular: doc.data().tg_favorite,
    imageUrl: doc.data().imageUrl,
    userCount: doc.data().user_count,
  };
};

export const userPostObject = (
  doc:
    | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | FirebaseFirestoreTypes.DocumentData,
) => {
  return {
    id: doc.id,
    userID: doc.data().user_id,
    userFirstName: doc.data().first_name,
    userLastName: doc.data().last_name,
    activityID: doc.data().activity_id,
    activityCity: doc.data().activity_city,
    activityTitle: doc.data().activity_title,
    activityImage: doc.data().activity_image,
    changed: doc.data().changed,
    date: doc.data().date.toDate(),
    description: doc.data().description,
    emoji: doc.data().emoji,
    imageURL: doc.data().image_url,
    comments: doc.data().comments,
  };
};
