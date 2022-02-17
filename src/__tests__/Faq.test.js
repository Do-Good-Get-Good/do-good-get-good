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
  { id: "id", question: "QUESTION", answer: "ANSWER 1", opened: true },
];

var test = jest.fn();

jest.mock("@react-native-firebase/firestore", () => {
  const firebaseActualFireStore = jest.requireActual(
    "@react-native-firebase/firestore"
  );
  return () => ({
    ...firebaseActualFireStore,
    collection: jest.fn(() => ({
      get: jest.fn(),
    })),
  });
});

console.log(
  "firebaseActualFireStore______________________",
  firebaseActualFireStore
);

describe("Testing Faq page", () => {
  it("Renders page correctly", () => {
    // test.mockReturnValue(testDataArray);
    const { getByTestId, getAllByTestId, getAllByText } = render(<Faq />);

    getByTestId("faq.headerText");
    getByTestId("faq.descText");
    getByTestId("faq.questionsArray");
    expect(getAllByTestId("faq.questionsArray").length).toBe(1);
    // getByTestId("faq.faqArrayItems");
    // expect(getAllByText("QUESTION").length).toBe(1);
    // expect(getAllByText("ANSWER 1").length).toBe(1);
  });

  //it("", () => {});
});
