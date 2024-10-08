import { fireEvent, render } from "@testing-library/react-native";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import each from "jest-each";
import React from "react";
import "react-native";
import CalendarView, {
  calculateNewHours,
  checkIfSameMonth,
} from "../../components/CalendarView";
import { Arithmetic } from "../../lib/enums/arithmetic.js";

jest.mock("../../firebase-functions/delete", () => ({
  deleteTimeEntry: jest.fn(() => {
    return Promise.resolve();
  }),
}));

jest.mock("../../firebase-functions/add", () => ({
  addTimeEntry: jest.fn(),
}));

jest.mock("../../firebase-functions/update", () => ({
  updateTotalHoursMonthForUser: jest.fn(),
  updateTimeEntry: jest.fn(() => {
    return Promise.resolve();
  }),
}));

jest.mock("@react-native-firebase/auth", () => () => ({
  currentUser: {
    uid: "uid",
  },
}));

describe("Testing CalendarView", () => {
  const fakeActivity = {
    title: "Katthem",
    city: "Göteborg",
    time: 0,
    date: "2022-01-19T12:30:00.000Z",
    id: "abc",
  };

  const mockToggleVisibility = jest.fn();

  describe("Tests for both new/editing time input modes", () => {
    it("Increasing time input (increments of 0.5) when pressing '+'", () => {
      const componentToRender = (
        <CalendarView
          visible={true}
          activity={fakeActivity}
          isEditing={false}
          adminID="123"
        />
      );
      const { getByText, getByTestId } = render(componentToRender);

      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0");

      const increaseTimeButton = getByText("+");
      fireEvent.press(increaseTimeButton);

      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0.5");

      const dateAndHourInput =
        format(new Date(), "eee d LLLL", { locale: sv }) + ", 0.5h";
      expect(getByTestId("calendarView.dateAndHourInput").children[0]).toEqual(
        dateAndHourInput
      );
    });

    it("Decreasing time input (decrements of 0.5) when pressing '-'", () => {
      const componentToRender = (
        <CalendarView
          visible={true}
          activity={fakeActivity}
          isEditing={false}
          adminID="123"
        />
      );
      const { getByText, getByTestId } = render(componentToRender);

      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0");

      const increaseTimeButton = getByText("+");
      fireEvent.press(increaseTimeButton);
      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0.5");
      var dateAndHourInput =
        format(new Date(), "eee d LLLL", { locale: sv }) + ", 0.5h";
      expect(getByTestId("calendarView.dateAndHourInput").children[0]).toEqual(
        dateAndHourInput
      );

      const decreaseTimeButton = getByText("-");
      fireEvent.press(decreaseTimeButton);
      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0");
      dateAndHourInput =
        format(new Date(), "eee d LLLL", { locale: sv }) + ", 0h";
      expect(getByTestId("calendarView.dateAndHourInput").children[0]).toEqual(
        dateAndHourInput
      );
    });

    it("Lowest time input is 0", () => {
      const componentToRender = (
        <CalendarView
          visible={true}
          activity={fakeActivity}
          isEditing={false}
          adminID="123"
        />
      );
      const { getByText, getByTestId } = render(componentToRender);

      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0");

      const decreaseTimeButton = getByText("-");
      fireEvent.press(decreaseTimeButton);
      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0");
      var dateAndHourInput =
        format(new Date(), "eee d LLLL", { locale: sv }) + ", 0h";
      expect(getByTestId("calendarView.dateAndHourInput").children[0]).toEqual(
        dateAndHourInput
      );
    });
  });

  describe("Tests for new time input", () => {
    it("Renders the component correctly when not editing", () => {
      const componentToRender = (
        <CalendarView
          visible={true}
          activity={fakeActivity}
          isEditing={false}
          adminID="123"
        />
      );
      const { getAllByText, getByText, getByTestId, queryByText } =
        render(componentToRender);

      expect(getByTestId("calendarView.headerText").children[0]).toEqual(
        "Katthem - Göteborg"
      );
      expect(getAllByText("Välj datum").length).toBe(1);
      expect(getAllByText("Hur lång aktivitet?").length).toBe(1);
      getByText("-");
      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0");
      getByText("+");
      const dateAndHourInput =
        format(new Date(), "eee d LLLL", { locale: sv }) + ", 0h";
      expect(getByTestId("calendarView.dateAndHourInput").children[0]).toEqual(
        dateAndHourInput
      );
      expect(getAllByText("Logga tid").length).toBe(1);

      // Should only exist if editing time
      const changeTimeButton = queryByText("Ändra tid");
      expect(changeTimeButton).toBeNull();
      const deleteTimeButton = queryByText("Ta bort tid");
      expect(deleteTimeButton).toBeNull();
    });

    it("Pressing 'Logga tid' works", () => {
      const componentToRender = (
        <CalendarView
          visible={true}
          activity={fakeActivity}
          isEditing={false}
          toggleVisibility={mockToggleVisibility}
          adminID="123"
        />
      );
      const { getByText } = render(componentToRender);

      const logTimeButton = getByText("Logga tid");
      fireEvent.press(logTimeButton);
    });
  });

  describe("Tests for editing time input", () => {
    it("Renders the component correctly when editing", () => {
      fakeActivity.time = 1.5;
      const componentToRender = (
        <CalendarView
          visible={true}
          activity={fakeActivity}
          isEditing={true}
          adminID="123"
        />
      );
      const { getAllByText, getByText, getByTestId, queryByText } =
        render(componentToRender);

      expect(getByTestId("calendarView.headerText").children[0]).toEqual(
        "Katthem"
      );
      expect(getAllByText("Välj datum").length).toBe(1);
      expect(getAllByText("Hur lång aktivitet?").length).toBe(1);
      getByText("-");
      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("1.5");
      getByText("+");
      const dateAndHourInput =
        format(new Date(fakeActivity.date), "eee d LLLL", { locale: sv }) +
        ", 1.5h";
      expect(getByTestId("calendarView.dateAndHourInput").children[0]).toEqual(
        dateAndHourInput
      );
      expect(getAllByText("Ändra tid").length).toBe(1);
      expect(getAllByText("Ta bort tid").length).toBe(1);

      // Should only exist if adding new time
      const logTimeButton = queryByText("Logga tid");
      expect(logTimeButton).toBeNull();
    });

    it("Pressing 'Ändra tid' works", () => {
      const componentToRender = (
        <CalendarView
          visible={true}
          activity={fakeActivity}
          isEditing={true}
          toggleVisibility={mockToggleVisibility}
          adminID="123"
        />
      );
      const { getByText } = render(componentToRender);

      const changeTimeButton = getByText("Ändra tid");
      fireEvent.press(changeTimeButton);
    });

    it("Pressing 'Ta bort tid' works", () => {
      const componentToRender = (
        <CalendarView
          visible={true}
          activity={fakeActivity}
          isEditing={true}
          toggleVisibility={mockToggleVisibility}
          adminID="123"
        />
      );
      const { getByText } = render(componentToRender);

      const changeTimeButton = getByText("Ta bort tid");
      fireEvent.press(changeTimeButton);
    });
  });

  each([
    [2, 1, 1],
    [1, 1, 0],
    [100, 90, 10],
    [Number.MAX_SAFE_INTEGER, 124, Number.MAX_SAFE_INTEGER],
  ]).test(
    "returns %s when adding %s and %s",
    (expected, registeredTime, hours) => {
      expect(calculateNewHours(hours, registeredTime, Arithmetic.Add)).toBe(
        expected
      );
    }
  );

  each([
    [10, 14, 4],
    [0, 3, 5],
    [0, 0, 10],
    [0, 10, Number.MAX_SAFE_INTEGER],
  ]).test(
    "returns %s when subtracting %s with %s",
    (expected, registeredTime, hours) => {
      expect(calculateNewHours(hours, registeredTime, Arithmetic.Sub)).toBe(
        expected
      );
    }
  );

  it("Verify that 1987-06-05 do not have the same month as ex. 2023-02-24", () => {
    const date1 = new Date("1987-06-05");
    const date2 = new Date("2023-02-24");
    expect(checkIfSameMonth(date1, date2)).toBe(false);
  });

  it(`Verify that 2023-03-12 has the same month as 2023-03-01`, () => {
    const date1 = new Date("2023-03-12");
    const date2 = new Date("2023-03-01");
    expect(checkIfSameMonth(date1, date2)).toBe(true);
  });
});
