import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { MyActivityAsAList } from '../components/MyActivityAsAList';

// jest.mock("@react-native-firebase/firestore", () => {
//     return () => ({
//         collection: jest.fn(() => ({
//             doc: jest.fn(() => ({
//                 collection: jest.fn(() => ({
//                     add: jest.fn(),
//                     doc: jest.fn(() => ({
//                         set: jest.fn(),
//                         delete: jest.fn()
//                     })),
//                     orderBy: jest.fn(() => ({
//                         get: jest.fn(() => ({
//                             data: jest.fn().mockReturnValue({
//                                 date: {
//                                     toDate: () => '2022-01-27T00:00:00.000Z',
//                                 },
//                                 activityId: 'asd', 
//                                 fbDocumentID: "z7kknsEWFeJPhHPev2lA", 
//                                 statusConfirmed: false, 
//                                 time: 1.5,
//                                 // id: 'asd',
//                                 // title: 'Missing people',
//                                 // city: 'Gbg',
//                                 // photo: 'symbol_earth',
//                             })
//                         }))
//                     }))                   
//                 }))
//             }))
//         }))
//     });
// });


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
        allListOfTimeEntry: jest.fn(),
        getIfoFromActivitiesList: jest.fn()
      }),
}))

// jest.mock('../context/ActivityContext', () => {
//     const timeandstatusContext = [{
//         activityId: 'asd', 
//         date: {nanoseconds: 0, seconds: 1643241600}, 
//         fbDocumentID: "z7kknsEWFeJPhHPev2lA", 
//         statusConfirmed: false, 
//         time: 1.5
//     }]
//     const myActivitiesContext = [{
//         id: 'asd',
//         title: 'Missing people',
//         city: 'Gbg',
//         photo: 'symbol_earth',
//     }]
//     return {
//         useActivityFunction: () => ({
//             timeAndStatus: timeandstatusContext,
//             myActivities: myActivitiesContext,
//             allListOfTimeEntry: jest.fn()
//           }),
//     } 
// })

const showAllList = [{
    activityId: 'asd', 
    date: {nanoseconds: 0, seconds: 1643241600},
    fbDocumentID: "z7kknsEWFeJPhHPev2lA", 
    statusConfirmed: false, 
    time: 1.5
},
{
    activityId: 'abc', 
    date: {nanoseconds: 0, seconds: 1643241600},
    fbDocumentID: "z7kknsEWFeJPhHPev2lB", 
    statusConfirmed: false, 
    time: 1
}]

const useStateMock = [{
    date: new Date(), 
    statusConfirmed: false, 
    time: 1.5, 
    timeEntryID: "z7kknsEWFeJPhHPev2lA", 
    title: "Missing people"
}]
React.useState = jest.fn().mockReturnValue([useStateMock, {}])

describe('Testing MyActivityAsAList', () => {
    it('can find the text Min tid', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        const { getAllByText } = render(<MyActivityAsAList />)
        expect(getAllByText('Min tid').length).toBe(1)
    })

    it('can find the activity title', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        const { getAllByText } = render(<MyActivityAsAList />)
        expect(getAllByText('Missing people').length).toBe(1)
    })

    it('can find the activity date', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        const { getAllByText } = render(<MyActivityAsAList />)   
        expect(getAllByText(new Date().toISOString().slice(0, 10)).length).toBe(1)
        // expect(getAllByText('2022-01-27').length).toBe(1)
    })

    it('can find the activity time', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        const { getAllByText } = render(<MyActivityAsAList />)   
        expect(getAllByText('1.5 tim').length).toBe(1)  
    })

    it('can press the edit button if statusConfirmed is false', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
        const { getByTestId } = render(<MyActivityAsAList />)   
        const button = getByTestId('editButton') 
        fireEvent.press(button)
    })

    it('the edit button is unabled when statusConfirmed is true', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})

        const useStateMockTrue = [{
            date: new Date(), 
            statusConfirmed: true, 
            time: 1.5, 
            timeEntryID: "z7kknsEWFeJPhHPev2lA", 
            title: "Missing people"
        }]
        React.useState = jest.fn().mockReturnValue([useStateMockTrue, {}])
        
        const { queryByTestId } = render(<MyActivityAsAList />)   
        const button= queryByTestId('editButton')
        expect(button).toBeNull()
    })

    it('can press on the button Visa allt in HomePage screen', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'HomePage'})
       
        const navigate = jest.fn()
    
        const { getAllByText, getByTestId, queryByText } = render(<MyActivityAsAList navigation={{navigate}} />)
        expect(getAllByText('Visa allt').length).toBe(1)
        const button = getByTestId('showAllButton')
        fireEvent.press(button)
        expect(navigate).toHaveBeenCalledWith('MyTimePage')
    })

    it('hide button Visa allt in MyTimePage screen', () => {
        require('@react-navigation/native').useRoute.mockReturnValue({name: 'MyTimePage'})

        const { queryByText} = render(<MyActivityAsAList showAllList={showAllList}/>)
        expect(queryByText('Visa allt')).toBeNull()
    })

})