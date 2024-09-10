import { fireEvent, render, waitFor } from "@testing-library/react-native";
import {
  mockAllAdminsAndSuperAdmins,
  mockSelectedUser,
  userSuperadminMock,
} from "../../dataMock/superAdminMock";
import { RolesAndConnection } from "../../screens/RolesAndConnection";

jest.mock("../../context/SuperAdminContext", () => ({
  useSuperAdminFunction: () => ({
    allAdminsAndSuperAdmins: mockAllAdminsAndSuperAdmins,
    makeChangesForSelectedUser: mockSelectedUser,
  }),
}));

const mockedNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
    goBack: mockGoBack,
  }),
}));

describe("Testing RolesAndConnection screen ", () => {
  it("Go back button is showen and navigate back", async () => {
    const { getByTestId } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );
    const button = getByTestId("goBackButton");
    fireEvent.press(button);
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("It shows user name, role and admin ", async () => {
    const { getByText, getAllByTestId } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );
    expect(getByText("Super Supersson")).toBeTruthy();
    expect(getByText("Nivå")).toBeTruthy();

    expect(getAllByTestId("title-and-value-value")[0].props.children).toBe(
      "Super admin"
    );
    expect(getByText("Admin")).toBeTruthy();
    expect(getAllByTestId("title-and-value-value")[1].props.children).toBe(
      "Admin Adminsson"
    );
    expect(getByText("E-post")).toBeTruthy();
    expect(getAllByTestId("title-and-value-value")[2].props.children).toBe(
      "super.supersson@technogarden"
    );
  });

  it("It works to press on Change user button and navigate to ChangeUser screen ", async () => {
    const { getByTestId } = render(<RolesAndConnection />);

    const changeUserButton = getByTestId("textUnderlineButton.2");
    fireEvent.press(changeUserButton);
    expect(mockedNavigate).toHaveBeenCalledWith("ChangeUser", {
      user: userSuperadminMock,
      prevRoute: "RolesAndConnection",
    });
  });
});

describe("Testing RolesAndConnection screen. Change admin button ", () => {
  it("It works to open overlay to change admin", async () => {
    const { getByTestId, getByText, queryByTestId, getAllByTestId } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );

    const changeRoleButton = getByTestId("textUnderlineButton.1");
    fireEvent.press(changeRoleButton);

    expect(queryByTestId("popUpTextvalue.mainTitle").props.children).toBe(
      "Ändra admin"
    );

    await waitFor(() => {
      expect(getByTestId("popUpTextvalue.3").props.children).toBe(
        "Admin2 Adminsson2"
      );
      expect(getByTestId("popUpTextvalue.2").props.children).toBe(
        "Admin4 Adminsson4"
      );

      expect(getByTestId("popUpTextvalue.6").props.children).toBe(
        "Super2 Supersson2"
      );
      expect(getByTestId("popUpTextvalue.7").props.children).toBe(
        "Super3 Supersson3"
      );
    });

    await waitFor(() => {
      fireEvent.press(getByTestId("popUpRadioButton.3"));
      fireEvent.press(getByText("Ok"));
      expect(getByText("Admin")).toBeTruthy();
      expect(getAllByTestId("title-and-value-value")[1].props.children).toBe(
        "Admin2 Adminsson2"
      );
    });
  });

  it("Overlay should not show user that you are changing - as options to become admin, so that admin do not get itself as admin", async () => {
    const { queryByTestId, getByTestId } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );
    const changeRoleButton = getByTestId("textUnderlineButton.1");
    fireEvent.press(changeRoleButton);
    await waitFor(() => {
      expect(queryByTestId("popUpTextvalue.1")).toBeNull();
    });
  });
});

describe("Testing RolesAndConnection screen. Change role button ", () => {
  it("It works to open overlay to change role", async () => {
    const { getByTestId, getByText } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );
    const changeRoleButton = getByTestId("textUnderlineButton.0");
    fireEvent.press(changeRoleButton);
    expect(getByTestId("popUpTextvalue.mainTitle").props.children).toBe(
      "Ändra nivå"
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
      <RolesAndConnection navigation={mockGoBack} />
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
      "Admin"
    );
  });
});

describe("Testing RolesAndConnection screen. Connected users dropdown ", () => {
  it("Dropdown should be shown if user has role admin or superadmin", async () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );

    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(3);

    expect(getByTestId("connected-users-dropdown-2")).toBeTruthy();
    expect(getByText("Admin4 Adminsson4")).toBeTruthy();

    expect(getByTestId("connected-users-dropdown-3")).toBeTruthy();
    expect(getByText("Admin2 Adminsson2")).toBeTruthy();

    expect(getByTestId("connected-users-dropdown-4")).toBeTruthy();
    expect(getByText("Johan Johansson")).toBeTruthy();
  });

  it("Dropdown should be all closed before press", async () => {
    const { queryByText, queryAllByTestId } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );

    expect(queryAllByTestId("pencil-icon")).toHaveLength(0);
    expect(queryByText("Admin:Super Supersson")).toBeNull();
  });

  it("Dropdown. Should open only one dropdown when user press on it", async () => {
    const { getAllByTestId, getByTestId } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );

    const firtsDropboxItem = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem);

    expect(getAllByTestId("arrow-drop-up-icon")).toHaveLength(1);
    expect(getAllByTestId("arrow-drop-down-icon")).toHaveLength(2);
    expect(getByTestId("pencil-icon")).toBeTruthy();
    expect(getByTestId("drop-down-admin-name").props.children).toBe(
      "Super Supersson"
    );
  });
  it("Dropdown. Should show the same admin name  ", async () => {
    const { getAllByTestId } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );
    const firtsDropboxItem1 = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem1);

    const firtsDropboxItem2 = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem2);

    const firtsDropboxItem3 = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem3);

    expect(getAllByTestId("drop-down-admin-name")[0].props.children).toBe(
      "Super Supersson"
    );
    expect(getAllByTestId("drop-down-admin-name")[1].props.children).toBe(
      "Super Supersson"
    );
    expect(getAllByTestId("drop-down-admin-name")[2].props.children).toBe(
      "Super Supersson"
    );
  });
  it("Dropdown. It should open an overlay with list of admins when user press on pencil icon. If the pressed user has role admin, then it should not be shown in the list because  user should not be an admin to himself/herself.", async () => {
    const { queryByTestId, getAllByTestId, getByText, getByTestId } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );
    const firtsDropboxItem1 = getAllByTestId("arrow-drop-down-icon")[0];
    fireEvent.press(firtsDropboxItem1);
    expect(getByText("Admin4 Adminsson4")).toBeTruthy();

    const pencilIcon = getByTestId("pencil-icon");
    fireEvent.press(pencilIcon);

    expect(getByTestId("popUpTextvalue.mainTitle").props.children).toBe(
      "Ändra admin"
    );

    await waitFor(() => {
      expect(getByTestId("popUpTextvalue.3").props.children).toBe(
        "Admin2 Adminsson2"
      );
      expect(getByTestId("popUpTextvalue.1").props.children).toBe(
        "Super Supersson"
      );

      expect(getByTestId("popUpTextvalue.6").props.children).toBe(
        "Super2 Supersson2"
      );
      expect(getByTestId("popUpTextvalue.7").props.children).toBe(
        "Super3 Supersson3"
      );

      expect(queryByTestId("popUpTextvalue.2")).toBeNull();
    });

    expect(getByText("Ok")).toBeTruthy();
  });

  it("Should be possible to change user admin by pressing on another admin in overlay list", async () => {
    const { getAllByTestId, getByTestId, getByText } = render(
      <RolesAndConnection navigation={mockGoBack} />
    );

    fireEvent.press(getAllByTestId("arrow-drop-down-icon")[0]);

    expect(getByTestId("drop-down-admin-name").props.children).toBe(
      "Super Supersson"
    );

    fireEvent.press(getByTestId("pencil-icon"));

    await waitFor(() => {
      fireEvent.press(getByTestId("popUpRadioButton.6"));
      fireEvent.press(getByText("Ok"));
    });

    expect(getByTestId("drop-down-admin-name").props.children).toBe(
      "Super2 Supersson2"
    );
  });

  it("Press to change admin of connected user. Update connectedUsersArray after saving changes", async () => {
    const { getAllByTestId, getByTestId, getByText } = render(
      <RolesAndConnection navigation={mockGoBack} />
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
