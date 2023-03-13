import "react-native";
import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react-native";
import ManageUsers from "../../components/ManageUsers";
import adminStore from "../../store/adminStore";

import {
  connectNewActivityToUser,
  removeActivityFromUser,
  updateConnectedUsersOnActivity,
} from "../../firebase-functions/update";
import { getAllUsersNotConnectedToAdmin } from "../../firebase-functions/get";

import { when } from "mobx";

jest.useFakeTimers();

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("@rneui/base/dist/CheckBox/CheckBox", () => ({
  CheckBox: jest.fn(),
}));

jest.mock("../../firebase-functions/get", () => ({
  getAllUsersNotConnectedToAdmin: jest.fn(),
}));

jest.mock("../../firebase-functions/update", () => ({
  connectNewActivityToUser: jest.fn(),
  removeActivityFromUser: jest.fn(),
  updateConnectedUsersOnActivity: jest.fn(),
}));

let mockOtherUserData = [
  {
    id: 987,
    fullName: "Other user",
    connectedActivities: ["1234"],
  },
  {
    id: 988,
    fullName: "Other2 user2",
    connectedActivities: ["1234"],
  },
];

jest.mock("@react-native-firebase/auth", () => () => ({
  currentUser: {
    uid: "admin_id",
  },
}));

afterEach(() => {
  cleanup();
});

describe("Testing ManageUsers component", () => {
  adminStore.addNewUser({
    activitiesAndAccumulatedTime: [],
    adminID: "123",
    connectedActivities: ["1234"],
    firstName: "Test1",
    lastName: "lastname1",
    role: "user",
    timeEntries: [],
    isOpen: false,
    statusActive: true,
    userID: "012",
    timeObject: {
      paidTime: 0,
      currentForMonth: 0,
    },
  });
  adminStore.addNewUser({
    activitiesAndAccumulatedTime: [],
    adminID: "123",
    connectedActivities: [],
    firstName: "Test2",
    lastName: "lastname2",
    role: "user",
    timeEntries: [],
    isOpen: false,
    statusActive: true,
    userID: "0124",
    timeObject: {
      paidTime: 0,
      currentForMonth: 0,
    },
  });
  it("Can render users connected and correct other users", async () => {
    getAllUsersNotConnectedToAdmin.mockReturnValue(mockOtherUserData);

    const { getByTestId, getAllByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activity_id"}
      />,
    );

    await when(() => adminStore.allUsers.length === 2);

    expect(getByTestId("test.modalHeader").children[0]).toEqual(
      "Lägg till eller ta bort:",
    );
    expect(getByTestId("test.myUsersHeader").children[0]).toEqual(
      "Mina användare",
    );
    expect(getAllByTestId("test.userView").length).toBe(2);
    expect(getByTestId("test.userFullName0").children[0]).toEqual(
      "Test1 lastname1",
    );
    expect(getByTestId("test.userFullName1").children[0]).toEqual(
      "Test2 lastname2",
    );
    expect(getByTestId("test.otherUsersHeader").children[0]).toEqual(
      "Andra användare",
    );
    expect(getAllByTestId("test.otherUsersView").length).toBe(2);
    expect(getByTestId("test.otherUserFullName0").children[0]).toEqual(
      mockOtherUserData[0].fullName,
    );
    expect(getByTestId("test.otherUserFullName1").children[0]).toEqual(
      mockOtherUserData[1].fullName,
    );
  });

  it("Can press on save button", async () => {
    const activityId = "1234";
    const connectedUser1 = adminStore.allUsers[0].userID;

    const { getByText } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={activityId}
      />,
    );

    const saveButton = getByText("Spara");
    expect(saveButton);

    await act(() => {
      fireEvent.press(saveButton);
    });

    expect(connectNewActivityToUser).toHaveBeenCalledTimes(1);
    expect(removeActivityFromUser).toHaveBeenCalledTimes(1);
    expect(updateConnectedUsersOnActivity).toHaveBeenCalledWith(activityId, [
      connectedUser1,
    ]);
  });
});
