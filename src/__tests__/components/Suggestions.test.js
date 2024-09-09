import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import Suggestions from "../../components/Suggestions";
import { useActivityCardContext } from "../../context/ActivityCardContext";
import { useCreateActivityFunction } from "../../context/CreateActivityContext/CreateActivityContext";

jest.mock("@react-native-async-storage/async-storage", () => {
  const actualAsyncStorage = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  );
  return {
    ...actualAsyncStorage,
    getItem: () => null,
  };
});

jest.mock("../../context/ActivityImagesContext/ActivityImagesContext", () => ({
  useActivityImages: jest.fn(() => ({
    getImageForActivity: jest.fn(() => ({
      photo: "symbol_blood",
    })),
  })),
}));

jest.mock("../../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    activeOrInactiveActivity: true,
    searchWordHasNoMatch: false,
  }),
}));

jest.mock("../../context/CreateActivityContext/CreateActivityContext", () => ({
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
    photo: "blodgivning",
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
    photo: "blodgivning",
    popular: false,
    title: "title",
  },
];

const navigation = {
  navigate: jest.fn(),
};

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
      />
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
      />
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
      />
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
      />
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
      />
    );

    const image = getByTestId("photo");
    expect(image.props.source).toEqual({
      photo: "symbol_blood",
    });
  });

  it("Possible for admin to change status popular activity ", () => {
    render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
        choiceFromDropDown={"Namn"}
      />
    );

    useActivityCardContext().changePopularStatusInAdminGallery.mockReturnValue(
      false
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
      />
    );
    expect(getAllByText("Din sökning gav inga resultat.").length).toBe(1);
  });
});
