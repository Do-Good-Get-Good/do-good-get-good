import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import Faq from "../screens/Faq";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe("Testing Faq page", () => {
  it("Renders page correctly", () => {
    const { getByTestId, getAllByTestId } = render(<Faq />);
    getByTestId("faq.headerText");
    getByTestId("faq.descText");
    getByTestId("faq.questionsArray");
    expect(getAllByTestId("faq.faqArrayItems").length).toBe(1);
  });
});
