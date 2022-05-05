import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

import TimeStatistics from "../components/TimeStatistics";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../context/ActivityContext", () => ({
  useActivityFunction: () => ({
    activitiesIDandAccumTime: [
      {
        accumulatedTime: 1,
        activityID: "activityID",
        adminID: "adminID",
        connectedActivities: ["activityID"],
        paidTime: 1,
        timeForYear: 1,
        currentForMonth: 1,
      },
    ],
  }),
}));

describe("Testing TimeStatistics ", () => {
  it("TimeStatistics timeForYear text", () => {
    const { getByTestId } = render(<TimeStatistics />);
    const currentForMonth = getByTestId("timeForYear");
    expect(currentForMonth.children[0]).toBe("Totalt antal timmar i år: ");
  });

  it("TimeStatistics text Utförda timmar exist on screen", () => {
    const { getAllByText } = render(<TimeStatistics />);
    expect(getAllByText("Utförda timmar").length).toBe(1);
  });

  it("TimeStatistics text Denna månad exist on screen", () => {
    const { getAllByText } = render(<TimeStatistics />);

    expect(getAllByText("Denna månad").length).toBe(1);
  });
  it("TimeStatistics text Ersatta timmar exist on screen", () => {
    const { getAllByText } = render(<TimeStatistics />);

    expect(getAllByText("Ersatta timmar").length).toBe(1);
  });
});
