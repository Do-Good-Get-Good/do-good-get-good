import "react-native";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";

import TimeStatistics from "../components/TimeStatistics";
import { useActivityFunction } from "../context/ActivityContext";
import { toDate } from "date-fns";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

let entryTime = [
  {
    activityId: "id1",
    date: { toDate: () => new Date() },
    time: 0.5,
    statusConfirmed: true,
    fbDocumentID: "id",
  },
  {
    activityId: "id2",
    date: { toDate: () => new Date() },
    time: 1,
    statusConfirmed: true,
    fbDocumentID: "id",
  },
  {
    activityId: "id2",
    date: { toDate: () => new Date() },
    time: 2,
    statusConfirmed: false,
    fbDocumentID: "id",
  },
];

jest.mock("../context/ActivityContext", () => ({
  useActivityFunction: () => ({
    allListOfTimeEntry: entryTime,
  }),
}));

describe("Testing TimeStatistics ", () => {
  it("TimeStatistics currentForMonth", () => {
    useActivityFunction().allListOfTimeEntry = entryTime;
    const { getByTestId } = render(<TimeStatistics />);
    const currentForMonth = getByTestId("currentForMonth");
    expect(currentForMonth.children[0]).toBe("3.5");
  });

  it("TimeStatistics paidTime", () => {
    useActivityFunction().allListOfTimeEntry = entryTime;
    const { getByTestId } = render(<TimeStatistics />);
    const currentForMonth = getByTestId("paidTime");
    expect(currentForMonth.children[0]).toBe("1.5");
  });

  it("TimeStatistics timeForYear", () => {
    useActivityFunction().allListOfTimeEntry = entryTime;
    const { getByTestId } = render(<TimeStatistics />);
    const currentForMonth = getByTestId("timeForYear");
    expect(currentForMonth.children[0]).toBe("Totall antal timmar i år: ");
    expect(currentForMonth.children[1]).toBe("3.5");
  });

  it("TimeStatistics text Utförda timmar exist on screen", () => {
    const { getAllByText } = render(<TimeStatistics />);
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
