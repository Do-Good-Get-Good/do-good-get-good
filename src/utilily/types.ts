import { ActivityImages } from "./enums";

export type Activity = {
  id: string;
  title: string;
  active?: boolean;
  city: string;
  place?: string;
  description?: string;
  photo: ActivityImages;
  popular?: string;
  imageUrl?: string;
};

export type Concept = {
  id?: string;
  body: string;
  heading: string;
  orderID: number;
};

export type TimeEntry = {
  id: string;
  activityID: Activity["id"];
  adminID: User["id"];
  userID?: User["id"];
  title: string;
  photo?: string;
  city?: string;
  date: Date;
  statusConfirmed?: boolean;
  time: number;
};

export type ActivitiesAndAccumulatedTime = {
  accumulatedTime: number;
  activityID: Activity["id"];
};

export type User = {
  id: string;
  activitiesAndAccumulatedTime?: Array<ActivitiesAndAccumulatedTime>;
  adminID?: User["id"];
  connectedActivities?: Array<Activity["id"]>;
  firstName: string;
  lastName: string;
  email?: string;
  role?: string;
  timeEntries?: TimeEntry | Array<TimeEntry>;
  //// TODO: (ckeck what is this checked)
  checked?: boolean;
  timeObject?: {};
  // timeEntries?: Array<TimeEntry>;
  isOpen?: boolean;
  statusActive?: boolean;
  totalConfirmedHours?: number;
  totalHoursMonth?: number;
  totalHoursYear?: number;
};

// export type SortByNotConnectedUsersToAdmin = {
//   id: User["id"];
//   userFullName: User["firstName" | "lastName"];
//   connectedActivities: Array<Activity["id"]>;
// };

// export type SortByUsersConnectedToAdmin ={
//   id: User["id"];

// }
