import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

import SearchBarComponent from "../components/SearchBarComponent";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    activeOrInactiveActivity: false,
    word: jest.fn(),
  }),
}));

jest.mock("../context/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    word: jest.fn(),
  }),
}));

describe("Testing SearchBarComponent", () => {
  it("SearchBarComponent exist TextInput and it's possible to wrire a text there", () => {
    const { getByPlaceholderText } = render(<SearchBarComponent />);

    fireEvent.changeText(getByPlaceholderText("Sök"), "activity name or title");
  });

  it("SearchBarComponent send searching word when you press on the button", () => {
    useAdminGalleryFunction().word.mockReturnValue("word");
    const { getByTestId } = render(<SearchBarComponent />);
    const button = getByTestId("searchButtonPressed");
    fireEvent.press(button);
  });
});
