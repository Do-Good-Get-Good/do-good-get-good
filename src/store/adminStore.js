import { makeAutoObservable, runInAction } from "mobx";

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

  // connectActivityToUser(userId, activityId) {
  //   this.allUsers = connectActivityToUser(this.allUsers, userId, activityId);
  // }

  // disconnectActivityFromUser(userId, activityId) {
  //   this.allUsers = disconnectActivityFromUser(
  //     this.allUsers,
  //     userId,
  //     activityId,
  //   );
  // }

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
