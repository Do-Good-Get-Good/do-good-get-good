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

const testDataArray = [
  { question: "QUESTION", answer: "ANSWER 1", opened: true },
];

describe("Testing Faq page", () => {
  it("Renders page correctly", () => {
    const { getByTestId, getAllByTestId, getAllByText } = render(
      <Faq qnaArray={testDataArray} />
    );

    getByTestId("faq.headerText");
    getByTestId("faq.descText");
    getByTestId("faq.questionsArray");
    expect(getAllByTestId("faq.faqArrayItems").length).toBe(1);
    getByTestId("textID");
    const question = getByTestId("faq.faqArrayItems");
    // console.log(getByTestId("textID").props.children);
    // expect(getByTestId("textID")).toEqual("QUESTION");
    expect(getAllByText("QUESTION").length).toBe(1);
    expect(getAllByText("ANSWER 1").length).toBe(1);
  });
});
