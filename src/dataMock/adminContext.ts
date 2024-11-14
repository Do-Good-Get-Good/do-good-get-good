import { Role } from "react-native";
import { User } from "../utility/types";
import {
  timeEntriesConfirmedUserID_2,
  timeEntriesConfirmedUserID_3,
  timeEntriesUnconfirmedUserID_2,
  timeEntriesUnconfirmedUserID_3,
} from "./timeEntriesMock";

const userWithUnconfirmedTE_2: User = {
  id: "2",
  adminID: "1",
  firstName: "Admin4",
  lastName: "Adminsson4",
  email: "email@email.com",
  connectedActivities: ["activityID1"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 12,
      activityID: "activityID1",
    },
  ],
  timeEntries: timeEntriesUnconfirmedUserID_2,
  role: "admin" as Role,
  statusActive: true,
};

const userWithUnconfirmedTE_3: User = {
  id: "3",
  adminID: "1",
  firstName: "Johan2",
  lastName: "Johansson2",
  email: "email@email.com",
  connectedActivities: ["activityID1", "activityID2"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 15,
      activityID: "activityID1",
    },
    {
      accumulatedTime: 10,
      activityID: "activityID1",
    },
  ],
  timeEntries: timeEntriesUnconfirmedUserID_3,
  role: "admin" as Role,
  statusActive: true,
};

const userWithConfirmedTE_2: User = {
  id: "2",
  adminID: "1",
  firstName: "Admin4",
  lastName: "Adminsson4",
  email: "email@email.com",
  connectedActivities: ["activityID1"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 12,
      activityID: "activityID1",
    },
  ],
  timeEntries: timeEntriesConfirmedUserID_2,
  role: "user" as Role,
  statusActive: true,
};

const userWithConfirmedTE_3: User = {
  id: "3",
  adminID: "1",
  firstName: "Johan2",
  lastName: "Johansson2",
  email: "email@email.com",
  connectedActivities: ["activityID1", "activityID2"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 15,
      activityID: "activityID1",
    },
    {
      accumulatedTime: 10,
      activityID: "activityID1",
    },
  ],
  timeEntries: timeEntriesConfirmedUserID_3,
  role: "user" as Role,
  statusActive: true,
};

const userInactive_4: User = {
  id: "04",
  adminID: "1",
  firstName: "Johan22",
  lastName: "Johansson22",
  email: "email@email.com",
  connectedActivities: ["activityID1", "activityID2"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 15,
      activityID: "activityID1",
    },
    {
      accumulatedTime: 10,
      activityID: "activityID1",
    },
  ],
  timeEntries: [
    {
      id: "7",
      activityID: "activityID5",
      adminID: "adminID1",
      userID: "04",
      activityTitle: "activityTitle 5",
      date: "2022-09-02",
      statusConfirmed: true,
      time: 2.5,
    },
  ],
  role: "user" as Role,
  statusActive: false,
};

export const mockUsersWithFiveConfirmedTimeEntries: User[] = [
  userWithConfirmedTE_2,
  userWithConfirmedTE_3,
  userInactive_4,
];

export const mockUsersWithUnconfirmedTimeEntries: User[] = [
  userWithUnconfirmedTE_2,
  userWithUnconfirmedTE_3,
];
export const mockAllUsersConnectedToadmin: User[] = [
  {
    id: "2",
    adminID: "admin_id",
    firstName: "Admin4",
    lastName: "Adminsson4",
    email: "email@email.com",
    connectedActivities: ["activityID1"],
    activitiesAndAccumulatedTime: [
      {
        accumulatedTime: 12,
        activityID: "activityID1",
      },
    ],
    role: "user" as Role,
    statusActive: true,
  },
  {
    id: "3",
    adminID: "admin_id",
    firstName: "Johan2",
    lastName: "Johansson2",
    connectedActivities: ["activityID1", "activityID2"],
    activitiesAndAccumulatedTime: [
      {
        accumulatedTime: 15,
        activityID: "activityID1",
      },
      {
        accumulatedTime: 10,
        activityID: "activityID1",
      },
    ],
    role: "user" as Role,
    statusActive: true,
  },
];
