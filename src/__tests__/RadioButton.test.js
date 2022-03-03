import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

import RadioButton from "../components/RadioButton";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

jest.mock("../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    chooseActiveOrNot: jest.fn(),
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
    useAdminGalleryFunction().chooseActiveOrNot.mockReturnValue(true);
    const { getByTestId } = render(<RadioButton />);
    const buttonJa = getByTestId("pressOnButtonJa");
    fireEvent.press(buttonJa);
  });

  it("can press the button RadioButton Nej and send value false to context", () => {
    useAdminGalleryFunction().chooseActiveOrNot.mockReturnValue(false);
    const { getByTestId } = render(<RadioButton />);
    const buttonNej = getByTestId("pressOnButtonNej");
    fireEvent.press(buttonNej);
  });
});
