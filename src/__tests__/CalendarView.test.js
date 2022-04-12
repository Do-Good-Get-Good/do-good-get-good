import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { format } from "date-fns";

import CalendarView from "../components/CalendarView";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("@react-native-firebase/firestore", () => {
  return () => ({
    collection: jest.fn(() => ({
      add: jest.fn(),
      doc: jest.fn(() => ({
        set: jest.fn(),
        delete: jest.fn(),
      })),
    })),
  });
});

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

      const dateAndHourInput = format(new Date(), "eee d LLLL") + ", 0.5h";
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
      var dateAndHourInput = format(new Date(), "eee d LLLL") + ", 0.5h";
      expect(getByTestId("calendarView.dateAndHourInput").children[0]).toEqual(
        dateAndHourInput
      );

      const decreaseTimeButton = getByText("-");
      fireEvent.press(decreaseTimeButton);
      expect(getByTestId("calendarView.hourInput").children[0]).toEqual("0");
      dateAndHourInput = format(new Date(), "eee d LLLL") + ", 0h";
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
      var dateAndHourInput = format(new Date(), "eee d LLLL") + ", 0h";
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
      const dateAndHourInput = format(new Date(), "eee d LLLL") + ", 0h";
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
        format(new Date(fakeActivity.date), "eee d LLLL") + ", 1.5h";
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
});
