import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import MenuOverlay from "../components/MenuOverlay";
import { useAdminCheckFunction } from "../context/AdminContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock("../context/AdminContext", () => ({
  useAdminCheckFunction: jest.fn(),
}));

jest.mock("../context/ActivityContext", () => ({
  useActivityFunction: () => ({
    getIfoFromActivitiesList: jest.fn(),
  }),
}));

describe("Testing MenuOverlay", () => {
  it("Are the user-menu buttons visible", () => {
    const { getAllByText, queryByText } = render(
      <MenuOverlay isVisible={true} />
    );
    expect(getAllByText("Stäng").length).toBe(1);
    expect(getAllByText("Byt språk knapp").length).toBe(1);
    expect(getAllByText("Hem").length).toBe(1);
    const adminLink = queryByText("Aktiviteter");
    expect(adminLink).toBeNull();
    expect(getAllByText("Min tid").length).toBe(1);
    expect(getAllByText("Om konceptet").length).toBe(1);
    expect(getAllByText("FAQ").length).toBe(1);
    expect(getAllByText("Logga ut").length).toBe(1);
  });

  it("Are the admin-menu buttons visible", () => {
    useAdminCheckFunction.mockReturnValue("admin");
    const { getAllByText, queryByText } = render(
      <MenuOverlay isVisible={true} />
    );
    expect(getAllByText("Stäng").length).toBe(1);
    expect(getAllByText("Byt språk knapp").length).toBe(1);
    expect(getAllByText("Hem").length).toBe(1);
    expect(getAllByText("Aktiviteter").length).toBe(1);
    const userLink = queryByText("Min tid");
    expect(userLink).toBeNull();
    expect(getAllByText("Om konceptet").length).toBe(1);
    expect(getAllByText("FAQ").length).toBe(1);
    expect(getAllByText("Logga ut").length).toBe(1);
  });

  describe("Can you click on links", () => {
    it("Close button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const closeButton = getByTestId("menuOverlay.closeButton");
      fireEvent.press(closeButton);
    });
    it("Change language button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const languageButton = getByTestId("menuOverlay.languageButton");
      fireEvent.press(languageButton);
    });
    it("Home button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const homeButton = getByTestId("menuOverlay.homeButton");
      fireEvent.press(homeButton);
    });
    it("Activities button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const activitiesButton = getByTestId("menuOverlay.activitiesButton");
      fireEvent.press(activitiesButton);
    });
    it("My time button", () => {
      useAdminCheckFunction.mockReturnValue("user");
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const myTimeButton = getByTestId("menuOverlay.myTimeButton");
      fireEvent.press(myTimeButton);
    });
    it("About button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const aboutButton = getByTestId("menuOverlay.aboutButton");
      fireEvent.press(aboutButton);
    });
    it("FAQ button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const faqButton = getByTestId("menuOverlay.faqButton");
      fireEvent.press(faqButton);
    });
  });
});
