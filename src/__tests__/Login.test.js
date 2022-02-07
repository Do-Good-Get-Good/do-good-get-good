import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

import Login from "../components/Login";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("react-native-elements/dist/overlay/Overlay", () => () => {
  return <fakeOverlay />;
});

jest.mock("@react-native-firebase/auth", () => () => ({
  auth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  catch: jest.fn()
}));

it("renders correctly", () => {
  const { getAllByText, getByPlaceholderText, getByTestId } = render(<Login />);

  expect(getByTestId("login.dgggLogo").props.source.testUri).toBe("../../../img/Logotyp_DGGG.png");
  getByTestId("login.motivationalText");
  getByPlaceholderText("E-post");
  getByPlaceholderText("Lösenord");
  expect(getAllByText("Logga in").length).toBe(1);
  expect(getAllByText("Glömt ditt lösenord?").length).toBe(1);
  expect(getAllByText("Tryck här").length).toBe(1);
});

it("Shows invalid input message", () => {
  const { getByText, queryByText, getByPlaceholderText, debug } = render(<Login />);

  fireEvent.changeText(getByPlaceholderText("Lösenord"), "Blomma123");
  const loginButton = getByText("Logga in");
  fireEvent.press(loginButton);
  
  getByText("* Du måste fylla i en e-post");
  expect(queryByText("Fel e-post eller lösenord")).toBeNull();

  fireEvent.changeText(getByPlaceholderText("E-post"), "test@test");
  fireEvent.press(loginButton);
  getByText("* Fel e-post eller lösenord");
  expect(queryAllByText("Ange en giltig e-post").length).toBe(0);
});

// it("Handle valid input", async () => {
//   fetch.mockResponseOnce(JSON.stringify({ passes: true }));

//   const pushMock = jest.fn();
//   const { getByPlaceholder, getByText } = render(
//     <Login navigation={{ push: pushMock }} />
//   );

//   fireEvent.changeText(getByPlaceholder("E-post"), "test@test.com");
//   fireEvent.changeText(getByPlaceholder("Lösenord"), "test123");
//   fireEvent.press(getByText("Logga in"));

//   await act(() => new Promise((resolve) => setImmediate(resolve))); //Väntar på att login ska genomföras.

//   expect(pushMock).toBeCalledWith("Login"); //Namn på sidan man pushas till
// });

//Handle to many log in attempt, blocked user?
