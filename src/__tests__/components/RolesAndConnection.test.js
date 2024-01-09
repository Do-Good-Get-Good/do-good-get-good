import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { superAdminObjectMock } from "../dataMock/mocksSuperAdmin";
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
    allAdminsAnsSuperAdmins: [
      {
        id: "3",
        adminID: "2",
        firstName: "Admin2",
        lastName: "Adminsson2",
        role: "admin",
        statusActive: true,
      },
      {
        id: "2",
        adminID: "1",
        firstName: "Admin",
        lastName: "Adminsson",
        role: "admin",
        statusActive: true,
      },
      {
        id: "1",
        adminID: "adminID",
        firstName: "Super",
        lastName: "Supersson",
        role: "superadmin",
        statusActive: true,
      },
      {
        id: "6",
        adminID: "2",
        firstName: "Super2",
        lastName: "Supersson2",
        role: "superadmin",
        statusActive: true,
      },

      {
        id: "7",
        adminID: "6",
        firstName: "Super3",
        lastName: "Supersson3",
        role: "superadmin",
        statusActive: false,
      },
    ],
    makeChangesForSelectedUser: {
      adminName: "Admin Adminsson",
      arrayOfUsersIfAdmin: [
        {
          id: "3",
          adminID: "2",
          firstName: "Admin2",
          lastName: "Adminsson2",
          role: "admin",
          statusActive: true,
        },
        {
          id: "4",
          adminID: "2",
          firstName: "Johan",
          lastName: "Johansson",
          role: "user",
          statusActive: true,
        },
        {
          id: "4",
          adminID: "2",
          firstName: "Johan2",
          lastName: "Johansson2",
          role: "user",
          statusActive: true,
        },
      ],
      user: {
        id: "1",
        adminID: "adminID",
        firstName: "Super",
        lastName: "Supersson",
        role: "superadmin",
        statusActive: true,
      },
    },
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
    const { getByTestId, queryByTestId, queryByText } = render(
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
    expect(queryByText("Ok")).toBeTruthy();
  });

  it("It works to change role", async () => {
    const { getByTestId, getByText, getAllByTestId, queryByTestId, debug } =
      render(<RolesAndConnection navigation={navigationMock} />);

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
    const { getByTestId, debug, queryByTestId } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    const changeRoleButton = getByTestId("textUnderlineButton.1");
    fireEvent.press(changeRoleButton);

    expect(queryByTestId("popUpTextvalue.mainTitle").props.children).toBe(
      "Ändra admin",
    );
    debug();
    await waitFor(() => {
      expect(getByTestId("popUpTextvalue.3").props.children).toBe(
        "Admin2 Adminsson2",
      );
      expect(getByTestId("popUpTextvalue.2").props.children).toBe(
        "Admin Adminsson",
      );
      expect(getByTestId("popUpTextvalue.1").props.children).toBe(
        "Super Supersson",
      );
      expect(getByTestId("popUpTextvalue.6").props.children).toBe(
        "Super2 Supersson2",
      );
      expect(queryByTestId("popUpTextvalue.7")).toBeNull();
    });
    // expect(queryByText("Ok")).toBeTruthy();
  });
});
