import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

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

jest.mock("@react-native-async-storage/async-storage", () => {
  const actualAsyncStorage = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  );
  return {
    ...actualAsyncStorage,
    getItem: () => null,
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
    id: "id3",
    data: () => ({
      question: "Fråga 3",
      answer: "ANSWER 3",
    }),
  },
];

var mockGet = jest.fn();

jest.mock("@react-native-firebase/firestore", () => {
  const firebaseActualFireStore = jest.requireActual(
    "@react-native-firebase/firestore"
  );
  return () => ({
    ...firebaseActualFireStore,
    collection: jest.fn(() => ({
      get: mockGet,
    })),
  });
});

describe("Testing Faq page", () => {
  it("Renders page correctly", async () => {
    mockGet.mockResolvedValueOnce(testDataArray);
    const { getByTestId, getAllByTestId, getByText } = render(<Faq />);

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
    mockGet.mockResolvedValueOnce(testDataArray);
    const { getByTestId, getByText } = render(<Faq />);

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

  it("Can close the answers", async () => {
    mockGet.mockResolvedValueOnce(testDataArray);
    const { getByTestId, queryByText, getByText } = render(<Faq />);

    await waitFor(() => {
      const button1 = getByTestId("question 0");
      fireEvent.press(button1);
      getByText("ANSWER 1");

      fireEvent.press(button1);
      expect(queryByText("ANSWER 1")).toBeNull();
    });
  });

  it("Can open one answer and close all other", async () => {
    mockGet.mockResolvedValueOnce(testDataArray);
    const { getByTestId, queryByText, getByText } = render(<Faq />);
    await waitFor(() => {
      const button1 = getByTestId("question 0");
      const button2 = getByTestId("question 1");

      fireEvent.press(button1);
      getByText("ANSWER 1");
      expect(queryByText("ANSWER 2")).toBeNull();
      expect(queryByText("ANSWER 3")).toBeNull();

      fireEvent.press(button2);
      getByText("ANSWER 2");
      expect(queryByText("ANSWER 1")).toBeNull();
      expect(queryByText("ANSWER 3")).toBeNull();
    });
  });

  it("Testing error message", async () => {
    mockGet.mockRejectedValueOnce("no-data");
    const { queryByTestId } = render(<Faq />);
    await waitFor(() => {
      expect(queryByTestId("errorTextId").props.children).toEqual(
        "Sorry, something went wrong"
      );
    });
  });
});
