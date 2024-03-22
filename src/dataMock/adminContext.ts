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

const userAnactive_4: User = {
  id: "04",
  adminID: "1",
  firstName: "Johan22",
  lastName: "Johansson22",
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
  timeEntries: [],
  role: "user" as Role,
  statusActive: false,
};

export const mockUsersWithFiveConfirmedTimeEntries: User[] = [
  userWithUnconfirmedTE_2,
  userWithUnconfirmedTE_3,
  userAnactive_4,
];

export const mockUsersWithUnconfirmedTimeEntries: User[] = [
  userWithConfirmedTE_2,
  userWithConfirmedTE_3,
];
export const mockAllUsersConnectedToadmin: User[] = [
  {
    id: "2",
    adminID: "admin_id",
    firstName: "Admin4",
    lastName: "Adminsson4",
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
