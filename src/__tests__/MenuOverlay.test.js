import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import MenuOverlay from "../components/MenuOverlay";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe("Testing MenuOverlay", () => {
  it("Is the close button visible", () => {
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("Stäng").length).toBe(1);
  });

  it("Is the change language button visible", () => {
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("Byt språk knapp").length).toBe(1);
  });

  it("Is the home button visible", () => {
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("Hem").length).toBe(1);
  });

  it("Is the activities button visible", () => {
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("Aktiviteter").length).toBe(1);
  });

  it("Is the my time button visible", () => {
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("Min tid").length).toBe(1);
  });

  it("Is the about button visible", () => {
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("Om konceptet").length).toBe(1);
  });

  it("Is the FAQ button visible", () => {
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("FAQ").length).toBe(1);
  });

  it("Is the log out button visible", () => {
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("Logga ut").length).toBe(1);
  });
});
