import "react-native";
import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { MyUsers } from "../../components/MyUsers";
import { expect } from "@jest/globals";
import { mockUsersWithFiveConfirmedTimeEntries } from "../../dataMock/adminContext";

import { when } from "mobx";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("@react-native-firebase/auth", () => {
  const auth = jest.requireActual("@react-native-firebase/auth");
  return () => ({
    ...auth,
    currentUser: {
      uid: "1",
    },
  });
});

jest.mock("@react-native-firebase/firestore", () => () => ({
  collection: () => ({
    doc: () => ({
      onSnapshot: jest.fn(),
    }),
  }),
}));

jest.mock("../../components/TimeStatistics", () => () => {
  return <mockTimeStatistics />;
});

const mockNavigation = {
  navigate: jest.fn(),
};

describe("Testing MyUsers component", () => {
  describe("Header view", () => {
    it("can find the my users text", async () => {
      const { getAllByText } = render(
        <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
      );
      await waitFor(() => {
        expect(getAllByText("Mina användare").length).toBe(1);
      });
    });

    it("can find the default text inside the small dropdown", async () => {
      const { getByTestId } = render(
        <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
      );
      await waitFor(() => {
        expect(getByTestId("dropdown-title-sort-by").props.children).toEqual(
          "A - Ö",
        );
      });
    });

    it("can press the small dropdown to open", async () => {
      const { getByTestId } = render(
        <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
      );

      await waitFor(async () => {
        const button = getByTestId("dropdown-sort-by");
        fireEvent.press(button);
        expect(
          getByTestId("inside-sort-by-dropdown-Alphabetically").props.children,
        ).toEqual("A - Ö");

        expect(
          getByTestId("inside-sort-by-dropdown-Inactive").props.children,
        ).toEqual("Inaktiva");
      });
    });

    it("can press on Inaktiva and then back to active inside the small dropdown and see inactive users and then active", async () => {
      const { getByText, queryByText, debug } = render(
        <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
      );

      expect(getByText("Admin4 Adminsson4"));
      expect(getByText("Johan2 Johansson2"));
      expect(queryByText("Johan22 Johansson22")).toBeNull();

      fireEvent.press(getByText("dropdown-sort-by"));
      fireEvent.press(getByText("inside-sort-by-dropdown-Inactive"));

      expect(queryByText("dropdown-title-2-my-users"));
      expect(queryByText("dropdown-title-3-my-users"));
      expect(getByText("dropdown-title-04-my-users")).toBeNull();
    });

    //   it("Can view active user timeentries", async () => {
    //     const { getByTestId } = render(<MyUsers />);
    //     await when(() => adminStore.allUsers.length === 2);

    //     expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");

    //     const userButton = getByTestId(`userDropdown 0`);

    //     act(() => {
    //       fireEvent.press(userButton);
    //     });

    //     const userTimeEntryTitle = getByTestId(`user timeEntry 0 title`);
    //     const userTimeEntryDate = getByTestId(`user timeEntry 0 date`);
    //     const userTimeEntryTime = getByTestId(`user timeEntry 0 time`);

    //     expect(userTimeEntryTitle.children[0]).toEqual("title");
    //     expect(userTimeEntryDate.children[0]).toEqual("2022-12-28");
    //     expect(userTimeEntryTime.children[0]).toEqual("2 tim");
    //   });

    //   it("Can view inactive user timeentries", async () => {
    //     const { getByTestId } = render(<MyUsers />);
    //     await when(() => adminStore.allUsers.length === 2);

    //     const button = getByTestId("smallDropdown");
    //     fireEvent.press(button);

    //     const button3 = getByTestId("insideSmallDropdown 1");
    //     act(() => {
    //       fireEvent.press(button3);
    //     });
    //     expect(getByTestId("dropdownText").props.children).toEqual("Inaktiva");

    //     const userButton = getByTestId(`userDropdown 0`);

    //     act(() => {
    //       fireEvent.press(userButton);
    //     });

    //     const userTimeEntryTitle = getByTestId(`user timeEntry 0 title`);
    //     const userTimeEntryDate = getByTestId(`user timeEntry 0 date`);
    //     const userTimeEntryTime = getByTestId(`user timeEntry 0 time`);

    //     expect(userTimeEntryTitle.children[0]).toEqual("title");
    //     expect(userTimeEntryDate.children[0]).toEqual("2023-01-12");
    //     expect(userTimeEntryTime.children[0]).toEqual("2 tim");
    //   });

    //   it("Can press edit icon on active users", async () => {
    //     const { getByTestId } = render(<MyUsers navigation={mockNavigation} />);
    //     await when(() => adminStore.allUsers.length === 2);

    //     expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");

    //     const userButton = getByTestId(`userDropdown 0`);

    //     act(() => {
    //       fireEvent.press(userButton);
    //       const editIcon = getByTestId("editIcon");
    //       fireEvent.press(editIcon);
    //     });

    //     expect(mockNavigation.navigate).toHaveBeenCalledWith("ChangeUser", {
    //       sortBy: "A - Ö",
    //       statusActive: true,
    //       userID: 123,
    //       userName: "Test1",
    //       userSurname: "Lastname1",
    //     });
    //   });

    //   it("Can press edit icon on inactive users", async () => {
    //     const { getByTestId } = render(<MyUsers navigation={mockNavigation} />);
    //     await when(() => adminStore.allUsers.length === 2);

    //     const button = getByTestId("smallDropdown");
    //     fireEvent.press(button);

    //     const button3 = getByTestId("insideSmallDropdown 1");
    //     act(() => {
    //       fireEvent.press(button3);
    //     });
    //     expect(getByTestId("dropdownText").props.children).toEqual("Inaktiva");

    //     const userButton = getByTestId(`userDropdown 0`);

    //     act(() => {
    //       fireEvent.press(userButton);
    //       const editIcon = getByTestId("editIcon");
    //       fireEvent.press(editIcon);
    //     });

    //     expect(mockNavigation.navigate).toHaveBeenCalledWith("ChangeUser", {
    //       sortBy: "Inaktiva",
    //       statusActive: false,
    //       userID: 1234,
    //       userName: "Test2",
    //       userSurname: "Lastname2",
    //     });
    //   });
  });
});
