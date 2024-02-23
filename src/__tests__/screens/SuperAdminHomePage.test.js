import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  mockAllUsersWithUnconfirmedTimeEntries,
  mockAllUsersWithUnconfirmedAfterApprove,
} from "../../dataMock/superAdminHomePageContextMock";
import { SuperAdminHomePage } from "../../screens/SuperAdminHomePage";
import { useSuperAdminHomePageFunction } from "../../context/SuperAdminHomePageContext";
import { onApproveTimeEntries } from "../../context/SuperAdminHomePageContext/useSuperAdminHomePageContext";

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});

jest.mock("@react-native-firebase/firestore", () => () => ({
  collection: () => ({
    doc: () => ({
      update: jest.fn(),
    }),
  }),
}));

// const mockNav = SuperAdminStack.AllUsersInTheSystem;
// jest.mock("../../components/MenuOverlay/useMenuNavigation", () => ({
//   useMenuNavigation: jest.fn(),
// }));
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

jest.mock("../../context/SuperAdminHomePageContext", () => ({
  useSuperAdminHomePageFunction: () => ({
    allUsersWithUnconfirmedTimeEntries: mockAllUsersWithUnconfirmedTimeEntries,
    setAllUsersWithUnconfirmedTimeEntries: jest.fn(),
  }),
}));

jest.mock("../../firebase-functions/updateTS/update", () => ({
  confirmTimeEntry: jest.fn(() => () => new Promise.resolve(true)),
}));

jest.mock(
  "../../context/SuperAdminHomePageContext/useSuperAdminHomePageContext",
  () => ({
    useSuperAdminHomePageContext: () => ({
      onApproveTimeEntries: jest.fn(),
    }),
  }),
);

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
    expect(getByTestId("info-row-time").props.children).toBe("1.5");
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

  it("Time entry should disappear from the list after approve", async () => {
    const { getAllByTestId, getByTestId, queryByTestId, debug } = render(
      <SuperAdminHomePage />,
    );
    const adminName = getAllByTestId("main-title-drop-down");
    fireEvent.press(adminName[0]);
    expect(
      getByTestId("checkbox-info-row-unapprovedTimeEntries1"),
    ).toBeTruthy();
    expect(
      getByTestId("checkbox-info-row-unapprovedTimeEntries3"),
    ).toBeTruthy();

    const checkbox = getByTestId("checkbox-info-row-unapprovedTimeEntries3");
    fireEvent.press(checkbox);

    const onSaveButton = getByTestId("long-button-on-save");
    fireEvent.press(onSaveButton);

    useSuperAdminHomePageContext().onApproveTimeEntries.mockReturnValue(
      useSuperAdminHomePageFunction().setAllUsersWithUnconfirmedTimeEntries.mockReturnValue(
        mockAllUsersWithUnconfirmedAfterApprove,
      ),
    );
    // useSuperAdminHomePageFunction().setAllUsersWithUnconfirmedTimeEntries.mockReturnValue(
    //   mockAllUsersWithUnconfirmedAfterApprove,
    // );
    debug();
    await waitFor(() => {
      expect(
        getByTestId("checkbox-info-row-unapprovedTimeEntries1"),
      ).toBeTruthy();
      expect(
        queryByTestId("checkbox-info-row-unapprovedTimeEntries3"),
      ).toBeNull();
    });
  });
});
