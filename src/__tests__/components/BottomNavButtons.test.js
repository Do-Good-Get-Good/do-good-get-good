import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import BottomNavButtons from "../../components/BottomNavButtons";

describe("Testing BottomNavButtons", () => {
  it("Can find primary and secondary button and press them", () => {
    const { getByText } = render(
      <BottomNavButtons
        primaryText="Primary"
        secondaryText="Secondary"
        primaryFunc={() => {}}
        secondaryFunc={() => {}}
      />
    );
    const primaryButton = getByText("Primary");
    const secondaryButton = getByText("Secondary");

    expect(primaryButton);
    expect(secondaryButton);

    fireEvent.press(primaryButton);
    fireEvent.press(secondaryButton);
  });
});
