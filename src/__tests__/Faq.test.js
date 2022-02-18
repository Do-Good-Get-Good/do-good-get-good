import "react-native";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";

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
  {
    id: "id1",
    data: () => ({
      question: "Fråga 1",
      answer: "ANSWER 1",
    }),
  },
  {
    id: "id2",
    data: () => ({
      question: "Fråga 2",
      answer: "ANSWER 2",
    }),
  },
  {
    id: "i3",
    data: () => ({
      question: "Fråga 3",
      answer: "ANSWER 3",
    }),
  },
];

jest.mock("@react-native-firebase/firestore", () => {
  const firebaseActualFireStore = jest.requireActual(
    "@react-native-firebase/firestore"
  );
  return () => ({
    ...firebaseActualFireStore,
    collection: jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ docs: testDataArray }),
    })),
    data: jest.fn(),
  });
});

describe("Testing Faq page", () => {
  it("Renders page correctly", async () => {
    // mockGet.mockReturnValueOnce(testDataArray);
    const { getByTestId, getAllByTestId, getAllByText, getByText } = render(
      <Faq />
    );

    getByTestId("faq.headerText");
    getByTestId("faq.descText");
    getByTestId("faq.questionsArray");
    expect(getAllByTestId("faq.questionsArray").length).toBe(1);

    await waitFor(() => {
      expect(getAllByTestId("faq.faqArrayItems").length).toBe(3);
      const button1 = getByTestId("question 0");
      const button2 = getByTestId("question 1");
      const button3 = getByTestId("question 2");

      getByText("Fråga 1");
      getByText("Fråga 2");
      getByText("Fråga 3");
      fireEvent.press(button1);
      fireEvent.press(button2);
      fireEvent.press(button3);
    });
  });

  it("Can open the answers", async () => {
    const { getByTestId, getAllByTestId, getAllByText, getByText } = render(
      <Faq />
    );

    await waitFor(() => {
      const button1 = getByTestId("question 0");
      const button2 = getByTestId("question 1");
      const button3 = getByTestId("question 2");
      fireEvent.press(button1);
      getByText("ANSWER 1");
      fireEvent.press(button2);
      getByText("ANSWER 2");
      fireEvent.press(button3);
      getByText("ANSWER 3");
    });
  });
});
