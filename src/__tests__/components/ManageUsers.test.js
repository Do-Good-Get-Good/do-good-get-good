import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  act,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import ManageUsers from "../../components/ManageUsers";
import { mockAllUsersConnectedToadmin } from "../../dataMock/adminContext";

import {
  connectNewActivityToUser,
  removeActivityFromUser,
  updateConnectedUsersOnActivity,
} from "../../firebase-functions/update";
import { getAllUsersNotConnectedToAdmin } from "../../firebase-functions/get";

jest.useFakeTimers();

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: jest.fn(),
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

jest.mock("../../context/AdminContext", () => ({
  useAdminFunction: () => ({
    allUsersConnectedToadmin: [],
  }),
}));

const mockGetAdminUsers = jest.fn();
jest.mock("../../context/AdminContext/useAdminContext", () => ({
  useAdminContext: () => ({
    getAdminUsers: mockGetAdminUsers,
  }),
}));

jest.mock("@react-native-firebase/auth", () => () => ({
  currentUser: {
    uid: "admin_id",
  },
}));

afterEach(() => {
  mockGetAdminUsers.mockReturnValue([]);
  getAllUsersNotConnectedToAdmin.mockReturnValue([]);
});

describe("Testing ManageUsers component", () => {
  it("Can render users connected and correct other users", async () => {
    await act(async () => {
      mockGetAdminUsers.mockReturnValue(mockAllUsersConnectedToadmin);
      getAllUsersNotConnectedToAdmin.mockReturnValue(mockOtherUserData);
    });
    const { getByTestId, getAllByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activityID1"}
      />,
    );

    await waitFor(() => {
      expect(getByTestId("test.modalHeader").children[0]).toEqual(
        "Lägg till eller ta bort:",
      );
      expect(getByTestId("test.myUsersHeader").children[0]).toEqual(
        "Mina användare",
      );

      expect(getAllByTestId("test.userView").length).toBe(2);
      expect(getByTestId("test.userFullName0").children[0]).toEqual(
        "Admin4 Adminsson4",
      );

      expect(getByTestId("test.userFullName1").children[0]).toEqual(
        "Johan2 Johansson2",
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
  });

  it("Renders info text when no users are connected to an admin and no other users are found", async () => {
    getAllUsersNotConnectedToAdmin.mockReturnValue([]);
    const { getByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activityID1"}
      />,
    );

    expect(getByTestId("test.myUsersHeader").children[0]).toEqual(
      "Mina användare",
    );
    expect(getByTestId("test.userView").children[0]).toEqual(
      "Du har inga användare kopplade till dig",
    );
    expect(getByTestId("test.otherUsersHeader").children[0]).toEqual(
      "Andra användare",
    );
    expect(getByTestId("test.noOtherUsers").children[0]).toEqual(
      "Inga andra användare är kopplade till den här aktiviteten!",
    );
  });

  it("Renders users and info when other users are not found", async () => {
    await act(async () => {
      mockGetAdminUsers.mockReturnValue(mockAllUsersConnectedToadmin);
      getAllUsersNotConnectedToAdmin.mockReturnValue([]);
    });

    const { getByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activityID1"}
      />,
    );
    await waitFor(() => {
      expect(getByTestId("test.myUsersHeader").children[0]).toEqual(
        "Mina användare",
      );
      expect(getByTestId("test.userFullName1").children[0]).toEqual(
        "Johan2 Johansson2",
      );
      expect(getByTestId("test.otherUsersHeader").children[0]).toEqual(
        "Andra användare",
      );
      expect(getByTestId("test.noOtherUsers").children[0]).toEqual(
        "Inga andra användare är kopplade till den här aktiviteten!",
      );
    });
  });

  it("Renders info text when no users are connected to an admin and correct other users", async () => {
    await act(async () => {
      getAllUsersNotConnectedToAdmin.mockReturnValue(mockOtherUserData);
    });
    const { getByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activityID1"}
      />,
    );

    await waitForElementToBeRemoved(() => getByTestId("test.noOtherUsers"));

    expect(getByTestId("test.myUsersHeader").children[0]).toEqual(
      "Mina användare",
    );
    expect(getByTestId("test.userView").children[0]).toEqual(
      "Du har inga användare kopplade till dig",
    );
    expect(getByTestId("test.otherUsersHeader").children[0]).toEqual(
      "Andra användare",
    );

    expect(getByTestId("test.otherUserFullName0").children[0]).toEqual(
      mockOtherUserData[0].fullName,
    );
    expect(getByTestId("test.otherUserFullName1").children[0]).toEqual(
      mockOtherUserData[1].fullName,
    );
  });

  it("It's possible to press on a user", async () => {
    await act(async () => {
      mockGetAdminUsers.mockReturnValue(mockAllUsersConnectedToadmin);
      getAllUsersNotConnectedToAdmin.mockReturnValue(mockOtherUserData);
    });
    const { getByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={"activityID1"}
      />,
    );

    const user = getByTestId("test.userView");
    fireEvent.press(user);
  });

  it("Can connect activity to user", async () => {
    const activityId = "activityID2";
    await act(async () => {
      mockGetAdminUsers.mockReturnValue(mockAllUsersConnectedToadmin);
      getAllUsersNotConnectedToAdmin.mockReturnValue([
        {
          id: "987",
          fullName: "Other user",
          connectedActivities: ["1234", activityId],
        },
      ]);
    });

    const { getByText, getByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={activityId}
      />,
    );

    await waitFor(() => {
      const checkBoxwithConnectedUserToActivity = getByTestId("checkbox-1");
      const checkBoxwithNotConnectedUserToActivity = getByTestId("checkbox-0");
      expect(checkBoxwithConnectedUserToActivity.props.isChecked).toBe(true);
      expect(checkBoxwithNotConnectedUserToActivity.props.isChecked).toBe(
        false,
      );

      fireEvent.press(checkBoxwithNotConnectedUserToActivity);
    });

    const saveButton = getByText("Spara");
    expect(saveButton);

    fireEvent.press(saveButton);
    await waitFor(() => {
      expect(connectNewActivityToUser).toHaveBeenCalledTimes(2);
      expect(updateConnectedUsersOnActivity).toHaveBeenCalledWith(activityId, [
        "2",
        "3",
        "987",
      ]);
    });
  });

  it("Can remove activity from user", async () => {
    const activityId = "activityID2";
    await act(async () => {
      mockGetAdminUsers.mockReturnValue(mockAllUsersConnectedToadmin);
      getAllUsersNotConnectedToAdmin.mockReturnValue([
        {
          id: "987",
          fullName: "Other user",
          connectedActivities: ["1234", activityId],
        },
      ]);
    });

    const { getByText, getByTestId } = render(
      <ManageUsers
        visible={true}
        closeModal={jest.fn()}
        currentActivityId={activityId}
      />,
    );

    await waitFor(() => {
      const checkBoxwithConnectedUserToActivity = getByTestId("checkbox-1");
      const checkBoxwithNotConnectedUserToActivity = getByTestId("checkbox-0");

      expect(checkBoxwithConnectedUserToActivity.props.isChecked).toBe(true);
      expect(checkBoxwithNotConnectedUserToActivity.props.isChecked).toBe(
        false,
      );

      fireEvent.press(checkBoxwithConnectedUserToActivity);
    });

    const saveButton = getByText("Spara");
    expect(saveButton);

    fireEvent.press(saveButton);
    await waitFor(() => {
      expect(removeActivityFromUser).toHaveBeenCalledTimes(2);
      expect(updateConnectedUsersOnActivity).toHaveBeenCalledWith(activityId, [
        "987",
      ]);
    });
  });
});
