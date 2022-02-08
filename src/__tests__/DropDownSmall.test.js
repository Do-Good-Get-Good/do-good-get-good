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
        chooseInDropDown: jest.fn(),
      }),
}));

jest.mock('@react-navigation/native')

describe('Testing DropDownSmall', () => {
    it('can see that you are in CreateActivity screen', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'CreateActivity'})
        const { getAllByText } = render(<DropDownSmall />);
        expect(getAllByText('Aktivitet').length).toBe(1)
    })

    it('can see that you are in AdminActivityGallery screen', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'AdminActivityGallery'})
        const { getAllByText } = render(<DropDownSmall />);
        expect(getAllByText('Datum').length).toBe(1)
    })

    it('can press the dropDown to open in CreateActivity screen', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'CreateActivity'})
        const { getByTestId, getAllByTestId, queryAllByTestId, getAllByText } = render(<DropDownSmall />);

        expect(getAllByTestId('dropDownPressed').length).toBe(1)
        const dropDownButton = getByTestId('dropDownPressed')
        fireEvent.press(dropDownButton)
        
        const activitysInsideDropDown = getAllByTestId('insideDropDownPressed')
        expect(getAllByText('Skapa ny aktivitet').length).toBe(1)

        fireEvent.press(activitysInsideDropDown[0])
        const closingDropDown = queryAllByTestId('insideDropDownPressed')
        expect(closingDropDown).toEqual([])
    })

    it('can press the dropDown to open in AdminActivityGallery screen', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'AdminActivityGallery'})
        const { getByTestId, getAllByTestId, queryAllByTestId, getAllByText } = render(<DropDownSmall />);

        expect(getAllByTestId('dropDownPressed').length).toBe(1)
        const dropDownButton = getByTestId('dropDownPressed')
        fireEvent.press(dropDownButton)
        
        const activitysInsideDropDown = getAllByTestId('insideDropDownPressed')
        expect(getAllByText('Favoriter').length).toBe(1)
        expect(getAllByText('Namn').length).toBe(1)
        expect(getAllByText('Plats').length).toBe(1)

        if 
        (
        fireEvent.press(activitysInsideDropDown[0]) || 
        fireEvent.press(activitysInsideDropDown[1]) || 
        fireEvent.press(activitysInsideDropDown[2])
        ) 
        {
            const closingDropDown = queryAllByTestId('insideDropDownPressed')
            expect(closingDropDown).toEqual([])
        }
    })

    it('can press the dropDown to close', () => {
        const { getByTestId,getAllByTestId,queryAllByTestId } = render(<DropDownSmall />)

        const dropDownButton = getByTestId('dropDownPressed')
        fireEvent.press(dropDownButton)

        const activitysInsideDropDown = getAllByTestId('insideDropDownPressed')
        expect(getAllByTestId('insideDropDownPressed').length).toBe(activitysInsideDropDown.length)

        fireEvent.press(dropDownButton)
        const ActivityText = queryAllByTestId('insideDropDownPressed')
        expect(ActivityText).toEqual([]) 
    })
})