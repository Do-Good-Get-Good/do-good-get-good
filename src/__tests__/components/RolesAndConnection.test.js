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

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: jest.fn(),
}));
jest.mock("@react-native-firebase/auth", () => {
  return jest.fn();
});

jest.mock("../../context/SuperAdminContext", () => ({
  useSuperAdminFunction: () => ({
    allAdminsAnsSuperAdmins: mockAllAdminsAnsSuperAdmins,
    updateUserAfterChanges: jest.fn(),
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
    const { getByText, getAllByTestId } = render(
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
        "Admin4 Adminsson4",
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

  it("Overlay should not show user that you are changing - as options to become admin, so that admin do not get itself as admin", async () => {
    const { queryByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    expect(queryByTestId("popUpTextvalue.1")).toBeNull();
  });

  /////////// Connected users dropdown

  it("Connected users dropdown should be shown if user has role admin or superadmin", async () => {
    const { getByTestId, getAllByTestId, getByText, debug } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(3);

    expect(getByTestId("connected-users-dropdown-2")).toBeTruthy();
    expect(getByText("Admin4 Adminsson4")).toBeTruthy();

    expect(getByTestId("connected-users-dropdown-3")).toBeTruthy();
    expect(getByText("Admin2 Adminsson2")).toBeTruthy();

    expect(getByTestId("connected-users-dropdown-4")).toBeTruthy();
    expect(getByText("Johan Johansson")).toBeTruthy();
  });

  it("Connected users dropdown should be all closed before press", async () => {
    const { queryByText, queryAllByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    expect(queryAllByTestId("pencil-icon")).toHaveLength(0);
    expect(queryByText("Admin:Super Supersson")).toBeNull();
  });

  it("Connected users dropdown. Should open only one dropdown when user press on it", async () => {
    const { debug, getAllByTestId, getByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );
    const firtsDropboxItem = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem);

    expect(getAllByTestId("arrow-drop-up-icon")).toHaveLength(1);
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);
    expect(getByTestId("pencil-icon")).toBeTruthy();

    expect(getByTestId("drop-down-admin-name").props.children).toBe(
      "Super Supersson",
    );
  });
  it("Connected users dropdown. Should show the same admin name  ", async () => {
    const { getAllByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );
    const firtsDropboxItem1 = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem1);

    const firtsDropboxItem2 = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem2);

    const firtsDropboxItem3 = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem3);

    expect(getAllByTestId("drop-down-admin-name")[0].props.children).toBe(
      "Super Supersson",
    );
    expect(getAllByTestId("drop-down-admin-name")[1].props.children).toBe(
      "Super Supersson",
    );
    expect(getAllByTestId("drop-down-admin-name")[2].props.children).toBe(
      "Super Supersson",
    );
  });
  it("Connected users dropdown. It should open an overlay with list of admins when user press on pencil icon. If the pressed user has role admin, then it should not be shown in the list because  user should not be an admin to himself/herself.", async () => {
    const { queryByTestId, getAllByTestId, getByText, getByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );
    const firtsDropboxItem1 = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem1);
    expect(getByText("Admin4 Adminsson4")).toBeTruthy();

    const pencilIcon = getByTestId("pencil-icon");
    fireEvent.press(pencilIcon);

    expect(getByTestId("popUpTextvalue.mainTitle").props.children).toBe(
      "Ändra admin",
    );

    await waitFor(() => {
      expect(getByTestId("popUpTextvalue.3").props.children).toBe(
        "Admin2 Adminsson2",
      );
      expect(getByTestId("popUpTextvalue.1").props.children).toBe(
        "Super Supersson",
      );

      expect(getByTestId("popUpTextvalue.6").props.children).toBe(
        "Super2 Supersson2",
      );
      expect(getByTestId("popUpTextvalue.7").props.children).toBe(
        "Super3 Supersson3",
      );

      expect(queryByTestId("popUpTextvalue.2")).toBeNull();
    });

    expect(getByText("Ok")).toBeTruthy();
  });

  it("Should be possible to change user admin by pressing on another admin in overlay list", async () => {
    const { getAllByTestId, getByTestId, getByText } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    fireEvent.press(getAllByTestId("arrow-drop-down-icon")[0]);

    expect(getByTestId("drop-down-admin-name").props.children).toBe(
      "Super Supersson",
    );

    fireEvent.press(getByTestId("pencil-icon"));

    await waitFor(() => {
      fireEvent.press(getByTestId("popUpRadioButton.6"));
      fireEvent.press(getByText("Ok"));
    });

    expect(getByTestId("drop-down-admin-name").props.children).toBe(
      "Super2 Supersson2",
    );
  });

  it("Press to change admin of connected user. Update connectedUsersArray after saving changes", async () => {
    const { getAllByTestId, getByTestId, getByText } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(3);

    fireEvent.press(getAllByTestId("arrow-drop-down-icon")[0]);
    fireEvent.press(getByTestId("pencil-icon"));

    await waitFor(() => {
      fireEvent.press(getByTestId("popUpRadioButton.6"));
      fireEvent.press(getByText("Ok"));
    });

    fireEvent.press(getByText("Spara"));
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);
  });
});
