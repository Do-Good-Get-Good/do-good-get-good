import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import SearchBarComponentOld from "../../components/SearchBarComponentOld";
import { useAdminGalleryFunction } from "../../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../../context/CreateActivityContext/CreateActivityContext";

jest.mock("../../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    activeOrInactiveActivity: false,
    word: jest.fn(),
    setCleanUpSearchBarComponent: jest.fn(),
    cleanUpSearchBarComponent: true,
  }),
}));

jest.mock("../../context/CreateActivityContext/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    word: jest.fn(),
  }),
}));

describe("Testing SearchBarComponent", () => {
  it("SearchBarComponent exist TextInput and it's possible to wrire a text there", () => {
    const { getByPlaceholderText } = render(<SearchBarComponentOld />);
    const input = getByPlaceholderText("Sök");
    fireEvent.changeText(input, "activity name or title");
    expect(input.props.value).toEqual("activity name or title");
  });

  it("SearchBarComponent send searching word when you press on the button for active array", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SearchBarComponentOld />
    );
    const button = getByTestId("searchButtonPressed");
    const input = getByPlaceholderText("Sök");
    fireEvent.changeText(input, "activity name or title");
    expect(input.props.value).toEqual("activity name or title");
    fireEvent.press(button);
    useAdminGalleryFunction().word.mockReturnValue("activity name or title");
  });

  it("SearchBarComponent send searching word when you press on the button for inactive array ", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SearchBarComponentOld />
    );
    useAdminGalleryFunction().activeOrInactiveActivity = true;
    const button = getByTestId("searchButtonPressed");
    const input = getByPlaceholderText("Sök");
    fireEvent.changeText(input, "activity name or title");
    expect(input.props.value).toEqual("activity name or title");
    fireEvent.press(button);
    useCreateActivityFunction().word.mockReturnValue("activity name or title");
  });
});
