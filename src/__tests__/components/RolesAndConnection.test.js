import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { superAdminObjectMock } from "../dataMock/mocksSuperAdmin";
import { RolesAndConnection } from "../../screens/RolesAndConnection";

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

jest.mock("../../context/SuperAdminContext/useSuperAdminFunction", () => ({
  useSuperAdminFunction: () => ({
    makeChangesForSelectedUser: superAdminObjectMock,
  }),
}));

describe("Testing RolesAndConnection screen ", () => {
  it("Go back button is showen and navigate back", () => {
    const { getByTestId } = render(<RolesAndConnection />);
    expect(getByTestId("goBackButton"));
  });
});
