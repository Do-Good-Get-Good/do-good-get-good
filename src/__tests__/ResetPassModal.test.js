import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import ResetPassModal from "../components/ResetPassModal";

import auth from "@react-native-firebase/auth"

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("@react-native-firebase/auth", () => () => ({
    __esModule: true,
    sendPasswordResetEmail: jest.fn(() => ({
        then: jest.fn(() => ({
            catch: jest.fn(() => Promise.reject("auth/invalid-email"))
        })),
    }))
}))

describe("Testing ResetPassModal", () => {
    const mockOpenModal = jest.fn();

    it("Component renders correctly", () => {
        const componentToRender = <ResetPassModal 
                                    isModalOpen={true} 
                                    openModal={mockOpenModal} 
                                />;
        const { getByText, getByTestId, queryAllByTestId } = render(componentToRender);

        getByTestId("resetPassModal.closeBtn");
        getByTestId("resetPassModal.forgotPass");
        getByTestId("resetPassModal.forgotPassDesc");
        getByTestId("resetPassModal.emailInput");
        const errorMessage = queryAllByTestId("resetPassModal.errorText");
        expect(errorMessage.length).toBe(0);
        getByText("Skicka");
    });

    it("Pressing the close button works", () => {
        const componentToRender = <ResetPassModal 
                                    isModalOpen={true} 
                                    openModal={mockOpenModal} 
                                />;
        const { getByTestId } = render(componentToRender);

        const closeButton = getByTestId("resetPassModal.closeBtn");
        fireEvent.press(closeButton);
    });

    it("E-mail text input works", () => {
        const componentToRender = <ResetPassModal 
                                    isModalOpen={true} 
                                    openModal={mockOpenModal} 
                                />;
        const { getByTestId } = render(componentToRender);

        const email = getByTestId("resetPassModal.emailInput");
        fireEvent.changeText(email, "test@test.com");
        expect(email.props.value).toEqual("test@test.com");
    });

    it("Requesting a new password without entering an email gives an error", () => {
        const componentToRender = <ResetPassModal 
                                    isModalOpen={true} 
                                    openModal={mockOpenModal} 
                                />;
        const { getByText, getByTestId } = render(componentToRender);

        const sendButton = getByText("Skicka");
        fireEvent.press(sendButton);

        const errorMessage = getByTestId("resetPassModal.errorText");
        expect(errorMessage.children[0]).toEqual("* Du måste fylla i en e-post");
    });

    it("Requesting a new password works", () => {
        const componentToRender = <ResetPassModal 
                                    isModalOpen={true} 
                                    openModal={mockOpenModal} 
                                />;
        const { getByText, getByTestId } = render(componentToRender);

        const email = getByTestId("resetPassModal.emailInput");
        fireEvent.changeText(email, "test@test.com");

        const sendButton = getByText("Skicka");
        fireEvent.press(sendButton);
    });

    it("Requesting a new password with an invalid e-mail gives an error", async () => {
        auth().sendPasswordResetEmail.mockImplementationOnce(() => {
            Promise.reject(new Error("auth/invalid-email")) 
        });

        const componentToRender = <ResetPassModal 
                                    isModalOpen={true} 
                                    openModal={mockOpenModal} 
                                />;
        const { getByText, getByTestId, debug} = render(componentToRender);

        const email = getByTestId("resetPassModal.emailInput");
        fireEvent.changeText(email, "test");

        const sendButton = getByText("Skicka");
        fireEvent.press(sendButton)

        const errorMessage = getByTestId("resetPassModal.errorText");
        expect(errorMessage.children[0]).toEqual("* Ange en giltig e-post");
    });
});
