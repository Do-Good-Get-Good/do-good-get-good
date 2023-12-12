export enum ActivityImages {
  handsHeartDEFAULT = "symbol_hands_heart-DEFAULT",
  earth = "symbol_earth",
  blood = "symbol_blood",
  hund = "symbol_hund",
  sport = "symbol_sport",
}

export type Activity = {
  id: string;
  title: string;
  active?: boolean;
  city: string;
  place?: string;
  description?: string;
  photo: ActivityImages;
  popular?: string;
};

export type Concept = {
  id?: string;
  body: string;
  heading: string;
  orderID: number;
};

export type TimeEntrie = {
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

export type AtivitiesAndAccumulatedTime = {
  accumulatedTime: number;
  activityID: Activity["id"];
};

export type User = {
  id: string;
  activitiesAndAccumulatedTime?: Array<AtivitiesAndAccumulatedTime>;
  adminID?: User["id"];
  connectedActivities?: Array<Activity["id"]>;
  firstName: string;
  lastName: string;
  role?: string;
  timeEntries?: TimeEntrie | Array<TimeEntrie>;
  //// TODO: (ckeck what is this checked)
  checked?: boolean;
  timeObject?: {};
  // timeEntries?: Array<TimeEntrie>;
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
