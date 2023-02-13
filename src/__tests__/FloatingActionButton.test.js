import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FloatingActionButton from "../components/FloatingActionButton";

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

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("Testing FloatingActionButton", () => {
  it("can press the action button", () => {
    const { getByTestId } = render(<FloatingActionButton />);
    const fabButton = getByTestId("open.button");
    fireEvent.press(fabButton);
  });

  it("can find the text Lägg till aktivitet & Lägg till användare in FloatingActionButton", () => {
    const { getByTestId, getAllByText } = render(<FloatingActionButton />);
    const fabButton = getByTestId("open.button");
    fireEvent.press(fabButton);
    expect(getAllByText("Lägg till aktivitet").length).toBe(1);
    expect(getAllByText("Lägg till användare").length).toBe(1);
  });

  it("can press the create Activity button and see the navigation", () => {
    const { getByTestId } = render(<FloatingActionButton />);
    const fabButton = getByTestId("open.button");
    fireEvent.press(fabButton);

    const activityButton = getByTestId("createActivity.button");
    fireEvent.press(activityButton);

    expect(mockedNavigate).toHaveBeenCalledWith("CreateActivity");
  });

  it("can press the Create Or Change User button and see the navigation", () => {
    const { getByTestId } = render(<FloatingActionButton />);
    const fabButton = getByTestId("open.button");
    fireEvent.press(fabButton);

    const cocButton = getByTestId("CreateUser.button");
    fireEvent.press(cocButton);

    expect(mockedNavigate).toHaveBeenCalledWith("CreateUser");
  });

  it("can press to close the action button", () => {
    const { getByTestId, getAllByText, queryByText } = render(
      <FloatingActionButton />
    );
    const fabButton = getByTestId("open.button");
    fireEvent.press(fabButton);

    expect(getAllByText("Lägg till aktivitet").length).toBe(1);
    expect(getAllByText("Lägg till användare").length).toBe(1);

    fireEvent.press(fabButton);
    const ActivityText = queryByText("Lägg till aktivitet");
    expect(ActivityText).toBeNull();

    const AddUserText = queryByText("Lägg till användare");
    expect(AddUserText).toBeNull();
  });
});
