import { UserAndUnapprovedTimeEntriesType } from "../utilily/types";
[
  {
    activityID: "4apGzTf4OrnkfIqSqKQH",
    activityTitle: "Test",
    adminID: "VZyL8bD0RxXp5UVFpSubX8r4a2x1",
    date: "2022-05-27",
    id: "gVtGeVA7xAcsYEgn1t2s",
    statusConfirmed: false,
    time: 0.5,
    userID: "mD5yxPkXakTnrTzkQyPVdFTzqDI3",
  },
];

const userOne: UserAndUnapprovedTimeEntriesType = {
  unapprovedTimeEntries: [
    {
      id: " unapprovedTimeEntries1",
      activityID: "activityID1",
      adminID: "adminID1",
      userID: "userID1",
      activityTitle: "Activity Title 1",
      date: "2022-05-27",
      statusConfirmed: false,
      time: 0.5,
    },
  ],
  adminFirstName: "Admin1",
  adminLastName: "Adminsson1",
  userFirstName: "User1",
  userLastName: "Usersson1",
};
const userTwo: UserAndUnapprovedTimeEntriesType = {
  unapprovedTimeEntries: [
    {
      id: " unapprovedTimeEntries2",
      activityID: "activityID2",
      adminID: "adminID2",
      userID: "userID2",
      activityTitle: "Activity Title 2",
      date: "2022-07-10",
      statusConfirmed: false,
      time: 1.5,
    },
  ],
  adminFirstName: "Admin2",
  adminLastName: "Adminsson2",
  userFirstName: "User2",
  userLastName: "Usersson2",
};

export const mockAllUsersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[] =
  [userOne, userTwo];
