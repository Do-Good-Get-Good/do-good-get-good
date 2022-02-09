import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import {MyActivities} from '../components/MyActivities'

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter")

jest.mock('react-native-elements/dist/icons/Icon', () => () => {
    return <fakeIcon />
})

jest.mock('../components/CalendarView', () => () => {
    return <fakeCalenderView />
})

const myActivities = [{
    id: 'asd',
    title: 'Missing people',
    city: 'Gbg',
    photo: 'symbol_earth',
}]
const myAccumulatedTime = [{
    accumulatedTime: 0,
    activityID: 'asd',
}]

describe('Testing MyActivities', () => {
    it('can find the activity title', () => {
        const { getAllByText } = render(<MyActivities myActivities={myActivities} myAccumulatedTime={myAccumulatedTime} />)
        expect(getAllByText('Missing people').length).toBe(1)
    })

    it('can find the city for the activity', () => {
        const { getAllByText } = render(<MyActivities myActivities={myActivities} myAccumulatedTime={myAccumulatedTime} />)
        expect(getAllByText('Gbg').length).toBe(1)
    })
    
    it('can find the image for the activity', () => {
        const { getByTestId } = render(<MyActivities myActivities={myActivities} myAccumulatedTime={myAccumulatedTime} />)
        expect(getByTestId('imageId'))
        const image = getByTestId('imageId')
        expect(image.props.source).toEqual({testUri: "../../../img/activities_images/symbol_earth.png"})
    })

    it('can click on the Logga tid button', () => {
        const { getAllByText, getByTestId } = render(
        <MyActivities myActivities={myActivities} myAccumulatedTime={myAccumulatedTime} />)
        expect(getAllByText('Logga tid').length).toBe(1)
        const button = getByTestId('logTimeButton')
        fireEvent.press(button)
    })
    
})