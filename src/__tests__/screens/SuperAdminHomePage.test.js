import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  mockAllUsersWithUnconfirmedTimeEntries,
  mockAllUsersWithUnconfirmedAfterApprove,
} from "../../dataMock/superAdminHomePageContextMock";
import { SuperAdminHomePage } from "../../screens/SuperAdminHomePage";

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});
jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: () => ({
    isConnected: true,
  }),
}));

jest.mock("@react-native-firebase/firestore", () => () => ({
  collection: () => ({
    doc: () => ({
      update: jest.fn(),
    }),
  }),
}));

jest.mock("@react-native-firebase/functions", () => {
  return jest.fn();
});

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock("@react-native-firebase/auth", () => {
  return () => ({
    auth: jest.fn(() => ({
      currentUser: {
        uid: "SuperadminID",
      },
    })),
  });
});
let mockUsersUnconfirmedTE = mockAllUsersWithUnconfirmedTimeEntries;
const mockOnApproveTimeEntries = jest.fn();
const mockUsersWithUnconfirmedTimeEntries = jest.fn();
jest.mock("../../context/SuperAdminHomePageContext", () => ({
  useSuperAdminHomePageFunction: () => ({
    allUsersWithUnconfirmedTimeEntries: mockUsersUnconfirmedTE,
  }),
  useSuperAdminHomePageContext: () => ({
    onApproveTimeEntriesSuperadmin: mockOnApproveTimeEntries,
    usersWithUnconfirmedTimeEntries: mockUsersWithUnconfirmedTimeEntries,
  }),
}));

describe("Testing SuperAdminHomePage screen ", () => {
  it("As super admin I want to see all users that have unapproved time entries. Main lable dropDown - admin name and amount of unapproved time entries", async () => {
    const { getAllByTestId } = render(<SuperAdminHomePage />);
    expect(getAllByTestId("unapproved-time-entries-drop-down")).toHaveLength(2);
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);
    const adminName = getAllByTestId("main-title-drop-down");
    const amount = getAllByTestId("amount-of-unapproved-time-entries");
    expect(adminName[0].props.children).toBe("Admin4\u00A0Adminsson4");
    expect(adminName[1].props.children).toBe("Admin2\u00A0Adminsson2");
    expect(amount[0].props.children).toBe(`3\u00A0st`);
    expect(amount[1].props.children).toBe(`1\u00A0st`);
  });

  it("DropDown should open when super admin click on user name or arow icon ", async () => {
    const { getAllByTestId, getByTestId, queryAllByTestId } = render(
      <SuperAdminHomePage />,
    );
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);

    const adminName = getAllByTestId("main-title-drop-down");
    fireEvent.press(adminName[0]);
    expect(getAllByTestId("info-row-title")).toHaveLength(3);
    expect(getByTestId("arrow-drop-down-icon")).toBeTruthy();
    const arrowUpIcon = getByTestId("arrow-drop-up-icon");

    fireEvent.press(arrowUpIcon);
    expect(queryAllByTestId("info-row-title")).toHaveLength(0);
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);
  });

  it("DropDown should open and show info row about unapproved time entries - user name, date, time, checkbox with no check marks", async () => {
    const { getAllByTestId, getByTestId } = render(<SuperAdminHomePage />);
    const adminName = getAllByTestId("main-title-drop-down");
    fireEvent.press(adminName[1]);

    expect(getByTestId("info-row-title").props.children).toBe(
      "User2\u00A0Usersson2",
    );
    expect(getByTestId("info-row-date").props.children).toBe("2022-07-10");
    expect(getByTestId("info-row-time").props.children).toBe("1.5 h");
    expect(
      getByTestId("checkbox-info-row-unapprovedTimeEntries2").props.isChecked,
    ).toBe(false);
  });

  it("Checkbox should work ", async () => {
    const { getAllByTestId, getByTestId } = render(<SuperAdminHomePage />);
    const adminName = getAllByTestId("main-title-drop-down");
    fireEvent.press(adminName[1]);

    const checkbox = getByTestId("checkbox-info-row-unapprovedTimeEntries2");
    expect(checkbox.props.isChecked).toBe(false);
    fireEvent.press(checkbox);
    expect(checkbox.props.isChecked).toBe(true);
  });

  // TODO:  Come back to this test when you get more idea why mockOnApproveTimeEntries doesn’t calls
  // it("Time entry should disappear from the list after approve", async () => {
  //   const { getAllByTestId, getByTestId, queryByTestId, debug } = render(
  //     <SuperAdminHomePage />,
  //   );
  //   const adminName = getAllByTestId("main-title-drop-down");
  //   fireEvent.press(adminName[0]);
  //   expect(
  //     getByTestId("checkbox-info-row-unapprovedTimeEntries1"),
  //   ).toBeTruthy();

  //   const checkbox = getByTestId("checkbox-info-row-unapprovedTimeEntries3");
  //   expect(checkbox).toBeTruthy();

  //   fireEvent.press(checkbox);
  //   const onCheck = [
  //     {
  //       id: "unapprovedTimeEntries3",
  //       activityID: "activityID3",
  //       adminID: "adminID3",
  //       userID: "userID3",
  //       activityTitle: "Activity Title 3",
  //       date: "2022-04-10",
  //       statusConfirmed: false,
  //       time: 3.5,
  //     },
  //   ];

  //   const onSaveButton = getByTestId("long-button-on-save");
  //   fireEvent.press(onSaveButton);

  //   await waitFor(() => {
  //     debug();
  //     console.log("Mock function calls:", mockOnApproveTimeEntries.mock.calls);

  //     expect(mockOnApproveTimeEntries).toHaveBeenCalledWith(
  //       onCheck,
  //       "SuperadminID",
  //     );

  //   expect(
  //     getByTestId("checkbox-info-row-unapprovedTimeEntries1"),
  //   ).toBeTruthy();
  //   expect(
  //     queryByTestId("checkbox-info-row-unapprovedTimeEntries3"),
  //   ).toBeNull();
  //   });
  // });

  it("Should show text 'Inga admins att visa' if there no admin with not approved time entries ", async () => {
    mockUsersUnconfirmedTE = [];
    const { getByText, debug, queryByTestId } = render(<SuperAdminHomePage />);
    debug();
    expect(getByText("Inga admins att visa")).toBeTruthy();
    expect(queryByTestId("unapproved-time-entries-drop-down")).toBeNull();
  });
});
