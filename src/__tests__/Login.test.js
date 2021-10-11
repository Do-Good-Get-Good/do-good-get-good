import 'react-native';
import React from 'react';
import App from '../App';
import { render, fireEvent, act } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Login from '../components/Login';

it('renders correctly', () => {
  const {getAllByText, getByPlaceholderText} = renderer.create(<Login />);

  expect(getAllByText("Logga in").length).toBe(1);
  getByPlaceholderText("E-post");
  getByPlaceholderText("Lösenord");
});

it ('Shows invalid input message', () => {
  const {getByText, queryAllByText, getByPlaceholder} = render(<App/>);

  fireEvent.changeText(getByPlaceholder("Lösenord"), 'Blomma123');

  fireEvent.press(getByText("Logga in"));
  getByText('Ogiltigt användarnamn');
  expect(queryAllByText('Fel e-post eller lösenord').length).toBe(0);

  fireEvent.changeText(getByPlaceholder("E-post"), 'test@test.com');
  getByText('Ogiltigt lösenord');
  expect(queryAllByText('Ange en giltig e-post').length).toBe(0);

});

it("Handle valid input", async () => {
  fetch.mockResponseOnce(JSON.stringify({passes:true}));

  const pushMock = jest.fn();
  const { getByPlaceholder, getByText} = render(<App navigation={{push: pushMock}} />)

  fireEvent.changeText(getByPlaceholder("E-post"), 'minEmail@gmail.com');
  fireEvent.changeText(getByPlaceholder("Lösenord"), 'Blomma123');
  fireEvent.press(getByText("Logga in"));

    await act(() => new Promise(resolve => setImmediate(resolve))); //Väntar på att login ska genomföras.

  expect(pushMock).toBeCalledWith("App"); //Namn på sidan man pushas till
});


//Handle to many log in attempt, blocked user? 
