import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyTimeEntries from '../components/MyTimeEntries';
import useTimeEntriesWithLimit from '../hooks/useTimeEntriesWithLimit';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@rneui/base/dist/Icon/', () => ({
  Icon: jest.fn(),
}));

jest.mock('../components/Menu', () => () => {
  return <></>;
});

jest.mock('../components/CalendarView', () => () => {
  return <></>;
});

jest.mock('../components/DropDownForSorting', () => () => {
  return <></>;
});

jest.mock('@react-navigation/native');

jest.mock('../hooks/useTimeEntriesWithLimit');

const timeEntryMock = {
  timeEntries: [
    {
      adminID: '123',
      timeEntryID: '123',
      date: new Date('2022-12-30'),
      statusConfirmed: false,
      time: 2,
      title: 'Missing people',
      activityID: '123',
    },
    {
      adminID: '123',
      timeEntryID: '1234',
      date: new Date('2022-12-30'),
      statusConfirmed: true,
      time: 2,
      title: 'Missing people',
      activityID: '123',
    },
  ],
  isLoading: false,
  error: null,
};

const emptyTimeEntryMock = {
  timeEntries: [],
  isLoading: false,
  error: null,
};

describe('Testing MyTimeEntries', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renders the page correctly', () => {
    useTimeEntriesWithLimit.mockReturnValue(timeEntryMock);
    const {getByText, getAllByText} = render(<MyTimeEntries />);
    expect(getByText('Mina aktiviteter'));
    expect(getAllByText('Missing people').length).toBe(2);
    expect(getAllByText('2022-12-30').length).toBe(2);
    expect(getAllByText('2 tim').length).toBe(2);
  });

  it('Can press the edit button if statusConfirmed = false', () => {
    useTimeEntriesWithLimit.mockReturnValue(timeEntryMock);
    const {getAllByTestId} = render(<MyTimeEntries />);
    const editButtons = getAllByTestId('editButton');
    expect(editButtons.length).toBe(1);

    const button = editButtons[0];
    fireEvent.press(button);
  });

  it("If statusConfirmed = true a 'done' icon should be visible instead of an edit button", () => {
    useTimeEntriesWithLimit.mockReturnValue(timeEntryMock);
    const {getAllByTestId} = render(<MyTimeEntries />);
    const doneIcons = getAllByTestId('doneIcon');
    expect(doneIcons.length).toBe(1);
  });

  it('If no time entries exist, a text indicating that should be visible', () => {
    useTimeEntriesWithLimit.mockReturnValue(emptyTimeEntryMock);
    const {getByText} = render(<MyTimeEntries />);
    const text = getByText('Du har inte loggat någon tid ännu!');
    expect(text).toBeTruthy();
  });
});
