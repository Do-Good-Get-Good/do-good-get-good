import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import Menu from "../../components/Menu";

jest.mock("../../components/MenuOverlay", () => {
  return {
    __esModule: true,
    MenuOverlay: jest.fn(),
  };
});

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

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

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: () => ({
    isConnected: false,
  }),
}));

describe("Testing Menu for User and Admin", () => {
  it("can find the text Meny in menu", () => {
    const { getAllByText } = render(<Menu />);
    expect(getAllByText("Meny").length).toBe(1);
  });

  it("can find a Do Good Get Good Icon", () => {
    const { getByTestId } = render(<Menu />);
    const logo = getByTestId("dgggLogo");
    expect(logo.props["source"].testUri).toBe(
      "../../../assets/images/Logotyp_DGGG.png"
    );
  });
  it("can press the button", () => {
    const { getByTestId } = render(<Menu />);
    const button = getByTestId("showOverlayButton");
    fireEvent.press(button);
  });

  it("Connection to internet ", () => {
    const { getAllByText } = render(<Menu />);

    expect(
      getAllByText(
        "Ingen internetanslutning, dina ändringar kanske inte sparas"
      ).length
    ).toBe(1);
  });
});
