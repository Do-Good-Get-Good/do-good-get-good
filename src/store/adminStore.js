import { makeAutoObservable, runInAction } from "mobx";

import auth from "@react-native-firebase/auth";

import {
  getAllUsersConnectedToAdmin,
  getUsersFiveNewestTimeEntries,
} from "../firebase-functions/get";
import { updateUserInfoFromAdminScreen } from "../firebase-functions/update";

const filterUsersByActiveStatus = (users, status) => {
  return users.filter((user) => {
    if (user.statusActive === status)
      return {
        ...user,
      };
  });
};

const openSelectedUser = (users, selectedUser) => {
  let userIndex = users.findIndex(
    (user) => user.userID === selectedUser.userID,
  );
  users[userIndex].isOpen = !users[userIndex].isOpen;

  return users;
};

const updateUser = (users, newInfo) => {
  let userIndex = users.findIndex((user) => user.userID === newInfo.userID);
  users[userIndex].firstName = newInfo.userFirstName;
  users[userIndex].lastName = newInfo.userLastName;
  users[userIndex].statusActive = newInfo.statusActive;

  return users;
};

// const updateUserTimeEntries = (users, userId, timeEntries) => {
//   let userIndex = users.findIndex((user) => user.userID === userId);
//   users[userIndex].timeEntries = timeEntries;

//   return users;
// };

const connectActivityToUser = (users, userId, activityId) => {
  return users.map((user) => {
    if (user.userID !== userId) return user;

    let newActivity = {
      accumulated_time: 0,
      activity_id: activityId,
    };

    let newActivitiesArr = [...user.activitiesAndAccumulatedTime, newActivity];
    let newConnectedActivitiesArr = [...user.connectedActivities, activityId];
    return {
      ...user,
      activitiesAndAccumulatedTime: newActivitiesArr,
      connectedActivities: newConnectedActivitiesArr,
    };
  });
};

const disconnectActivityFromUser = (users, userId, activityId) => {
  return users.map((user) => {
    if (user.userID !== userId) return user;

    let newArr = user.connectedActivities.filter((id) => id !== activityId);
    return {
      ...user,
      connectedActivities: newArr,
    };
  });
};

// const updateUserTimeObject = (users, userId, updatedTimeObject) => {
//   return users.map((user) => {
//     if (user.userID !== userId) return user;

//     return {
//       ...user,
//       timeObject: updatedTimeObject,
//     };
//   });
// };

class AdminStore {
  constructor() {
    this.allUsers = [];
    this.users = [];
    this.fetchUsers = true;
    this.loading = true;
    this.updatedUser = false;
    this.updatedUserInfo = {};
    makeAutoObservable(this);
  }

  async fetchAllUsers(usersConnectedToadmin) {
    if (!this.fetchUsers) return;
    for (const user of usersConnectedToadmin) {
      try {
        let response = await getUsersFiveNewestTimeEntries(user.id);
        let userInfo = {
          activitiesAndAccumulatedTime: user.activitiesAndAccumulatedTime,
          adminID: user.adminID,
          connectedActivities: user.connectedActivities,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          timeEntries: response ?? [],
          isOpen: false,
          statusActive: user.statusActive,
          userID: user.id,
          timeObject: {
            paidTime: user.totalHoursYear,
            currentForMonth: user.totalHoursMonth,
          },
        };
        this.addNewUser(userInfo);
        runInAction(() => {
          if (this.allUsers.length === usersConnectedToadmin.length)
            this.loading = false;
        });
      } catch (error) {
        console.log("MyUsers ", error);
      }
    }
    this.fetchUsers = false;
  }

  addNewUser(user) {
    this.allUsers.push(user);
    this.filterUsersByActiveStatus(true);
  }

  filterUsersByActiveStatus(bool) {
    this.users = filterUsersByActiveStatus(this.allUsers, bool);
    this.sortUsersAlphabetically(this.users);
  }

  sortUsersAlphabetically(userArray) {
    userArray.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  openSelectedUser(user) {
    this.users = openSelectedUser(this.users, user);
  }

  updateUser(newInfo) {
    updateUserInfoFromAdminScreen(newInfo);
    this.allUsers = updateUser(this.allUsers, newInfo);
    this.users = updateUser(this.users, newInfo);
    this.updatedUserInfo = newInfo;
  }

  // updateUserTimeEntries(userIds) {
  //   userIds.map(async (userId) => {
  //     try {
  //       let timeEntryData = await getUsersFiveNewestTimeEntries(userId);
  //       runInAction(() => {
  //         this.allUsers = updateUserTimeEntries(
  //           this.allUsers,
  //           userId,
  //           timeEntryData,
  //         );
  //         this.users = updateUserTimeEntries(this.users, userId, timeEntryData);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }

  // updateUserTimeObject(userId, timeObject) {
  //   this.allUsers = updateUserTimeObject(this.allUsers, userId, timeObject);
  //   this.users = updateUserTimeObject(this.users, userId, timeObject);
  // }

  connectActivityToUser(userId, activityId) {
    this.allUsers = connectActivityToUser(this.allUsers, userId, activityId);
  }

  disconnectActivityFromUser(userId, activityId) {
    this.allUsers = disconnectActivityFromUser(
      this.allUsers,
      userId,
      activityId,
    );
  }

  resetStore() {
    this.allUsers = [];
    this.users = [];
    this.fetchUsers = true;
    this.loading = true;
    this.updatedUser = false;
    this.updatedUserInfo = {};
  }
}

const adminStore = new AdminStore();
export default adminStore;
