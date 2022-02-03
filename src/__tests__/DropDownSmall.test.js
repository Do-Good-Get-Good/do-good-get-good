import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { DropDownSmall } from '../components/DropDownSmall'
import { useCreateActivityFunction } from '../context/CreateActivityContext'


jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock('react-native-elements/dist/icons/Icon', () => () => {
    return <fakeIcon />;
});

jest.mock('../context/CreateActivityContext', () => ({
    useCreateActivityFunction: () => ({
        activeActivities: jest.fn(),
      }),
}));

jest.mock('@react-navigation/native')

describe('Testing DropDownSmall', () => {
    it('can see that you are in CreateActivity screen', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'CreateActivity'})
        // useCreateActivityFunction().activeActivities.mockReturnValue(0)
        const { getAllByText } = render(<DropDownSmall />);
        expect(getAllByText('Aktivitet').length).toBe(1)
    })

    it('can see that you are in AdminActivityGallery screen', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'AdminActivityGallery'})
        // useCreateActivityFunction().activeActivities.mockReturnValue(0)
        const { getAllByText } = render(<DropDownSmall />);
        expect(getAllByText('Datum').length).toBe(1)
    })

    it('can press the dropDown to open', () => {
        const { getByTestId,getAllByTestId } = render(<DropDownSmall />);

        const dropDownButton = getByTestId('dropDownPressed')
        fireEvent.press(dropDownButton)

        const activitysInsideDropDown = getAllByTestId('insideDropDownPressed')
        console.log(activitysInsideDropDown.length)
        expect(getAllByTestId('insideDropDownPressed').length).toBe(activitysInsideDropDown.length)
        
    })

    it('can press the dropDown to close', () => {
        const { getByTestId,getAllByTestId,queryAllByTestId } = render(<DropDownSmall />);

        const dropDownButton = getByTestId('dropDownPressed')
        fireEvent.press(dropDownButton)

        const activitysInsideDropDown = getAllByTestId('insideDropDownPressed')
        expect(getAllByTestId('insideDropDownPressed').length).toBe(activitysInsideDropDown.length)

        fireEvent.press(dropDownButton)
        const ActivityText = queryAllByTestId('insideDropDownPressed')
        expect(ActivityText).toEqual([])
        
    })

})