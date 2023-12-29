import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

import Suggestions from "../../components/Suggestions";
import { useCreateActivityFunction } from "../../context/CreateActivityContext";
import { useActivityCardContext } from "../../context/ActivityCardContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("../../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    activeOrInactiveActivity: true,
    searchWordHasNoMatch: false,
  }),
}));

jest.mock("../../context/UserLevelContext", () => ({
  useUserLevel: jest.fn(),
}));

jest.mock("../../context/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    changedActivity: jest.fn(),
    setUpdateGallery: jest.fn(),
    searchWordHasNoMatch: true,
    updateGallery: false,
  }),
}));

jest.mock("../../context/ActivityCardContext", () => ({
  useActivityCardContext: () => ({
    inactiveActivities: jest.fn(),
    oneActivityHasBeenDeleted: false,
    idOfTheActivityWhichHasBeenDeleted: "id",
    confirmToDeleteActivity: jest.fn(),
    changePopularStatusInAdminGallery: jest.fn(),
  }),
}));

const adminGallery = [
  {
    active: true,
    city: "city",
    description: "description",
    id: "id",
    photo: "symbol_earth",
    place: "place",
    popular: true,
    title: "title",
  },
];

const inactiveActivities = [
  {
    active: false,
    city: "city",
    description: "description",
    id: "id",
    photo: "symbol_earth",
    popular: false,
    title: "title",
  },
];

const navigation = {
  navigate: jest.fn(),
};

jest.mock("@react-navigation/native");

describe("Testing Suggestions", () => {
  it("Suggestions function lookDetails and lookDetails2 for AdminActivityGallery", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "AdminActivityGallery",
    });

    const { getByTestId } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
      />,
    );

    const buttonLookDetails = getByTestId("lookDetails");

    act(() => {
      fireEvent.press(buttonLookDetails);
    });
  });

  it("Suggestions text title exist", () => {
    const { getAllByText } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
        choiceFromDropDown={"Namn"}
      />,
    );

    expect(getAllByText("title").length).toBe(1);
  });

  it("Suggestions text city exist", () => {
    const { getAllByText } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
        choiceFromDropDown={"Namn"}
      />,
    );

    expect(getAllByText("city").length).toBe(1);
  });

  it("Suggestions text description exist", () => {
    const { getAllByText } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
        choiceFromDropDown={"Namn"}
      />,
    );

    expect(getAllByText("description").length).toBe(1);
  });

  it("Suggestions text photo exist", () => {
    const { getByTestId } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
        choiceFromDropDown={"Namn"}
      />,
    );

    const image = getByTestId("photo");
    expect(image.props.source).toEqual({
      testUri: "../../../img/activities_images/symbol_earth.png",
    });
  });

  it("Possible for admin to change status popular activity ", () => {
    render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
        choiceFromDropDown={"Namn"}
      />,
    );

    useActivityCardContext().changePopularStatusInAdminGallery.mockReturnValue(
      false,
    );
    useCreateActivityFunction().setUpdateGallery.mockReturnValue(false);
  });

  it("If word from the searchBar doesn't match any activity, should stay text Inga resultat", () => {
    const { getAllByText } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
        choiceFromDropDown={"Namn"}
      />,
    );
    expect(getAllByText("Din sökning gav inga resultat.").length).toBe(1);
  });
});
