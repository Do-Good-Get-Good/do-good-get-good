import "react-native";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import ConceptPage from "../screens/ConceptPage";

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

describe("Testing Concept page", () => {
  it("Main title exist", () => {
    const { getByTestId } = render(<ConceptPage />);
    getByTestId("headerText");
  });
  it("find 10 activitys", () => {
    const { getAllByTestId, getByTestId } = render(<ConceptPage />);

    expect(getAllByTestId("arrayItems").length).toBe(1);

    // await waitFor(() => {
    //   // expect(getAllByTestId("arrayItems").length).toBe(3);
    //   getByTestId("activityCard 0");
    //   // const button2 = getByTestId("activityCard 1");
    //   // const button3 = getByTestId("activityCard 2");
    // });
  });
});
