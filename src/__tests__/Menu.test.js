import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import UserMenu from "../components/Menu";
import { useNetInfo } from "@react-native-community/netinfo";

jest.mock("../components/MenuOverlay", () => () => {
  return <mockMenuOverlay />;
});

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: () => ({
    isConnected: false,
  }),
}));

describe("Testing Menu for User and Admin", () => {
  it("can find the text Meny in menu", () => {
    const { getAllByText } = render(<UserMenu />);
    expect(getAllByText("Meny").length).toBe(1);
  });

  it("can find a Do Good Get Good Icon", () => {
    const { getByTestId } = render(<UserMenu />);
    const logo = getByTestId("dgggLogo");
    expect(logo.props["source"].testUri).toBe("../../../img/Logotyp_DGGG.png");
  });
  it("can press the button", () => {
    const { getByTestId } = render(<UserMenu />);
    const button = getByTestId("showOverlayButton");
    fireEvent.press(button);
  });

  it("Connection to internet ", () => {
    const { getAllByText } = render(<UserMenu />);

    expect(
      getAllByText(
        "Ingen internetanslutning, dina ändringar kanske inte sparas"
      ).length
    ).toBe(1);
  });
});
