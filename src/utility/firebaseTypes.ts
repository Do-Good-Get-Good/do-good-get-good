import { ActivitiesAndAccumulatedTime, Activity, User } from "./types";

// This represents the entire object that we receive from firebase.
// Not all objects in the model is used, but felt better to handle them, then to ignore them.
export type UserClaims = {
  admin?: boolean;
  superadmin?: boolean;
  user?: boolean;

  aud?: string;
  auth_time?: number;
  email?: string;
  email_verified?: boolean;
  exp?: number;
  firebase?: { identities: { email: [string] }; sign_in_provider: string };
  iat?: number;
  iss?: string;
  sub?: string;
  user_id?: User["id"];
};

export type FirebaseActivityType = {
  active_status: Activity["active"];
  activity_city: Activity["city"];
  activity_description: Activity["description"];
  activity_photo: Activity["photo"];
  image_url: Activity["imageUrl"];
  activity_place: Activity["place"];
  activity_title: Activity["title"];
  tg_favorite: Activity["popular"];
};

type FirebaseActivitiesAndAccumulatedTime = {
  accumulated_time: ActivitiesAndAccumulatedTime["accumulatedTime"];
  activity_id: ActivitiesAndAccumulatedTime["activityID"];
};

export type FirebaseUserType = {
  id: User["id"];
  activities_and_accumulated_time: FirebaseActivitiesAndAccumulatedTime[];
  connected_activities: User["connectedActivities"];
  role: User["role"];
  status_active: User["statusActive"];
  admin_id: User["adminID"];
  created_by: User["adminID"];
  total_hours_year: User["totalHoursYear"];
  total_hours_month: User["totalHoursMonth"];
  total_confirmed_hours: User["totalConfirmedHours"];
  first_name: User["firstName"];
  last_name: User["lastName"];
};
