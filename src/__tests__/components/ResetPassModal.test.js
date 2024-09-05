import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import "react-native";
import ResetPassModal from "../../components/ResetPassModal";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

var mockedSendPasswordResetEmail = jest.fn();

jest.mock("@react-native-firebase/auth", () => {
  const actualAuth = jest.requireActual("@react-native-firebase/auth");
  return () => ({
    ...actualAuth,
    sendPasswordResetEmail: mockedSendPasswordResetEmail,
  });
});

describe("Testing ResetPassModal", () => {
  const mockOpenModal = jest.fn();

  it("Component renders correctly", () => {
    const componentToRender = (
      <ResetPassModal isModalOpen={true} openModal={mockOpenModal} />
    );
    const { getByText, getByTestId, queryAllByTestId } =
      render(componentToRender);

    getByTestId("resetPassModal.closeBtn");
    getByTestId("resetPassModal.forgotPass");
    getByTestId("resetPassModal.forgotPassDesc");
    getByTestId("resetPassModal.emailInput");
    const errorMessage = queryAllByTestId("resetPassModal.errorText");
    expect(errorMessage.length).toBe(0);
    getByText("Skicka");
  });

  it("Pressing the close button works", () => {
    const componentToRender = (
      <ResetPassModal isModalOpen={true} openModal={mockOpenModal} />
    );
    const { getByTestId } = render(componentToRender);

    const closeButton = getByTestId("resetPassModal.closeBtn");
    fireEvent.press(closeButton);
  });

  it("E-mail text input works", () => {
    const componentToRender = (
      <ResetPassModal isModalOpen={true} openModal={mockOpenModal} />
    );
    const { getByTestId } = render(componentToRender);

    const email = getByTestId("resetPassModal.emailInput");
    fireEvent.changeText(email, "test@test.com");
    expect(email.props.value).toEqual("test@test.com");
  });

  it("Requesting a new password without entering an email gives an error", () => {
    const componentToRender = (
      <ResetPassModal isModalOpen={true} openModal={mockOpenModal} />
    );
    const { getByText, getByTestId } = render(componentToRender);

    const sendButton = getByText("Skicka");
    fireEvent.press(sendButton);

    const errorMessage = getByTestId("resetPassModal.errorText");
    expect(errorMessage.children[0]).toEqual("* Du måste fylla i en e-post");
  });

  it("Requesting a new password works", () => {
    mockedSendPasswordResetEmail = () => Promise.resolve();

    const componentToRender = (
      <ResetPassModal isModalOpen={true} openModal={mockOpenModal} />
    );
    const { getByText, getByTestId } = render(componentToRender);

    const email = getByTestId("resetPassModal.emailInput");
    const sendButton = getByText("Skicka");

    act(() => {
      fireEvent.changeText(email, "test@test.com");
      fireEvent.press(sendButton);
      expect(email.props.value).toBe("");
    });
  });

  it("Requesting a new password with an invalid e-mail gives an error", async () => {
    const error = {
      code: "auth/invalid-email",
    };
    mockedSendPasswordResetEmail = () => Promise.reject(error);

    const componentToRender = (
      <ResetPassModal isModalOpen={true} openModal={mockOpenModal} />
    );
    const { getByText, getByTestId } = render(componentToRender);

    await act(async () => {
      const email = getByTestId("resetPassModal.emailInput");
      const sendButton = getByText("Skicka");

      await fireEvent.changeText(email, "test");
      await fireEvent.press(sendButton);
    });

    let errorMessage;

    await waitFor(() => {
      errorMessage = getByTestId("resetPassModal.errorText");
    });
    expect(errorMessage.children[0]).toEqual("* Ange en giltig e-post");
  });
});
