import { User } from "./types";

export const roleTitles = {
  user: "User",
  admin: "Admin",
  superadmin: "Super admin",
};

// export function superAdminMakeUserObject(
//   data: UserObjectForSuperAdmin,
//   role?: Role,
//   adminID?: User["adminID"],
//   statusActive?: User["statusActive"],
// ) {
//   let tempObj: UserObjectForSuperAdmin = {
//     adminName: data.adminName,
//     arrayOfUsersIfAdmin: data.arrayOfUsersIfAdmin,
//     user: {
//       activitiesAndAccumulatedTime: data.user.activitiesAndAccumulatedTime,
//       adminID: adminID ?? data.user.adminID,
//       connectedActivities: data.user.connectedActivities,
//       id: data.user.id,
//       firstName: data.user.firstName,
//       lastName: data.user.lastName,
//       role: role ?? data.user.role,
//       statusActive: statusActive ?? data.user.statusActive,
//       totalConfirmedHours: data.user.totalConfirmedHours,
//       totalHoursMonth: data.user.totalHoursMonth,
//       totalHoursYear: data.user.totalHoursYear,
//     },
//   };

//   return tempObj;
// }
