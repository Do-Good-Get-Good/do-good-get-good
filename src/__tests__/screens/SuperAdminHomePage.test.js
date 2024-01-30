import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { mockAllUsersWithUnconfirmedTimeEntries } from "../../dataMock/superAdminHomePageContextMock";
import { SuperAdminHomePage } from "../../screens/SuperAdminHomePage";

// jest.mock("@react-native-community/netinfo", () => ({
//   useNetInfo: jest.fn(),
// }));

// jest.mock("@react-native-firebase/firestore", () => {
//   return jest.fn();
// });
// const mockedNavigate = jest.fn();

// jest.mock("@react-navigation/native", () => {
//   const actualNav = jest.requireActual("@react-navigation/native");
//   return {
//     ...actualNav,
//     useNavigation: () => ({
//       navigate: mockedNavigate,
//     }),
//   };
// });
// jest.mock("@react-native-firebase/auth", () => {
//   return jest.fn();
// });

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});

jest.mock("../../context/SuperAdminHomePageContext", () => ({
  useSuperAdminHomePageFunction: () => ({
    allUsersWithUnconfirmedTimeEntries: mockAllUsersWithUnconfirmedTimeEntries,
  }),
}));

describe("Testing SuperAdminHomePage screen ", () => {
  it("As super admin I want to see all users that have unapproved time entries", async () => {
    const { getAllByTestId, debug } = render(<SuperAdminHomePage />);
    const dropDown = getAllByTestId("unapproved-time-entries-drop-down");
    expect(dropDown).toHaveLength(2);
    debug();
  });
  it("DropDown should open when super admin click on user ", async () => {
    const { getAllByTestId, debug } = render(<SuperAdminHomePage />);
    const dropDown = getAllByTestId("unapproved-time-entries-drop-down");

    fireEvent.press(dropDown[0]);

    debug();
  });
});
