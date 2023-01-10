import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyTimeEntries from "../components/MyTimeEntries";
import useTimeEntriesWithLimit from "../customFirebaseHooks/useTimeEntriesWithLimit";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});
jest.mock("../components/Menu", () => () => {
  return <mockDropDownForSorting />;
});

jest.mock("../components/CalendarView", () => () => {
  return <fakeCalenderView />;
});

jest.mock("../components/DropDownForSorting", () => () => {
  return <></>;
});

jest.mock("@react-navigation/native");

jest.mock("../customFirebaseHooks/useTimeEntriesWithLimit");

describe("Testing MyTimeEntries", () => {
  beforeAll(() => {
    useTimeEntriesWithLimit.mockReturnValue({
      timeEntries: [
        {
          adminID: "123",
          timeEntryID: "123",
          date: new Date(),
          statusConfirmed: false,
          time: 2,
          title: "Missing people",
          activityID: "123",
        },
      ],
      isLoading: false,
      error: null,
    });
  });

  it("can find the text Min tid", () => {
    const { getAllByText } = render(<MyTimeEntries />);
    expect(getAllByText("Mina aktiviteter").length).toBe(1);
  });

  it("can find the activity title", () => {
    const { getAllByText } = render(<MyTimeEntries />);
    expect(getAllByText("Missing people").length).toBe(1);
  });

  it("can find the activity date", () => {
    const { getAllByText } = render(<MyTimeEntries />);
    expect(getAllByText(new Date().toISOString().slice(0, 10)).length).toBe(1);
  });

  it("can find the activity time", () => {
    const { getAllByText } = render(<MyTimeEntries />);
    expect(getAllByText("2 tim").length).toBe(1);
  });

  it("can press the edit button if statusConfirmed is false", () => {
    const { getAllByTestId } = render(<MyTimeEntries />);
    const button = getAllByTestId("editButton")[0];
    fireEvent.press(button);
    expect(button).toBeTruthy();
  });

  it("the edit button is unabled when statusConfirmed is true", () => {
    const { queryByTestId } = render(<MyTimeEntries />);
    queryByTestId("icon");
  });
});
