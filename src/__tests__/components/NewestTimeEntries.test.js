import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NewestTimeEntries from "../../components/NewestTimeEntries";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@react-navigation/native");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("../../components/CalendarView", () => () => {
  return <></>;
});

jest.mock("../../hooks/useTimeEntriesWithLimit", () => () => {
  return {
    timeEntries: [
      {
        adminID: "123",
        timeEntryID: "123",
        date: new Date(),
        statusConfirmed: false,
        time: 2,
        title: "title",
        activityID: "123",
      },
    ],
    isLoading: false,
    error: null,
  };
});

describe("Testing NewestTimeEntries", () => {
  it("can press on the button 'Visa allt'", () => {
    const navigate = jest.fn();

    const { getAllByText, getByTestId } = render(
      <NewestTimeEntries navigation={{ navigate }} />,
    );
    expect(getAllByText("Visa allt").length).toBe(1);
    const button = getByTestId("showAllButton");
    fireEvent.press(button);

    expect(navigate).toHaveBeenCalledWith("MyTimePage");
  });
});
