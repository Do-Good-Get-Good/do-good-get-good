import "react-native";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";

import TimeStatistics from "../components/TimeStatistics";
import { useActivityFunction } from "../context/ActivityContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

let entryTime0 = { nanoseconds: 0, seconds: 1648512000 };
let entryTime1 = { nanoseconds: 0, seconds: 1648512000 };

let entryTime = [
  {
    activityId: "id1",
    date: entryTime0,
    time: 0.5,
    statusConfirmed: "id",
    fbDocumentID: true,
  },
  {
    activityId: "id2",
    date: entryTime1,
    time: 1,
    statusConfirmed: "id",
    fbDocumentID: true,
  },
];

jest.mock("../context/ActivityContext", () => ({
  useActivityFunction: () => ({
    allListOfTimeEntry: jest.fn(),
  }),
}));

describe("Testing TimeStatistics ", () => {
  it("TimeStatistics currentForMonth", () => {
    useActivityFunction().allListOfTimeEntry = entryTime;
    const { getByTestId } = render(<TimeStatistics />);

    const currentForMonth = getByTestId("currentForMonth");

    //expect(currentForMonth.children).toBe(1.5);
  });

  it("TimeStatistics text Utförda timmar exist on screen", () => {
    const { getAllByText } = render(<TimeStatistics />);
    useActivityFunction().allListOfTimeEntry = entryTime;

    expect(getAllByText("Utförda timmar").length).toBe(1);
  });

  it("TimeStatistics text Denna månad exist on screen", () => {
    const { getAllByText } = render(<TimeStatistics />);
    useActivityFunction().allListOfTimeEntry = entryTime;

    expect(getAllByText("Denna månad").length).toBe(1);
  });
  it("TimeStatistics text Ersatta timmar exist on screen", () => {
    const { getAllByText } = render(<TimeStatistics />);
    useActivityFunction().allListOfTimeEntry = entryTime;

    expect(getAllByText("Ersatta timmar").length).toBe(1);
  });
});
