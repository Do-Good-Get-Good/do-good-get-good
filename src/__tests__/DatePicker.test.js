import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {format} from 'date-fns';
import DatePicker from '../components/DatePicker';

jest.mock('@rneui/base/dist/Icon/', () => ({
  Icon: jest.fn(),
}));

describe('Testing DatePicker', () => {
  it('Can open calendar overlay and select a date', () => {
    let date = format(new Date(), 'yyyy-MM-dd');

    function setDate(value) {
      date = value;
    }

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const day = '14';

    const {getByText} = render(<DatePicker date={date} setDate={setDate} />);

    const datePickerButton = getByText(date);
    expect(datePickerButton);
    fireEvent.press(datePickerButton);

    // Month year (ex. April 2023)
    expect(getByText(format(new Date(), 'MMMM yyyy')));

    const calendarDayButton = getByText(day);
    expect(calendarDayButton);
    fireEvent.press(calendarDayButton);

    const saveButton = getByText('Välj datum');
    expect(saveButton);
    fireEvent.press(saveButton);

    expect(date).toEqual(`${year}-${month}-${day}`);
  });
});
