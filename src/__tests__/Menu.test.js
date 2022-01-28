import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import UserMenu from "../components/Menu";

jest.mock(
    '../components/MenuOverlay', () => () => {
        const mockMenuOverlay = "";
        return <mockMenuOverlay />;
    }
);
describe('Testing Menu for User and Admin', () => {
    it("Renders a menu", () => {
        const { getAllByText, getByTestId } = render(<UserMenu />);
        expect(getAllByText("Meny").length).toBe(1)
        const button = getByTestId("menuButton")
    })
})