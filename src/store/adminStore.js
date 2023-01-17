import { makeAutoObservable, runInAction } from "mobx";

import auth from "@react-native-firebase/auth";

import {
  getAllUsersConnectedToAdmin,
  getUsersFiveNewestTimeEntries,
} from "../firebase-functions/get";

const filterUsersByActiveStatus = (users, status) => {
  return users.filter((user) => user.statusActive === status);
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

class AdminStore {
  constructor() {
    this.allUsers = [];
    this.users = [];
    this.fetchUsers = true;
    this.loading = true;
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
          firstName: user.first_name,
          lastName: user.last_name,
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
        this.showActiveUsers();
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
  }

  showInactiveUsers() {
    this.users = filterUsersByActiveStatus(this.allUsers, false);
  }

  showActiveUsers() {
    this.users = filterUsersByActiveStatus(this.allUsers, true);
  }

  openSelectedUser(pressedUser) {
    this.users = openSelectedUser(this.users, pressedUser);
  }
}

const adminStore = new AdminStore();
export default adminStore;
