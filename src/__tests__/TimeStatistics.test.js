import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

import TimeStatistics from "../components/TimeStatistics";

import { format } from "date-fns";
import { sv } from "date-fns/locale";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

const mockTimeObject = [
  {
    paidTime: 10,
    timeForYear: 10,
    currentForMonth: 5,
  },
];

jest.mock("../context/TimeStatisticsContext", () => ({
  useTimeStatisticSettings: () => ({
    maxConfirmedHours: 8,
  }),
}));

jest.mock("@react-navigation/native");

describe("Testing TimeStatistics", () => {
  require("@react-navigation/native").useRoute.mockReturnValue({
    name: "HomePage",
  });

  it("timeForYear text exist", () => {
    const { getByTestId } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );
    const currentForYear = getByTestId("timeForYear");
    expect(currentForYear.children[0]).toBe(
      `Timmar godkända ${new Date().getFullYear()}: 10`
    );
  });

  it("Header text exist on screen", () => {
    const { getAllByText } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );
    const month = format(new Date(), "MMMM", {
      locale: sv,
    });

    expect(getAllByText(`Timmar ${month}`).length).toBe(1);
  });

  it("Text 'Registrerade' exist", () => {
    const { getAllByText, getByTestId } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );

    expect(getByTestId("currentForMonth").children[0]).toBe("5");
    expect(getAllByText("Registrerade").length).toBe(1);
  });

  it("Text 'Godkända' exist", () => {
    const { getAllByText, getByTestId } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );
    expect(getByTestId("confirmedTime").children[0]).toEqual("10");
    expect(getAllByText("Godkända").length).toBe(1);
  });

  it("Text 'Ersatta' exist", () => {
    const { getAllByText, getByTestId } = render(
      <TimeStatistics timeObject={mockTimeObject} />
    );
    const year = new Date().getFullYear();
    expect(getByTestId("paidTime").children[0]).toEqual("5 / 8");
    expect(getAllByText(`Ersatta ${year}`).length).toBe(1);
  });
});
