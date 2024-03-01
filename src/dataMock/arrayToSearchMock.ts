import { Role } from "../utility/enums";
import { Activity, User } from "../utility/types";

export const user1: User = {
  id: "user1",
  activitiesAndAccumulatedTime: [
    { accumulatedTime: 6, activityID: "activity1" },
  ],
  adminID: "admin1",
  connectedActivities: ["hghsdfg"],
  firstName: "John",
  lastName: "Andersson",
  role: Role.user,
  statusActive: true,
  totalConfirmedHours: 0,
  totalHoursMonth: 0,
  totalHoursYear: 0,
};

export const user2: User = {
  id: "user2",
  activitiesAndAccumulatedTime: [
    { accumulatedTime: 6, activityID: "activity2" },
  ],
  adminID: "admin2",
  connectedActivities: ["hghsdfg"],
  firstName: "Erik",
  lastName: "Andersson",
  role: Role.user,
  statusActive: true,
  totalConfirmedHours: 0,
  totalHoursMonth: 0,
  totalHoursYear: 0,
};
export const userArray: User[] = [user1, user2];

const activity1: Activity = {
  id: "activity1",
  title: "help dogs",
  active: true,
  city: "Malmo",
  place: "Petcare",
  description: "Spend time with pet dogs",
  photo: "gdasdfs",
  popular: true,
  imageUrl: ["ashdgh"],
};
const activity2: Activity = {
  id: "activity2",
  title: "help cats",
  active: true,
  city: "Gothenburg",
  place: "Petcare",
  description: "Spend time with pet cats",
  photo: "gdasasfg",
  popular: true,
  imageUrl: ["advghsdf"],
};
const activity3: Activity = {
  id: "activity3",
  title: "SocialMarathon",
  active: true,
  city: "Gothenburg",
  place: "Help to pets",
  description: "Spend time with pet cats",
  photo: "gdasasfg",
  popular: true,
  imageUrl: ["advghsdf"],
};
export const activityArray: Activity[] = [activity1, activity2, activity3];
