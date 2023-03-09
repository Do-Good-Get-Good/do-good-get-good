import "react-native";
import React from "react";
import {
  render,
  waitFor,
  cleanup,
  fireEvent,
} from "@testing-library/react-native";
import ManageUsers from "../../components/ManageUsers";
import adminStore from "../../store/adminStore";

jest.useFakeTimers();

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("@rneui/base/dist/CheckBox/CheckBox", () => ({
  CheckBox: jest.fn(),
}));

let mockOtherUserData = [
  {
    data: () => ({
      first_name: "Other",
      last_name: "User",
    }),
  },
  {
    data: () => ({
      first_name: "Other",
      last_name: "User 2",
    }),
  },
];

jest.mock("@react-native-firebase/firestore", () => () => ({
  collection: jest.fn(() => ({
    where: jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(() => ({
          empty: false,
          docs: mockOtherUserData,
        })),
      })),
    })),
  })),
}));

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
    connectedActivities: ["1234"],
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
  it("Can render users connected and correct other users when no other users are connected", () => {
    const { getByTestId, getAllByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activity_id"}
      />,
    );
    waitFor(() => {});
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

    expect(getAllByTestId("test.otherUsersView").length).toBe(1);

    expect(getByTestId("test.noOtherUsers").children[0]).toEqual(
      "Inga andra användare är kopplade till den här aktiviteten!",
    );
  });

  it("Can press on save button", () => {
    const { getByText } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activity_id"}
      />,
    );

    const saveButton = getByText("Spara");
    expect(saveButton);

    fireEvent.press(saveButton);
  });
});
