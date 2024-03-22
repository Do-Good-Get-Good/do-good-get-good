import { Role } from "react-native";
import { User, UserObjectForSuperAdmin } from "../utility/types";

export const userSuperadminMock: User = {
  id: "1",
  adminID: "adminID",
  firstName: "Super",
  lastName: "Supersson",
  connectedActivities: ["activitiID"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 4,
      activityID: "activitiID",
    },
  ],
  role: "superadmin" as Role,
  statusActive: true,
};

const userAdminOneMock: User = {
  id: "2",
  adminID: "1",
  firstName: "Admin4",
  lastName: "Adminsson4",
  connectedActivities: ["activitiID"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 4,
      activityID: "activitiID",
    },
  ],
  role: "admin" as Role,
  statusActive: true,
};

const userAdminTwoMock: User = {
  id: "3",
  adminID: "1",
  firstName: "Admin2",
  lastName: "Adminsson2",
  connectedActivities: ["activitiID"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 4,
      activityID: "activitiID",
    },
  ],
  role: "admin" as Role,
  statusActive: true,
};

const userUserOneMock: User = {
  id: "4",
  adminID: "1",
  firstName: "Johan",
  lastName: "Johansson",
  connectedActivities: ["activitiID"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 4,
      activityID: "activitiID",
    },
  ],
  role: "user" as Role,
  statusActive: true,
};

const userUserTwoMock: User = {
  id: "5",
  adminID: "2",
  firstName: "Johan2",
  lastName: "Johansson2",
  connectedActivities: ["activitiID"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 4,
      activityID: "activitiID",
    },
  ],
  role: "user" as Role,
  statusActive: true,
};

const userSuperadminTwoMock: User = {
  id: "6",
  adminID: "2",
  firstName: "Super2",
  lastName: "Supersson2",
  connectedActivities: ["activitiID"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 4,
      activityID: "activitiID",
    },
  ],
  role: "superadmin" as Role,
  statusActive: true,
};

const userSuperadminThreeMock: User = {
  id: "7",
  adminID: "6",
  firstName: "Super3",
  lastName: "Supersson3",
  connectedActivities: ["activitiID"],
  activitiesAndAccumulatedTime: [
    {
      accumulatedTime: 4,
      activityID: "activitiID",
    },
  ],
  role: "superadmin" as Role,
  statusActive: false,
};

const usersArrayConnectedToAdminMock: Array<User> = [
  userAdminOneMock,
  userAdminTwoMock,
  userUserOneMock,
];

export const mockSelectedUser: UserObjectForSuperAdmin = {
  adminName: "Admin Adminsson",
  arrayOfUsersIfAdmin: usersArrayConnectedToAdminMock,
  user: userSuperadminMock,
};

export const mockAllAdminsAndSuperAdmins = [
  userSuperadminMock,
  userAdminOneMock,
  userAdminTwoMock,
  userSuperadminTwoMock,
  userSuperadminThreeMock,
];
