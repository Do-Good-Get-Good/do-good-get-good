import "react-native";
import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react-native";
import ManageUsers from "../components/ManageUsers";

jest.useFakeTimers();

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("react-native-elements/dist/checkbox/CheckBox", () => () => {
  return <fakeCheckbox />;
});

jest.mock("../context/AdminHomePageContext", () => ({
  useAdminHomePageFunction: () => ({
    userData: [
      {
        activities_and_accumulated_time: [
          {
            accumulated_time: 2.5,
            activity_id: "activity_id",
          },
        ],
        connected_activities: ["activity_id"],
        admin_id: "admin_id",
        first_name: "Test",
        last_name: "1",
        id: "user_id",
        role: "user",
        status_active: true,
      },
      {
        activities_and_accumulated_time: [
          {
            accumulated_time: 2.5,
            activity_id: "activity_id",
          },
        ],
        connected_activities: ["activity_id"],
        admin_id: "admin_id2",
        first_name: "Test",
        last_name: "2",
        id: "user_id2",
        role: "user",
        status_active: true,
      },
    ],
  }),
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
  it("Can render users connected and correct other users when no other users are connected", () => {
    const { getByTestId, getAllByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activity_id"}
      />
    );
    waitFor(() => {});
    expect(getByTestId("test.modalHeader").children[0]).toEqual(
      "Lägg till eller ta bort:"
    );

    expect(getByTestId("test.myUsersHeader").children[0]).toEqual(
      "Mina användare"
    );

    expect(getAllByTestId("test.userView").length).toBe(2);
    expect(getByTestId("test.userFullName0").children[0]).toEqual("Test 1");
    expect(getByTestId("test.userFullName1").children[0]).toEqual("Test 2");

    expect(getByTestId("test.otherUsersHeader").children[0]).toEqual(
      "Andra användare"
    );

    expect(getAllByTestId("test.otherUsersView").length).toBe(1);

    expect(getByTestId("test.noOtherUsers").children[0]).toEqual(
      "Inga andra användare är kopplade till den här aktiviteten!"
    );
  });
});
