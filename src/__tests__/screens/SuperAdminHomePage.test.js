import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { mockAllUsersWithUnconfirmedTimeEntries } from "../../dataMock/superAdminHomePageContextMock";
import { SuperAdminHomePage } from "../../screens/SuperAdminHomePage";

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});

jest.mock("../../context/SuperAdminHomePageContext", () => ({
  useSuperAdminHomePageFunction: () => ({
    allUsersWithUnconfirmedTimeEntries: mockAllUsersWithUnconfirmedTimeEntries,
  }),
}));

describe("Testing SuperAdminHomePage screen ", () => {
  it("As super admin I want to see all users that have unapproved time entries. Main lable dropDown - user name and amount of unapproved time entries", async () => {
    const { getAllByTestId } = render(<SuperAdminHomePage />);
    expect(getAllByTestId("unapproved-time-entries-drop-down")).toHaveLength(2);
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);
    const userName = getAllByTestId("user-name-drop-down");
    const amount = getAllByTestId("amount-of-unapproved-time-entries");
    expect(userName[0].props.children).toBe("User1\u00A0Usersson1");
    expect(userName[1].props.children).toBe("User2\u00A0Usersson2");
    expect(amount[0].props.children).toBe(`2\u00A0st`);
    expect(amount[1].props.children).toBe(`1\u00A0st`);
  });

  it("DropDown should open when super admin click on user name or arow icon ", async () => {
    const { getAllByTestId, getByTestId, queryAllByTestId } = render(
      <SuperAdminHomePage />,
    );
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);

    // press on user name to open
    const userName = getAllByTestId("user-name-drop-down");
    fireEvent.press(userName[0]);
    expect(getAllByTestId("info-row-activity-title")).toHaveLength(2);
    expect(getByTestId("arrow-drop-down-icon")).toBeTruthy();
    const arrowUpIcon = getByTestId("arrow-drop-up-icon");

    // press on arrow to close
    fireEvent.press(arrowUpIcon);
    expect(queryAllByTestId("info-row-activity-title")).toHaveLength(0);
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);
  });

  it("DropDown should open and show info row about unapproved time entries - activity title, date, time, checkbox with no check marks", async () => {
    const { getAllByTestId, getByTestId } = render(<SuperAdminHomePage />);
    const userName = getAllByTestId("user-name-drop-down");
    fireEvent.press(userName[1]);

    expect(getByTestId("info-row-activity-title").props.children).toBe(
      "Activity Title 2",
    );
    expect(getByTestId("info-row-date").props.children).toBe("2022-07-10");
    expect(getByTestId("info-row-time").props.children).toBe("1.5");
    expect(getByTestId("checkbox").props.isChecked).toBe(false);
  });

  it("Checkbox should work ", async () => {
    const { getAllByTestId, getByTestId } = render(<SuperAdminHomePage />);
    const userName = getAllByTestId("user-name-drop-down");
    fireEvent.press(userName[1]);

    const checkbox = getByTestId("checkbox");
    expect(checkbox.props.isChecked).toBe(false);
    fireEvent.press(checkbox);
    expect(checkbox.props.isChecked).toBe(true);
  });
});
