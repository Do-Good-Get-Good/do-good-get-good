import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FloatingActionButton from '../components/FloatingActionButton'


jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
    };
});


jest.mock('react-native-elements/dist/icons/Icon', () => () => {
    return <fakeIcon />;
});

describe("Testing FloatingActionButton", () => {
    it("can press the action button to see the outher buttons", () => {
        const { getByTestId, getAllByText } = render(<FloatingActionButton />);
        const fabButton = getByTestId("open.button")
        fireEvent.press(fabButton)

        expect(getAllByText("Lägg till aktivitet").length).toBe(1)
        expect(getAllByText('Lägg till användare').length).toBe(1)

        const activityButton = getByTestId("createActivity.button")
        const cocButton = getByTestId("CreateOrChangeUser.button")
        fireEvent.press(activityButton, cocButton)
    })
    
})