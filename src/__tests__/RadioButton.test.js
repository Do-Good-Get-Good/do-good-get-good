import "react-native";
import React from "react";
import { render, fireEvent, act, } from "@testing-library/react-native";
 
import RadioButton from "../components/RadioButton"

jest.mock('../context/AdminGalleryContext', () => ({
    
    useAdminGalleryFunction: () => ({
        chooseActiveOrNot: jest.fn()
    })
  }));

  
describe('Testing Radio Button', () => {


    it("can find RadioButton", () => {
        const { getAllByText } = render(<RadioButton />);
        expect(getAllByText(" Ja ").length).toBe(1);
       
    })


    it("can find RadioButton", () => {
        const { getAllByText } = render(<RadioButton />);
        expect(getAllByText(" Nej ").length).toBe(1);
    })


    it("can press the button RadioButton Ja", () => {
        const { getByTestId } = render(<RadioButton />);
        const buttonJa = getByTestId("pressOnButtonJa")
        fireEvent.press(buttonJa)
    })

   

    it("can press the button RadioButton Nej", () => {
        const { getByTestId } = render(<RadioButton />);
        const buttonNej = getByTestId("pressOnButtonNej")
        fireEvent.press(buttonNej)
    })
    
    
})