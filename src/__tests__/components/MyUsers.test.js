import "react-native";
import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { MyUsers } from "../../components/MyUsers";
import { expect } from "@jest/globals";
import { mockUsersWithFiveConfirmedTimeEntries } from "../../dataMock/adminContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

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

jest.mock("react-native-outside-press", () => {
  return ({ children }) => children;
});

jest.mock("../../components/TimeStatistics", () => () => {
  return <mockTimeStatistics />;
});

const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));
describe("Testing MyUsers component", () => {
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
    const { getByText, queryByText, getByTestId } = render(
      <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
    );

    expect(getByText("Admin4 Adminsson4")).toBeTruthy();
    expect(getByText("Johan2 Johansson2")).toBeTruthy();
    expect(queryByText("Johan22 Johansson22")).toBeNull();

    fireEvent.press(getByTestId("dropdown-sort-by"));
    fireEvent.press(getByTestId("inside-sort-by-dropdown-Inactive"));

    expect(queryByText("Admin4 Adminsson4")).toBeNull();
    expect(queryByText("Johan2 Johansson2")).toBeNull();
    expect(getByText("Johan22 Johansson22")).toBeTruthy();
  });

  it("Can view active user timeentries", async () => {
    const { getAllByTestId, getByText } = render(
      <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
    );

    fireEvent.press(getByText("Admin4 Adminsson4"));

    const timeEntryTitle = getAllByTestId("info-row-title");
    const timeEntryDate = getAllByTestId("info-row-date");
    const timeEntryTime = getAllByTestId("info-row-time");
    expect(timeEntryTitle.length).toBe(5);

    expect(timeEntryTitle[0].props.children).toBe("activityTitle 1");
    expect(timeEntryDate[0].props.children).toBe("2023-05-02");
    expect(timeEntryTime[0].props.children).toBe("2.5 h");

    expect(timeEntryTitle[1].props.children).toBe("activityTitle 1");
    expect(timeEntryDate[1].props.children).toBe("2023-07-17");
    expect(timeEntryTime[1].props.children).toBe("3 h");

    expect(timeEntryTitle[2].props.children).toBe("activityTitle 1");
    expect(timeEntryDate[2].props.children).toBe("2023-08-10");
    expect(timeEntryTime[2].props.children).toBe("3 h");

    expect(timeEntryTitle[3].props.children).toBe("activityTitle 1");
    expect(timeEntryDate[3].props.children).toBe("2023-09-02");
    expect(timeEntryTime[3].props.children).toBe("2.5 h");

    expect(timeEntryTitle[4].props.children).toBe("activityTitle 1");
    expect(timeEntryDate[4].props.children).toBe("2023-11-17");
    expect(timeEntryTime[4].props.children).toBe("0.5 h");
  });

  it("Can view unactive user timeentries", async () => {
    const { getByTestId, getByText } = render(
      <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
    );
    fireEvent.press(getByTestId("dropdown-sort-by"));
    fireEvent.press(getByTestId("inside-sort-by-dropdown-Inactive"));

    fireEvent.press(getByText("Johan22 Johansson22"));

    const timeEntryTitle = getByTestId("info-row-title");
    const timeEntryDate = getByTestId("info-row-date");
    const timeEntryTime = getByTestId("info-row-time");

    expect(timeEntryTitle.props.children).toBe("activityTitle 5");
    expect(timeEntryDate.props.children).toBe("2022-09-02");
    expect(timeEntryTime.props.children).toBe("2.5 h");
  });

  it("Can press edit icon on active users", async () => {
    const { getByTestId, getByText } = render(
      <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
    );
    fireEvent.press(getByText("Admin4 Adminsson4"));

    fireEvent.press(getByTestId("pencil-icon2"));
    expect(mockedNavigate).toHaveBeenCalledWith("ChangeUser", {
      user: mockUsersWithFiveConfirmedTimeEntries[0],
    });
  });

  it("Can press edit icon on active users", async () => {
    const { getByTestId, getByText } = render(
      <MyUsers users={mockUsersWithFiveConfirmedTimeEntries} />,
    );
    fireEvent.press(getByTestId("dropdown-sort-by"));
    fireEvent.press(getByTestId("inside-sort-by-dropdown-Inactive"));

    fireEvent.press(getByText("Johan22 Johansson22"));

    fireEvent.press(getByTestId("pencil-icon04"));
    expect(mockedNavigate).toHaveBeenCalledWith("ChangeUser", {
      user: mockUsersWithFiveConfirmedTimeEntries[0],
    });
  });
});
