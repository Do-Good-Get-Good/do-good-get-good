import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import RadioButton from "../../components/RadioButton";
import { useAdminGalleryFunction } from "../../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../../context/CreateActivityContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("../../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    chooseActiveOrNot: jest.fn(),
    word: jest.fn(),
    setSearchWordHasNoMatch: jest.fn(),
    setCleanUpSearchBarComponent: jest.fn(),
  }),
}));

jest.mock("../../context/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    word: jest.fn(),
    setSearchWordHasNoMatch: jest.fn(),
  }),
}));

describe("Testing Radio Button", () => {
  it("can find RadioButton Ja", () => {
    const { getAllByText } = render(<RadioButton />);
    expect(getAllByText("Ja").length).toBe(1);
  });

  it("can find RadioButton Nej", () => {
    const { getAllByText } = render(<RadioButton />);
    expect(getAllByText("Nej").length).toBe(1);
  });

  it("can press the button RadioButton Ja and send value true to context", () => {
    const { getByTestId } = render(<RadioButton />);
    const buttonJa = getByTestId("pressOnButtonJa");
    fireEvent.press(buttonJa);
    useAdminGalleryFunction().word.mockReturnValue("");
    useAdminGalleryFunction().setSearchWordHasNoMatch.mockReturnValue(false);
    useAdminGalleryFunction().setCleanUpSearchBarComponent.mockReturnValue(
      true,
    );
    useAdminGalleryFunction().chooseActiveOrNot.mockReturnValue(true);
  });

  it("can press the button RadioButton Nej and send value false to context", () => {
    const { getByTestId } = render(<RadioButton />);
    const buttonNej = getByTestId("pressOnButtonNej");
    fireEvent.press(buttonNej);
    useAdminGalleryFunction().chooseActiveOrNot.mockReturnValue(false);
    useCreateActivityFunction().word.mockReturnValue("");
    useCreateActivityFunction().setSearchWordHasNoMatch.mockReturnValue(false);
    useAdminGalleryFunction().setCleanUpSearchBarComponent.mockReturnValue(
      true,
    );
  });
});
