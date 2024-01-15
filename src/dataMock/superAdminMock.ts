import { Role } from "react-native";
import { User, UserObjectForSuperAdmin } from "../utilily/types";

const userSuperadminMock: User = {
  id: "1",
  adminID: "adminID",
  firstName: "Super",
  lastName: "Supersson",
  role: "superadmin" as Role,
  statusActive: true,
};

const userAdminOneMock: User = {
  id: "2",
  adminID: "1",
  firstName: "Admin",
  lastName: "Adminsson",
  role: "admin" as Role,
  statusActive: true,
};

const userAdminTwoMock: User = {
  id: "3",
  adminID: "2",
  firstName: "Admin2",
  lastName: "Adminsson2",
  role: "admin" as Role,
  statusActive: true,
};

const userUserOneMock: User = {
  id: "4",
  adminID: "2",
  firstName: "Johan",
  lastName: "Johansson",
  role: "user" as Role,
  statusActive: true,
};

const userUserTwoMock: User = {
  id: "5",
  adminID: "2",
  firstName: "Johan2",
  lastName: "Johansson2",
  role: "user" as Role,
  statusActive: true,
};

const userSuperadminTwoMock: User = {
  id: "6",
  adminID: "2",
  firstName: "Super2",
  lastName: "Supersson2",
  role: "superadmin" as Role,
  statusActive: true,
};

const userSuperadminThreeMock: User = {
  id: "7",
  adminID: "6",
  firstName: "Super3",
  lastName: "Supersson3",
  role: "superadmin" as Role,
  statusActive: false,
};

const usersArrayConnectedToAdminMock: Array<User> = [
  userAdminTwoMock,
  userUserOneMock,
  userUserTwoMock,
];

export const mockSelectedUser: UserObjectForSuperAdmin = {
  adminName: "Admin Adminsson",
  arrayOfUsersIfAdmin: usersArrayConnectedToAdminMock,
  user: userSuperadminMock,
};

export const mockAllAdminsAnsSuperAdmins = [
  userSuperadminMock,
  userAdminOneMock,
  userAdminTwoMock,
  userSuperadminTwoMock,
  userSuperadminThreeMock,
];
