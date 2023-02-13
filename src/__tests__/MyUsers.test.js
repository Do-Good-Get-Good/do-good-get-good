import "react-native";
import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import MyUsers from "../components/MyUsers";
import { AdminHomePageProvider } from "../context/AdminHomePageContext";
import { expect } from "@jest/globals";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <></>;
});

jest.mock("@react-native-firebase/auth", () => {
  const auth = jest.requireActual("@react-native-firebase/auth");
  return () => ({
    ...auth,
    currentUser: {
      uid: "234",
    },
  });
});

jest.mock("../firebase-functions/get", () => ({
  getUsersFiveNewestTimeEntries: jest.fn(() => {
    return [
      {
        admin_id: 234,
        id: 345,
        date: { toDate: () => new Date("2022-12-28") },
        status_confirmed: true,
        time: 2,
        activity_title: "title",
        activity_id: 567,
      },
    ];
  }),
  getAllUsersConnectedToAdmin: jest.fn(() => {
    return [
      {
        activities_and_accumulated_time: [
          {
            accumulated_time: 0,
            activity_id: "567",
          },
        ],
        admin_id: "234",
        connected_activities: ["567"],
        first_name: "test",
        id: "qwe",
        last_name: "test",
        role: "user",
        status_active: true,
        total_confirmed_hours: 0,
        total_hours_month: 0,
        total_hours_year: 0,
      },
      {
        activities_and_accumulated_time: [
          {
            accumulated_time: 0,
            activity_id: "567",
          },
        ],
        admin_id: "234",
        connected_activities: ["567"],
        first_name: "test2",
        id: "asd",
        last_name: "test2",
        role: "user",
        status_active: false,
        total_confirmed_hours: 0,
        total_hours_month: 0,
        total_hours_year: 0,
      },
    ];
  }),
}));

jest.mock("../context/ChangeUserInfoContext", () => ({
  useChangeUserInfoFunction: () => ({
    setNewChangesInUserInfo: jest.fn(),
  }),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe("Testing MyUsers component", () => {
  describe("Header view", () => {
    it("can find the my users text", async () => {
      const { getAllByText } = render(
        <AdminHomePageProvider>
          <MyUsers />
        </AdminHomePageProvider>
      );
      await waitFor(() => {
        expect(getAllByText("Mina användare").length).toBe(1);
      });
    });

    it("can find the default text inside the small dropdown", async () => {
      const { getByTestId } = render(
        <AdminHomePageProvider>
          <MyUsers />
        </AdminHomePageProvider>
      );
      await waitFor(() => {
        expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");
      });
    });

    it("can press the small dropdown to open", async () => {
      const { getByTestId } = render(
        <AdminHomePageProvider>
          <MyUsers />
        </AdminHomePageProvider>
      );

      await waitFor(() => {
        const button = getByTestId("smallDropdown");
        fireEvent.press(button);
        expect(getByTestId("insideSmallDropdownText 0").props.children).toEqual(
          "A - Ö"
        );
        expect(getByTestId("insideSmallDropdownText 1").props.children).toEqual(
          "Inaktiva"
        );
      });
    });

    it("can press on A - Ö inside the small dropdown and see active users", async () => {
      const { getByTestId, getByText } = render(
        <AdminHomePageProvider>
          <MyUsers />
        </AdminHomePageProvider>
      );

      await waitFor(() => {
        const button = getByTestId("smallDropdown");
        fireEvent.press(button);

        const button2 = getByTestId("insideSmallDropdown 0");
        act(() => {
          fireEvent.press(button2);
        });
        expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");

        const userButton = getByText("test test");
        expect(userButton);
      });
    });

    it("can press on Inaktiva inside the small dropdown and see inactive users", async () => {
      const { getByTestId, getByText } = render(
        <AdminHomePageProvider>
          <MyUsers />
        </AdminHomePageProvider>
      );

      await waitFor(() => {
        const button = getByTestId("smallDropdown");
        fireEvent.press(button);

        const button3 = getByTestId("insideSmallDropdown 1");
        act(() => {
          fireEvent.press(button3);
        });
        expect(getByTestId("dropdownText").props.children).toEqual("Inaktiva");

        const userButton = getByText("test2 test2");
        expect(userButton);
      });
    });

    it("Can view active user timeentries", async () => {
      const { getByTestId } = render(
        <AdminHomePageProvider>
          <MyUsers />
        </AdminHomePageProvider>
      );

      await waitFor(async () => {
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
    });

    it("Can view inactive user timeentries", async () => {
      const { getByTestId } = render(
        <AdminHomePageProvider>
          <MyUsers />
        </AdminHomePageProvider>
      );

      await waitFor(async () => {
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
        expect(userTimeEntryDate.children[0]).toEqual("2022-12-28");
        expect(userTimeEntryTime.children[0]).toEqual("2 tim");
      });
    });

    it("Can press edit icon on active users", async () => {
      const { getByTestId } = render(
        <AdminHomePageProvider>
          <MyUsers navigation={mockNavigation} />
        </AdminHomePageProvider>
      );

      await waitFor(async () => {
        expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");

        const userButton = getByTestId(`userDropdown 0`);

        act(() => {
          fireEvent.press(userButton);
        });

        const editIcon = getByTestId("editIcon");
        fireEvent.press(editIcon);

        expect(mockNavigation.navigate).toHaveBeenCalledWith("ChangeUser", {
          statusActive: true,
          userID: "qwe",
          userName: "test",
          userSurname: "test",
        });
      });
    });

    it("Can press edit icon on inactive users", async () => {
      const { getByTestId } = render(
        <AdminHomePageProvider>
          <MyUsers navigation={mockNavigation} />
        </AdminHomePageProvider>
      );

      await waitFor(async () => {
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

        const editIcon = getByTestId("editIcon");
        fireEvent.press(editIcon);

        expect(mockNavigation.navigate).toHaveBeenCalledWith("ChangeUser", {
          statusActive: true,
          userID: "qwe",
          userName: "test",
          userSurname: "test",
        });
      });
    });
  });
});
