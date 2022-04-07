import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ManageUsers from "../components/ManageUsers";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("react-native-elements/dist/checkbox/Checkbox", () => () => {
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

// beforeEach(() => {
//   jest.useFakeTimers();
// });

describe("Testing ManageUsers component", () => {
  it("can find the header text", () => {
    const { getByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activity_id"}
      />
    );
    waitFor(() => {
      expect(getByTestId("test.modalHeader").children[0]).toEqual(
        "Lägg till eller ta bort:"
      );
    });
  });

  it("can find connected users", () => {
    const { getByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activity_id"}
      />
    );
    waitFor(() => {
      expect(getByTestId("test.userView").length).toBe(2);
      expect(getByTestId("test.userFullName0")).toEqual("Test 1");
      expect(getByTestId("test.userFullName1")).toEqual("Test 2");
    });
  });
});
