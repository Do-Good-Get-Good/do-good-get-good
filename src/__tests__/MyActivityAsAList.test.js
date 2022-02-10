import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { MyActivityAsAList } from '../components/MyActivityAsAList'
import { useActivityFunction } from '../context/ActivityContext'

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter")

jest.mock('react-native-elements/dist/icons/Icon', () => () => {
    return <fakeIcon />
})

jest.mock('../components/CalendarView', () => () => {
    return <fakeCalenderView />
})

jest.mock('@react-navigation/native')

jest.mock('../context/ActivityContext', () => ({
    useActivityFunction: () => ({
        timeAndStatus: jest.fn(),
        myActivities: jest.fn(),
        allListOfTimeEntry: jest.fn()
      }),
}))


// datumTest = jest.fn(() => 1643241600)

const myActivitiesContext = [{
    id: 'asd',
    title: 'Missing people',
    city: 'Gbg',
    photo: 'symbol_earth',
}]

// const timeandstatusContext = [{
//     activityId: 'asd', 
//     date: 2022-01-27T00:00:00.000Z, 
//     fbDocumentID: "z7kknsEWFeJPhHPev2lA", 
//     statusConfirmed: false, 
//     time: 1.5
// }]

// const timeandstatusContext = [{
//     activityId: 'asd', 
//     date: {nanoseconds: 0, seconds: 1643241600}, 
//     fbDocumentID: "z7kknsEWFeJPhHPev2lA", 
//     statusConfirmed: false, 
//     time: 1.5
// }]

describe('Testing MyActivityAsAList', () => {
    it('can find the text Min tid', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        const { getAllByText } = render(<MyActivityAsAList />)
        expect(getAllByText('Min tid').length).toBe(1)
    })

    it('can find the activity title', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        useActivityFunction().myActivities.mockReturnValue(myActivitiesContext)
        // useActivityFunction().timeAndStatus.mockReturnValue(timeandstatusContext)
        const { getAllByText } = render(<MyActivityAsAList />)
        expect(getAllByText('Missing people').length).toBe(1)
    })
})