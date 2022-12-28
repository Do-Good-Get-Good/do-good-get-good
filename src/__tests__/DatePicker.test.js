import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import { format } from "date-fns";
import DatePicker from "../components/DatePicker";

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

describe("Testing DatePicker", () => {
  it("Can open calendar overlay and select a date", () => {
    let date = format(new Date("2022-12-28"), "yyyy-MM-dd");

    function setDate(value) {
      date = value;
    }

    const { getByText } = render(<DatePicker date={date} setDate={setDate} />);

    const datePickerButton = getByText("2022-12-28");
    expect(datePickerButton);
    fireEvent.press(datePickerButton);

    expect(getByText("December 2022"));

    const calendarDayButton = getByText("14");
    expect(calendarDayButton);
    fireEvent.press(calendarDayButton);

    const saveButton = getByText("Välj datum");
    expect(saveButton);
    fireEvent.press(saveButton);

    expect(date).toEqual("2022-12-14");
  });
});
