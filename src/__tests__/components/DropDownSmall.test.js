import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import { DropDownSmall } from "../../components/DropDownSmall";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("../../context/CreateActivityContext/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    activeActivities: jest.fn(),
    chooseInDropDown: jest.fn(),
  }),
}));

jest.mock("@react-navigation/native");

console.log = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testing DropDownSmall", () => {
  it("can see that you are in CreateActivity screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "CreateActivity",
    });
    const { getAllByText, queryAllByText } = render(<DropDownSmall />);
    expect(getAllByText("Välj aktivitet").length).toBe(1);
    expect(queryAllByText("Datum").length).toBe(0);
  });

  it("can see that you are in AdminActivityGallery screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });
    const { getAllByText, queryAllByText } = render(<DropDownSmall />);
    expect(getAllByText("Datum").length).toBe(1);
    expect(queryAllByText("Aktivitet").length).toBe(0);
  });

  it("can press the dropDown to open", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "CreateActivity",
    });
    const { getByTestId, getAllByTestId, getAllByText } = render(
      <DropDownSmall />
    );

    expect(getAllByTestId("dropDownPressed").length).toBe(1);
    const dropDownButton = getByTestId("dropDownPressed");
    fireEvent.press(dropDownButton);

    expect(getAllByText("Skapa ny aktivitet").length).toBe(1);
  });

  it("can press on Skapa ny aktivitet inside the dropDown in CreateActivity screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "CreateActivity",
    });
    const { getByTestId, getAllByTestId, queryAllByTestId, getAllByText } =
      render(<DropDownSmall />);

    expect(getAllByTestId("dropDownPressed").length).toBe(1);
    const dropDownButton = getByTestId("dropDownPressed");
    fireEvent.press(dropDownButton);

    const activitysInsideDropDown = getAllByTestId("insideDropDownPressed");
    expect(getAllByText("Skapa ny aktivitet").length).toBe(1);

    fireEvent.press(activitysInsideDropDown[0]);
    const closingDropDown = queryAllByTestId("insideDropDownPressed");
    expect(closingDropDown).toEqual([]);
  });

  it("can press on Favoriter inside the dropDown in AdminActivityGallery screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });
    const { getByTestId, getAllByTestId, queryAllByTestId, getAllByText } =
      render(<DropDownSmall />);

    expect(getAllByTestId("dropDownPressed").length).toBe(1);
    const dropDownButton = getByTestId("dropDownPressed");
    fireEvent.press(dropDownButton);

    const activitysInsideDropDown = getAllByTestId("insideDropDownPressed");
    expect(getAllByText("Favoriter").length).toBe(1);
    expect(getAllByText("Namn").length).toBe(1);
    expect(getAllByText("Plats").length).toBe(1);

    fireEvent.press(activitysInsideDropDown[1]);
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it("can press on Namn inside the dropDown in AdminActivityGallery screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });
    const { getByTestId, getAllByTestId, getAllByText } = render(
      <DropDownSmall />
    );

    const dropDownButton = getByTestId("dropDownPressed");
    fireEvent.press(dropDownButton);

    const activitysInsideDropDown = getAllByTestId("insideDropDownPressed");
    expect(getAllByText("Favoriter").length).toBe(1);
    expect(getAllByText("Namn").length).toBe(1);
    expect(getAllByText("Plats").length).toBe(1);

    fireEvent.press(activitysInsideDropDown[1]);
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it("can press on Plats inside the dropDown in AdminActivityGallery screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });
    const { getByTestId, getAllByTestId, getAllByText } = render(
      <DropDownSmall />
    );

    const dropDownButton = getByTestId("dropDownPressed");
    fireEvent.press(dropDownButton);

    const activitysInsideDropDown = getAllByTestId("insideDropDownPressed");
    expect(getAllByText("Favoriter").length).toBe(1);
    expect(getAllByText("Namn").length).toBe(1);
    expect(getAllByText("Plats").length).toBe(1);

    fireEvent.press(activitysInsideDropDown[2]);
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it("can press the dropDown to close", () => {
    const { getByTestId, getAllByTestId, queryAllByTestId } = render(
      <DropDownSmall />
    );

    const dropDownButton = getByTestId("dropDownPressed");
    fireEvent.press(dropDownButton);

    const activitysInsideDropDown = getAllByTestId("insideDropDownPressed");
    expect(getAllByTestId("insideDropDownPressed").length).toBe(
      activitysInsideDropDown.length
    );

    fireEvent.press(dropDownButton);
    const ActivityText = queryAllByTestId("insideDropDownPressed");
    expect(ActivityText).toEqual([]);
  });
});
