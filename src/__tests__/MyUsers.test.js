import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyUsers from "../components/MyUsers";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../context/CreateUserContext", () => ({
  useCreateUserFunction: () => ({
    getChangedUserInfoTo: jest.fn(),
  }),
}));

describe("Testing MyUsers component", () => {
  describe("Header view", () => {
    it("can find the my users text", () => {
      const { getAllByText } = render(<MyUsers />);
      expect(getAllByText("Mina användare").length).toBe(1);
    });

    it("can find the default text inside the small dropdown", () => {
      const { getByTestId } = render(<MyUsers />);
      expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");
    });

    it("can press the small dropdown to open", () => {
      const { getByTestId } = render(<MyUsers />);
      const button = getByTestId("smallDropdown");
      fireEvent.press(button);
      expect(getByTestId("insideSmallDropdownText 0").props.children).toEqual(
        "A - Ö"
      );
      expect(getByTestId("insideSmallDropdownText 1").props.children).toEqual(
        "Inaktiva"
      );
    });

    it("can press on A - Ö inside the small dropdown", () => {
      const { getByTestId } = render(<MyUsers />);
      const button = getByTestId("smallDropdown");
      fireEvent.press(button);

      const button2 = getByTestId("insideSmallDropdown 0");
      fireEvent.press(button2);
      expect(getByTestId("dropdownText").props.children).toEqual("A - Ö");
    });

    it("can press on Inaktiva inside the small dropdown", () => {
      const { getByTestId } = render(<MyUsers />);
      const button = getByTestId("smallDropdown");
      fireEvent.press(button);

      const button3 = getByTestId("insideSmallDropdown 1");
      fireEvent.press(button3);
      expect(getByTestId("dropdownText").props.children).toEqual("Inaktiva");
    });
  });
  describe("Content view", () => {
    it("can find content view", () => {
      const { getByTestId } = render(<MyUsers />);
      getByTestId("contentViewId");
    });
  });
});
