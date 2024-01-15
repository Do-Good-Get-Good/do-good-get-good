import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import {
  mockAllAdminsAnsSuperAdmins,
  mockSelectedUser,
} from "../../dataMock/superAdminMock";
import { RolesAndConnection } from "../../screens/RolesAndConnection";

jest.mock("@react-native-firebase/firestore", () => {
  return jest.fn();
});
jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));
jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: jest.fn(),
}));
jest.mock("@react-native-firebase/auth", () => {
  return jest.fn();
});

jest.mock("../../context/SuperAdminContext", () => ({
  useSuperAdminFunction: () => ({
    allAdminsAnsSuperAdmins: mockAllAdminsAnsSuperAdmins,

    makeChangesForSelectedUser: mockSelectedUser,
  }),
}));

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});

describe("Testing RolesAndConnection screen ", () => {
  const navigationMock = { goBack: jest.fn() };
  it("Go back button is showen and navigate back", async () => {
    const { getByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );
    const button = getByTestId("goBackButton");
    fireEvent.press(button);
    expect(navigationMock.goBack).toHaveBeenCalled();
  });

  it("It shows user name, role and admin ", async () => {
    const { getByText, getAllByTestId, getByTestId, debug } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );
    expect(getByText("Super Supersson")).toBeTruthy();
    expect(getByText("Nivå")).toBeTruthy();

    expect(getAllByTestId("title-and-value-value")[0].props.children).toBe(
      "Super admin",
    );
    expect(getByText("Admin")).toBeTruthy();
    expect(getAllByTestId("title-and-value-value")[1].props.children).toBe(
      "Admin Adminsson",
    );
  });

  it("It works to open overlay to change role", async () => {
    const { getByTestId, getByText } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    const changeRoleButton = getByTestId("textUnderlineButton.0");
    fireEvent.press(changeRoleButton);
    expect(getByTestId("popUpTextvalue.mainTitle").props.children).toBe(
      "Ändra nivå",
    );

    expect(getByTestId("popUpRadioButton.user"));
    expect(getByTestId("popUpTextvalue.user"));
    expect(getByTestId("popUpRadioButton.admin"));
    expect(getByTestId("popUpTextvalue.admin"));
    expect(getByTestId("popUpRadioButton.superadmin"));
    expect(getByTestId("popUpTextvalue.superadmin"));
    expect(getByText("Ok")).toBeTruthy();
  });

  it("It works to change role", async () => {
    const { getByTestId, getByText, getAllByTestId, queryByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    const changeRoleButton = getByTestId("textUnderlineButton.0");
    fireEvent.press(changeRoleButton);
    expect(queryByTestId("popUpRadioButton.admin"));

    const chanegeToAdminButtonPressed = queryByTestId("popUpRadioButton.admin");
    const okButton = getByText("Ok");
    fireEvent.press(chanegeToAdminButtonPressed);
    fireEvent.press(okButton);

    expect(getByText("Nivå")).toBeTruthy();
    expect(getAllByTestId("title-and-value-value")[0].props.children).toBe(
      "Admin",
    );
  });

  it("It works to open overlay to change admin", async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    const changeRoleButton = getByTestId("textUnderlineButton.1");
    fireEvent.press(changeRoleButton);

    expect(queryByTestId("popUpTextvalue.mainTitle").props.children).toBe(
      "Ändra admin",
    );

    await waitFor(() => {
      expect(getByTestId("popUpTextvalue.3").props.children).toBe(
        "Admin2 Adminsson2",
      );
      expect(getByTestId("popUpTextvalue.2").props.children).toBe(
        "Admin Adminsson",
      );

      expect(getByTestId("popUpTextvalue.6").props.children).toBe(
        "Super2 Supersson2",
      );
      expect(getByTestId("popUpTextvalue.7").props.children).toBe(
        "Super3 Supersson3",
      );
    });

    expect(getByText("Ok")).toBeTruthy();
  });

  it("Overlay should not show user that you are changing - as options to become admin, so that admin do not get itself as admin", async () => {
    const { queryByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    expect(queryByTestId("popUpTextvalue.1")).toBeNull();
  });
});
