import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import DropDownForSorting from "../../components/DropDownForSorting";
import { expect } from "@jest/globals";

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("@react-navigation/native");

describe("Testing DropDownForSorting", () => {
  let mockChoice = undefined;

  function updateMockChoice(value) {
    mockChoice = value;
  }

  it("Renders the correct sort options for MyTimeEntries screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "MyTimePage",
    });

    const { getByTestId } = render(<DropDownForSorting choice={() => {}} />);

    const dropdownText = getByTestId("sortByText").children[0];
    expect(dropdownText).toEqual("Datum");

    const dropdown = getByTestId("dropDownPressed");
    expect(dropdown);
    fireEvent.press(dropdown);

    const dropdownItem0 =
      getByTestId("dropdownItem0").children[0].props.children;
    const dropdownItem1 =
      getByTestId("dropdownItem1").children[0].props.children;
    const dropdownItem2 =
      getByTestId("dropdownItem2").children[0].props.children;

    expect(dropdownItem0).toEqual("Datum");
    expect(dropdownItem1).toEqual("Godkända");
    expect(dropdownItem2).toEqual("Inte godkända");
  });

  it("Can press first dropdown item for MyTimeEntries screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "MyTimePage",
    });

    const { getByTestId } = render(
      <DropDownForSorting choice={updateMockChoice} />,
    );

    const dropdown = getByTestId("dropDownPressed");
    expect(dropdown);

    // Open dropdown
    fireEvent.press(dropdown);

    const dropdownItem = getByTestId("dropdownItem0");

    fireEvent.press(dropdownItem);
    expect(mockChoice).toEqual("Datum");
  });

  it("Can press second dropdown item for MyTimeEntries screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "MyTimePage",
    });

    const { getByTestId } = render(
      <DropDownForSorting choice={updateMockChoice} />,
    );

    const dropdown = getByTestId("dropDownPressed");
    expect(dropdown);

    // Open dropdown
    fireEvent.press(dropdown);

    const dropdownItem = getByTestId("dropdownItem1");

    fireEvent.press(dropdownItem);
    expect(mockChoice).toEqual("Godkända");
  });

  it("Can press third dropdown item for MyTimeEntries screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "MyTimePage",
    });

    const { getByTestId } = render(
      <DropDownForSorting choice={updateMockChoice} />,
    );

    const dropdown = getByTestId("dropDownPressed");
    expect(dropdown);

    // Open dropdown
    fireEvent.press(dropdown);

    const dropdownItem = getByTestId("dropdownItem2");

    fireEvent.press(dropdownItem);
    expect(mockChoice).toEqual("Inte godkända");
  });

  it("Renders the correct sort options for AdminGallery screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });

    const { getByTestId } = render(<DropDownForSorting choice={() => {}} />);

    const dropdownText = getByTestId("sortByText").children[0];
    expect(dropdownText).toEqual("Name");

    const dropdown = getByTestId("dropDownPressed");
    expect(dropdown);
    fireEvent.press(dropdown);

    const dropdownItem0 =
      getByTestId("dropdownItem0").children[0].props.children;
    const dropdownItem1 =
      getByTestId("dropdownItem1").children[0].props.children;
    const dropdownItem2 =
      getByTestId("dropdownItem2").children[0].props.children;

    expect(dropdownItem0).toEqual("Favoriter");
    expect(dropdownItem1).toEqual("Namn");
    expect(dropdownItem2).toEqual("Plats");
  });

  it("Can press first dropdown item for AdminGallery screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });

    const { getByTestId } = render(
      <DropDownForSorting choice={updateMockChoice} />,
    );

    const dropdown = getByTestId("dropDownPressed");
    expect(dropdown);

    // Open dropdown
    fireEvent.press(dropdown);

    const dropdownItem = getByTestId("dropdownItem0");

    fireEvent.press(dropdownItem);
    expect(mockChoice).toEqual("Favoriter");
  });

  it("Can press second dropdown item for AdminGallery screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });

    const { getByTestId } = render(
      <DropDownForSorting choice={updateMockChoice} />,
    );

    const dropdown = getByTestId("dropDownPressed");
    expect(dropdown);

    // Open dropdown
    fireEvent.press(dropdown);

    const dropdownItem = getByTestId("dropdownItem1");

    fireEvent.press(dropdownItem);
    expect(mockChoice).toEqual("Namn");
  });

  it("Can press third dropdown item for AdminGallery screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });

    const { getByTestId } = render(
      <DropDownForSorting choice={updateMockChoice} />,
    );

    const dropdown = getByTestId("dropDownPressed");
    expect(dropdown);

    // Open dropdown
    fireEvent.press(dropdown);

    const dropdownItem = getByTestId("dropdownItem2");

    fireEvent.press(dropdownItem);
    expect(mockChoice).toEqual("Plats");
  });
});
