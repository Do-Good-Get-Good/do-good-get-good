import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import "react-native";
import { Login } from "../../components/Login";

jest.mock("@react-native-firebase/auth", () => () => ({
  auth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(() => new Promise.resolve(true)),
}));

describe("Testing Login", () => {
  it("Renders the login page correctly", () => {
    const { getAllByText, getByPlaceholderText, getByTestId } = render(
      <Login />
    );

    expect(getByTestId("login.backgroundImage").props.source.testUri).toBe(
      "../../../assets/images/blueprint-white.png"
    );
    expect(getByTestId("login.dgggLogo").props.source.testUri).toBe(
      "../../../assets/images/Logotyp_DGGG.png"
    );
    getByTestId("login.motivationalText");
    getByPlaceholderText("E-post");
    getByPlaceholderText("Lösenord");
    expect(getAllByText("Logga in").length).toBe(1);
    expect(getAllByText("Glömt ditt lösenord?").length).toBe(1);
    expect(getAllByText("Tryck här").length).toBe(1);
    expect(getByTestId("login.bottomLogo").props.source.testUri).toBe(
      "../../../assets/images/Technogarden-logotyp-Large.png"
    );
  });

  it("Error messages are hidden when the app is rendered", () => {
    const { queryByText } = render(<Login />);

    const errorText = queryByText("* ");
    expect(errorText).toBeNull();
  });

  it("Trying to login without entering an e-mail gives an error", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("Lösenord"), "Blomma123");
    const loginButton = getByText("Logga in");
    await waitFor(() => {
      fireEvent.press(loginButton);
      expect(getByText("Du måste fylla i e-post och lösenord")).toBeTruthy();
    });
  });

  it("Trying to login without entering a password gives an error", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("E-post"), "test@test.com");

    const loginButton = getByText("Logga in");
    await waitFor(() => {
      fireEvent.press(loginButton);

      expect(getByText("* Du måste fylla i ett lösenord")).toBeTruthy();
    });
  });

  it("Trying to login without entering an e-mail or password gives an error", async () => {
    const { getByText } = render(<Login />);

    const loginButton = getByText("Logga in");
    await waitFor(() => {
      fireEvent.press(loginButton);
      expect(getByText("* Du måste fylla i ett lösenord")).toBeTruthy();
      expect(getByText("Du måste fylla i e-post och lösenord")).toBeTruthy();
    });
  });

  it("Trying to login without valid email gives an error", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText("E-post"), "test");
    const loginButton = getByText("Logga in");
    await waitFor(() => {
      fireEvent.press(loginButton);
      expect(getByText("* Ange en giltig e-mail")).toBeTruthy();
    });
  });

  it("Should take away space if a user wrote one in the Login page at email field", () => {
    const { getByTestId } = render(<Login />);

    const inputEmail = getByTestId("input-email");
    fireEvent.changeText(inputEmail, "  can2@example.com");
    expect(inputEmail.props.value).toBe("can2@example.com");
  });
  it("Should take away space if a user wrote one in the Login page at password field", () => {
    const { getByTestId } = render(<Login />);

    const inputPassword = getByTestId("input-password");
    fireEvent.changeText(inputPassword, "  dfdfdf");
    expect(inputPassword.props.value).toBe("dfdfdf");
  });

  it("Pressing the forgot password button works", async () => {
    const { getByText, getByTestId } = render(<Login />);

    const forgotPasswordButton = getByText("Tryck här");
    fireEvent.press(forgotPasswordButton);
    await waitFor(() => {
      expect(getByTestId("resetPassModal.forgotPassDesc")).toBeTruthy();
      expect(getByTestId("resetPassModal.emailInput")).toBeTruthy();
      expect(getByText("Skicka")).toBeTruthy();
    });
  });
});
