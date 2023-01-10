import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

import TimeStatistics from "../components/TimeStatistics";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

const mockTimeObject = [
  {
    accumulatedTime: 1,
    activityID: "activityID",
    adminID: "adminID",
    connectedActivities: ["activityID"],
    paidTime: 2,
    timeForYear: 1,
    currentForMonth: 1,
  },
];

describe("Testing TimeStatistics ", () => {
  it("TimeStatistics timeForYear text", () => {
    const { getByTestId } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );
    const currentForYear = getByTestId("timeForYear");
    expect(currentForYear.children[0]).toBe("Totalt antal timmar i år: 1");
  });

  it("TimeStatistics text Utförda timmar exist on screen", () => {
    const { getAllByText } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );
    expect(getAllByText("Utförda timmar").length).toBe(1);
  });

  it("TimeStatistics text Denna månad exist on screen", () => {
    const { getAllByText, getByTestId } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );

    expect(getByTestId("currentForMonth").children[0]).toBe("1");
    expect(getAllByText("Denna månad").length).toBe(1);
  });
  it("TimeStatistics text Ersatta timmar exist on screen", () => {
    const { getAllByText, getByTestId } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );
    expect(getByTestId("paidTime").children[0]).toBe("2");
    expect(getAllByText("Ersatta timmar").length).toBe(1);
  });
});
