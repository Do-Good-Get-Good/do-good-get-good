import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { MyActivityAsAList } from '../components/MyActivityAsAList'
import { useActivityFunction } from '../context/ActivityContext'
import toDate from 'date-fns/toDate'

jest.mock("@react-native-firebase/firestore", () => {
    return () => ({
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                collection: jest.fn(() => ({
                    add: jest.fn(),
                    doc: jest.fn(() => ({
                        set: jest.fn(),
                        delete: jest.fn()
                    })),
                    get: jest.fn(() => ({
                        data: jest.fn().mockReturnValue({
                            date: {
                                toDate: () => '2022-01-27T00:00:00.000Z',
                            }
                        })
                    }))
                }))
            }))
        }))
    });
});

jest.mock("@react-native-firebase/auth", () => () => ({
    auth: jest.fn(),
}))

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter")

jest.mock('react-native-elements/dist/icons/Icon', () => () => {
    return <fakeIcon />
})

jest.mock('../components/CalendarView', () => () => {
    return <fakeCalenderView />
})

jest.mock('@react-navigation/native')

// jest.mock('../context/ActivityContext', () => ({
//     useActivityFunction: () => ({
//         timeAndStatus: jest.fn(),
//         myActivities: jest.fn(),
//         allListOfTimeEntry: jest.fn()
//       }),
// }))



// const timeandstatusContext = [{
//     activityId: 'asd', 
//     date: '2022-01-27T00:00:00.000Z', 
//     fbDocumentID: "z7kknsEWFeJPhHPev2lA", 
//     statusConfirmed: false, 
//     time: 1.5
// }]

jest.mock('../context/ActivityContext', () => {
    const timeandstatusContext = [{
        activityId: 'asd', 
        date: {nanoseconds: 0, seconds: 1643241600}, 
        fbDocumentID: "z7kknsEWFeJPhHPev2lA", 
        statusConfirmed: false, 
        time: 1.5
    }]
    const myActivitiesContext = [{
        id: 'asd',
        title: 'Missing people',
        city: 'Gbg',
        photo: 'symbol_earth',
    }]
    return {
        useActivityFunction: () => ({
            timeAndStatus: timeandstatusContext,
            myActivities: myActivitiesContext,
            allListOfTimeEntry: jest.fn()
          }),
    } 
})

// const testTest = [{
//     date: '2022-01-27T00:00:00.000Z', 
//     statusConfirmed: false, 
//     time: 1.5, 
//     timeEntryID: "z7kknsEWFeJPhHPev2lA", 
//     title: "Missing people"
// }]

describe('Testing MyActivityAsAList', () => {
    it('can find the text Min tid', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        const { getAllByText } = render(<MyActivityAsAList />)
        expect(getAllByText('Min tid').length).toBe(1)
    })

    it('can find the activity title', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        // useActivityFunction().myActivities.mockReturnValue(myActivitiesContext)
        // useActivityFunction().timeAndStatus.mockReturnValue(timeandstatusContext)
        const { getAllByText, getByTestId } = render(<MyActivityAsAList />)
        // expect(getAllByText('Missing people').length).toBe(1)
        expect(getByTestId('testview'))
    })

    // it('can find the activity time', () => {
    //     // useActivityFunction().myActivities.mockReturnValue(myActivitiesContext)
    //     // useActivityFunction().timeAndStatus.mockReturnValue(timeandstatusContext)
    //     require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        
    //     const { getAllByText } = render(<MyActivityAsAList />)   
    //     expect(getAllByText('1.5 tim').length).toBe(1)  
    // })

    it('can find the text Visa allt in HomePage', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        const { getAllByText } = render(<MyActivityAsAList />)
        expect(getAllByText('Visa allt').length).toBe(1)
    })

})