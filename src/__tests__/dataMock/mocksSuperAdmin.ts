import { Role } from "react-native";
import { User, UserObjectForSuperAdmin } from "../../utilily/types";

export const userSuperadminMock: User = {
  id: "1",
  adminID: "adminID",
  firstName: "Super",
  lastName: "Supersson",
  role: "superadmin" as Role,
  statusActive: true,
};

export const userAdminOneMock: User = {
  id: "2",
  adminID: "1",
  firstName: "Admin",
  lastName: "Adminsson",
  role: "admin" as Role,
  statusActive: true,
};

export const userAdminTwoMock: User = {
  id: "3",
  adminID: "2",
  firstName: "Admin2",
  lastName: "Adminsson2",
  role: "admin" as Role,
  statusActive: true,
};

export const userUserOneMock: User = {
  id: "4",
  adminID: "2",
  firstName: "Johan",
  lastName: "Johansson",
  role: "user" as Role,
  statusActive: true,
};

export const userUserTwoMock: User = {
  id: "4",
  adminID: "2",
  firstName: "Johan2",
  lastName: "Johansson2",
  role: "user" as Role,
  statusActive: true,
};

export const usersArrayConnectedToAdminMock: Array<User> = [
  userAdminTwoMock,
  userUserOneMock,
  userUserTwoMock,
];

// export const superAdminObjectMock: UserObjectForSuperAdmin = {
//   adminName: "Admin Adminsson",
//   arrayOfUsersIfAdmin: usersArrayConnectedToAdminMock,
//   user: userSuperadminMock,
// };
export const superAdminObjectMock: UserObjectForSuperAdmin = {
  adminName: "Admin Adminsson",
  arrayOfUsersIfAdmin: [
    {
      id: "3",
      adminID: "2",
      firstName: "Admin2",
      lastName: "Adminsson2",
      role: "admin" as Role,
      statusActive: true,
    },
    {
      id: "4",
      adminID: "2",
      firstName: "Johan",
      lastName: "Johansson",
      role: "user" as Role,
      statusActive: true,
    },
    {
      id: "4",
      adminID: "2",
      firstName: "Johan2",
      lastName: "Johansson2",
      role: "user" as Role,
      statusActive: true,
    },
  ],
  user: {
    id: "1",
    adminID: "adminID",
    firstName: "Super",
    lastName: "Supersson",
    role: "superadmin" as Role,
    statusActive: true,
  },
};
