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
        id: "1",
        adminID: "adminID",
        firstName: "Super",
        lastName: "Supersson",
        role: "superadmin",
        statusActive: true,
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
    const { getByText } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );
    expect(getByText("Super Supersson")).toBeTruthy();
    expect(getByText("Nivå")).toBeTruthy();
    expect(getByText("Super admin")).toBeTruthy();
    expect(getByText("Admin")).toBeTruthy();
    expect(getByText("Admin Adminsson")).toBeTruthy();
  });

  it("It works to change role", async () => {
    const { getByTestId, queryByTestId, queryByText, debug } = render(
      <RolesAndConnection navigation={navigationMock} />,
    );

    const changeRoleButton = getByTestId("textUnderlineButton.0");
    fireEvent.press(changeRoleButton);
    debug();
    expect(queryByTestId("popUpTextvalue.mainTitle.Ändra nivå"));
    expect(queryByTestId("popUpTextvalue.user"));
    expect(queryByTestId("popUpTextvalue.admin"));
    expect(queryByTestId("popUpTextvalue.superadmin"));
    expect(queryByText("Ok")).toBeTruthy();
  });
});
