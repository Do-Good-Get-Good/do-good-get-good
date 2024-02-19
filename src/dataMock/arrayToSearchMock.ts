
import { Role } from "../utilily/enums";
import { Activity, User } from "../utilily/types";

export const mockUser1 : User={
    id: "user1",
    activitiesAndAccumulatedTime: [{  accumulatedTime: 6,
        activityID: "activity1"}],
    adminID: "admin1",
    connectedActivities: ["hghsdfg"],
    firstName: "John",
    lastName: "Andersson",
    role:Role .user,
    statusActive: true,
    totalConfirmedHours: 0,
    totalHoursMonth: 0,
    totalHoursYear: 0
}

export const mockUser2 : User={
    id: "user2",
    activitiesAndAccumulatedTime: [{  accumulatedTime: 6,
        activityID: "activity2"}],
    adminID: "admin2",
    connectedActivities: ["hghsdfg"],
    firstName: "Erik",
    lastName: "Andersson",
    role:Role .user,
    statusActive: true,
    totalConfirmedHours: 0,
    totalHoursMonth: 0,
    totalHoursYear: 0
}
export const mockUserArray: User[]=[mockUser1,mockUser2]

 const activity1:Activity = {
    id: "activity1",
    title: "help dogs",
    active: true,
    city: "Gothenburg",
    place: "Doghouse",
    description: "Spend time with pet dogs",
    photo: "gdasdfs",
    popular: true,
    imageUrl: ["ashdgh"]
  };
  const activity2:Activity = {
    id: "activity2",
    title: "help cats",
    active: true,
    city: "Gothenburg",
    place: "Cathouse",
    description: "Spend time with pet cats",
    photo: "gdasasfg",
    popular: true,
    imageUrl: ["advghsdf"]
  };
  export const mockActivityArray: Activity[]=[activity1,activity2]

