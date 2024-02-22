import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { CreateUserForm } from "../../components";
import { InputField } from "../../components/InputField";
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@react-navigation/native");

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));
const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));
const navigationMock = { goBack: jest.fn() };



describe("Testing CreateUserForm ", () => {

    it('renders input field with placeholder text and handles input', () => {
        const { getByPlaceholderText } = render(<CreateUserForm />);
        const inputField = getByPlaceholderText('Förnamn');
        fireEvent.changeText(inputField, 'John');
        expect(inputField.props.value).toBe('John');
      });
    
      


  
  });
  