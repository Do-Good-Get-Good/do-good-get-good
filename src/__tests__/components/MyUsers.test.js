import "react-native";
import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import MyUsers from "../../components/MyUsers";
import { expect } from "@jest/globals";

import adminStore from "../../store/adminStore";
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
      uid: "234",
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
  return <></>;
});

const mockNavigation = {
  navigate: jest.fn(),
};

describe("Testing MyUsers component", () => {
  adminStore.addNewUser({
    firstName: "Test1",
    lastName: "Lastname1",
    timeEntries: [
      {
        admin_id: 234,
        id: 345,
        date: { toDate: () => new Date("2022-12-28") },
        status_confirmed: true,
        time: 2,
        activity_title: "title",
        activity_id: 567,
      },
    ],
    isOpen: false,
    statusActive: true,
    userID: 123,
    timeObject: {
      paidTime: 5,
      timeForYear: 10,
      currentForMonth: 2,
    },
  });
  adminStore.addNewUser({
    firstName: "Test2",
    lastName: "Lastname2",
    timeEntries: [
      {
        admin_id: 234,
        id: 345,
        date: { toDate: () => new Date("2023-01-12") },
        status_confirmed: true,
        time: 2,
        activity_title: "title",
        activity_id: 567,
      },
    ],
    isOpen: false,
    statusActive: false,
    userID: 1234,
    timeObject: {
      paidTime: 5,
      timeForYear: 10,
      currentForMonth: 2,
    },
  });
  describe("Header view", () => {
    it("can find the my users text", async () => {
      const { getAllByText } = render(<MyUsers />);
      await waitFor(() => {
        expect(getAllByText("Mina användare").length).toBe(1);
      });
    });

    it("can find the default text inside the small dropdown", async () => {
      const { getByTestId } = render(<MyUsers />);
      await waitFor(() => {
        expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");
      });
    });

    it("can press the small dropdown to open", async () => {
      const { getByTestId } = render(<MyUsers />);

      await waitFor(() => {
        const button = getByTestId("smallDropdown");
        fireEvent.press(button);
        expect(getByTestId("insideSmallDropdownText 0").props.children).toEqual(
          "A - Ö",
        );
        expect(getByTestId("insideSmallDropdownText 1").props.children).toEqual(
          "Inaktiva",
        );
      });
    });

    it("can press on A - Ö inside the small dropdown and see active users", async () => {
      const { getByTestId } = render(<MyUsers />);
      await when(() => adminStore.allUsers.length === 2);

      const button = getByTestId("smallDropdown");

      act(() => {
        fireEvent.press(button);
      });

      const button2 = getByTestId("insideSmallDropdown 0");

      act(() => {
        fireEvent.press(button2);
      });

      expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");

      const userButton = getByTestId(`user 0 name`);
      expect(userButton.children[0]).toEqual("Test1 Lastname1");
    });

    it("can press on Inaktiva inside the small dropdown and see inactive users", async () => {
      const { getByTestId } = render(<MyUsers />);
      await when(() => adminStore.allUsers.length === 2);

      const button = getByTestId("smallDropdown");

      act(() => {
        fireEvent.press(button);
      });

      const button3 = getByTestId("insideSmallDropdown 1");

      act(() => {
        fireEvent.press(button3);
      });

      expect(getByTestId("dropdownText").props.children).toEqual("Inaktiva");

      const userButton = getByTestId(`user 0 name`);
      expect(userButton.children[0]).toEqual("Test2 Lastname2");
    });

    it("Can view active user timeentries", async () => {
      const { getByTestId } = render(<MyUsers />);
      await when(() => adminStore.allUsers.length === 2);

      expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");

      const userButton = getByTestId(`userDropdown 0`);

      act(() => {
        fireEvent.press(userButton);
      });

      const userTimeEntryTitle = getByTestId(`user timeEntry 0 title`);
      const userTimeEntryDate = getByTestId(`user timeEntry 0 date`);
      const userTimeEntryTime = getByTestId(`user timeEntry 0 time`);

      expect(userTimeEntryTitle.children[0]).toEqual("title");
      expect(userTimeEntryDate.children[0]).toEqual("2022-12-28");
      expect(userTimeEntryTime.children[0]).toEqual("2 tim");
    });

    it("Can view inactive user timeentries", async () => {
      const { getByTestId } = render(<MyUsers />);
      await when(() => adminStore.allUsers.length === 2);

      const button = getByTestId("smallDropdown");
      fireEvent.press(button);

      const button3 = getByTestId("insideSmallDropdown 1");
      act(() => {
        fireEvent.press(button3);
      });
      expect(getByTestId("dropdownText").props.children).toEqual("Inaktiva");

      const userButton = getByTestId(`userDropdown 0`);

      act(() => {
        fireEvent.press(userButton);
      });

      const userTimeEntryTitle = getByTestId(`user timeEntry 0 title`);
      const userTimeEntryDate = getByTestId(`user timeEntry 0 date`);
      const userTimeEntryTime = getByTestId(`user timeEntry 0 time`);

      expect(userTimeEntryTitle.children[0]).toEqual("title");
      expect(userTimeEntryDate.children[0]).toEqual("2023-01-12");
      expect(userTimeEntryTime.children[0]).toEqual("2 tim");
    });

    it("Can press edit icon on active users", async () => {
      const { getByTestId } = render(<MyUsers navigation={mockNavigation} />);
      await when(() => adminStore.allUsers.length === 2);

      expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");

      const userButton = getByTestId(`userDropdown 0`);

      act(() => {
        fireEvent.press(userButton);
        const editIcon = getByTestId("editIcon");
        fireEvent.press(editIcon);
      });

      expect(mockNavigation.navigate).toHaveBeenCalledWith("ChangeUser", {
        sortBy: "A - Ö",
        statusActive: true,
        userID: 123,
        userName: "Test1",
        userSurname: "Lastname1",
      });
    });

    it("Can press edit icon on inactive users", async () => {
      const { getByTestId } = render(<MyUsers navigation={mockNavigation} />);
      await when(() => adminStore.allUsers.length === 2);

      const button = getByTestId("smallDropdown");
      fireEvent.press(button);

      const button3 = getByTestId("insideSmallDropdown 1");
      act(() => {
        fireEvent.press(button3);
      });
      expect(getByTestId("dropdownText").props.children).toEqual("Inaktiva");

      const userButton = getByTestId(`userDropdown 0`);

      act(() => {
        fireEvent.press(userButton);
        const editIcon = getByTestId("editIcon");
        fireEvent.press(editIcon);
      });

      expect(mockNavigation.navigate).toHaveBeenCalledWith("ChangeUser", {
        sortBy: "Inaktiva",
        statusActive: false,
        userID: 1234,
        userName: "Test2",
        userSurname: "Lastname2",
      });
    });
  });
});
