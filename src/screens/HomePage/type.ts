import {
  ActivitiesAndAccumulatedTime,
  Activity,
  User,
} from "../../utility/types";

export type Props = {
  navigation: any;
};
// TODO: Those typs is temporary solution for HomePage screen. Refactor useLinkedActivities and delete this file
export type TimeObject = {
  accumulatedTime: ActivitiesAndAccumulatedTime["accumulatedTime"];
  activityID: ActivitiesAndAccumulatedTime["activityID"];
  adminID: User["adminID"];
  connectedActivities: User["connectedActivities"];
  paidTime: User["totalConfirmedHours"];
  timeForYear: User["totalHoursYear"];
  currentForMonth: User["totalHoursMonth"];
};

export type ActivityInfo = {
  adminId: User["adminID"];
  city: Activity["city"];
  id: Activity["id"];
  imageUrl: Activity["imageUrl"];
  photo: Activity["photo"];
  time: ActivitiesAndAccumulatedTime["accumulatedTime"];
  title: Activity["title"];
};

export type LinkedActivities = {
  timeObject: Array<TimeObject>;
  activities: Array<ActivityInfo>;
  isLoading: boolean;
};
