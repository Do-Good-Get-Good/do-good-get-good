export type Activity = {
  id: string;
  title: string;
  active?: boolean;
  city: string;
  place?: string;
  description?: string;
  photo: string;
  popular?: boolean;
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
  userID: User["id"];
  activityTitle: string;
  photo?: string;
  city?: string;
  date: Date | string;
  statusConfirmed: boolean;
  time: number;
};

export type ActivitiesAndAccumulatedTime = {
  accumulatedTime: number;
  activityID: Activity["id"];
};

export type User = {
  id: string;
  activitiesAndAccumulatedTime: Array<ActivitiesAndAccumulatedTime>;
  adminID?: User["id"];
  connectedActivities: Array<Activity["id"]>;
  firstName: string;
  lastName: string;
  email?: string;
  role?: string;
  timeEntries?: Array<TimeEntry>;

  //// TODO: (ckeck what is this checked)
  checked?: boolean;
  timeObject?: {};
  isOpen?: boolean;
  statusActive: boolean;
  totalConfirmedHours?: number;
  totalHoursMonth?: number;
  totalHoursYear?: number;
  connectedUsers?: Array<User>;
};

export type UserObjectForSuperAdmin = {
  adminName: string;
  arrayOfUsersIfAdmin?: Array<User>;
  user: User;
};

export type AdminsNameAndID = {
  id: User["id"];
  fullName: string;
};

export type UserAndUnapprovedTimeEntriesType = {
  adminID: User["adminID"];
  userID: User["id"];
  adminFirstName: User["firstName"];
  adminLastName: User["lastName"];
  userFirstName: User["firstName"];
  userLastName: User["lastName"];
  unapprovedTimeEntries: Array<TimeEntry>;
};

export type PostEmoji = {
  emojiName: string;
  userID: string;
};

export type Comment = {
  id: string;
  comment: string;
  userID: User["id"];
};

export type UserPost = {
  id: string;
  userID: User["id"];
  userFirstName: User["firstName"];
  userLastName: User["lastName"];
  activityID: Activity["id"];
  activityCity: Activity["city"];
  activityTitle: Activity["title"];
  changed: boolean;
  date: Date;
  description: string;
  emoji: Array<PostEmoji>;
  imageURL: string;
  comments?: Array<Comment>;
};

export type ChatMessage = {
  id: string;
  userFirstName: User["firstName"];
  userID: User["id"];
  userLastName: User["lastName"];
  message: string;
};
