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

const openSelectedUser = (users, pressedUser) => {
  return users.map((user) => {
    let pressedUserFullName = `${pressedUser.firstName} ${pressedUser.lastName}`;
    let fullName = `${user.firstName} ${user.lastName}`;

    return {
      ...user,
      isOpen: fullName === pressedUserFullName ? !user.isOpen : user.isOpen,
    };
  });
};

const updateUser = (users, newInfo) => {
  return users.map((user) => {
    if (user.userID !== newInfo.userID) return user;

    return {
      ...user,
      firstName: newInfo.userFirstName,
      lastName: newInfo.userLastName,
      statusActive: newInfo.statusActive,
    };
  });
};

const updateUserTimeEntries = (users, userId, timeEntries) => {
  return users.map((user) => {
    if (user.userID !== userId) return user;

    return {
      ...user,
      timeEntries,
    };
  });
};

const addNewActivityToUser = (users, userId, activityId) => {
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

const removeActivityFromUser = (users, userId, activityId) => {
  return users.map((user) => {
    if (user.userID !== userId) return user;

    let newArr = user.connectedActivities.filter((id) => id !== activityId);
    return {
      ...user,
      connectedActivities: newArr,
    };
  });
};

const updateUserTimeObject = (users, userId, updatedTimeObject) => {
  return users.map((user) => {
    if (user.userID !== userId) return user;

    return {
      ...user,
      timeObject: updatedTimeObject,
    };
  });
};

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

  async fetchAllUsers() {
    if (!this.fetchUsers) return;
    console.log("FETCHING");
    let userArr = await getAllUsersConnectedToAdmin(auth().currentUser.uid);
    userArr.map(async (user, index) => {
      try {
        let response = await getUsersFiveNewestTimeEntries(user.id);
        let userInfo = {
          activitiesAndAccumulatedTime: user.activities_and_accumulated_time,
          adminID: user.admin_id,
          connectedActivities: user.connected_activities,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          timeEntries: response,
          isOpen: false,
          statusActive: user.status_active,
          userID: user.id,
          timeObject: {
            paidTime: user.total_confirmed_hours,
            timeForYear: user.total_hours_year,
            currentForMonth: user.total_hours_month,
          },
        };
        this.addNewUser(userInfo);
        runInAction(() => {
          if (this.allUsers.length === userArr.length) this.loading = false;
        });
      } catch (error) {
        console.log("MyUsers ", error);
      }
    });
    this.fetchUsers = false;
  }

  addNewUser(user) {
    this.allUsers.push(user);
    this.filterUsers(true);
  }

  filterUsers(bool) {
    this.users = filterUsersByActiveStatus(this.allUsers, bool);
    this.sortUsersAlphabetically(this.users);
  }

  sortUsersAlphabetically(userArray) {
    userArray.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  openSelectedUser(pressedUser) {
    this.users = openSelectedUser(this.users, pressedUser);
  }

  updateUser(newInfo) {
    updateUserInfoFromAdminScreen(newInfo);
    this.allUsers = updateUser(this.allUsers, newInfo);
    this.users = updateUser(this.users, newInfo);
    this.updatedUserInfo = newInfo;
  }

  updateUserTimeEntries(userIds) {
    userIds.map(async (userId) => {
      try {
        let timeEntryData = await getUsersFiveNewestTimeEntries(userId);
        runInAction(() => {
          this.allUsers = updateUserTimeEntries(
            this.allUsers,
            userId,
            timeEntryData
          );
          this.users = updateUserTimeEntries(this.users, userId, timeEntryData);
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  updateUserTimeObject(userId, timeObject) {
    this.allUsers = updateUserTimeObject(this.allUsers, userId, timeObject);
    this.users = updateUserTimeObject(this.users, userId, timeObject);
  }

  addNewActivityToUser(userId, activityId) {
    this.allUsers = addNewActivityToUser(this.allUsers, userId, activityId);
  }

  removeActivityFromUser(userId, activityId) {
    this.allUsers = removeActivityFromUser(this.allUsers, userId, activityId);
  }
}

const adminStore = new AdminStore();
export default adminStore;
