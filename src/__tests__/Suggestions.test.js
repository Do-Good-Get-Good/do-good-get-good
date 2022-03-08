import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import Suggestions from "../components/Suggestions";
import { useSuggestionFunction } from "../context/SuggestionContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../context/SuggestionContext", () => ({
  useSuggestionFunction: () => ({
    popularActivities: jest.fn(),
  }),
}));

jest.mock("../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    activeOrInactiveActivity: true,
  }),
}));

jest.mock("../context/AdminContext", () => ({
  useAdminCheckFunction: jest.fn(),
}));

jest.mock("../context/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    changedActivity: jest.fn(),
    setUpdateGallery: jest.fn(),
    updateGallery: false,
  }),
}));

jest.mock("../context/ActivityCardContext", () => ({
  useActivityCardContext: () => ({
    inactiveActivities: jest.fn(),
    oneActivityHasBeenDeleted: false,
    idOfTheActivityWhichHasBeenDeleted: "id",
    confirmToDeleteActivity: jest.fn(),
    changePopularStatusInAdminGallery: jest.fn(),
  }),
}));

// afterEach(() => {
//   jest.clearAllMocks();
// });

const adminGallery = {
  active: true,
  city: "city",
  description: "description",
  id: "id",
  photo: "symbol_earth",
  place: "place",
  popular: true,
  title: "title",
};

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
      />
    );

    waitFor(() => {
      const buttonLookDetails = getByTestId("lookDetails");
      fireEvent.press(buttonLookDetails);

      const buttonLookDetails2 = getByTestId("lookDetails2");
      fireEvent.press(buttonLookDetails2);
    });
  });

  it("Suggestions text title exist", () => {
    const { getAllByText } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
      />
    );
    waitFor(() => {
      expect(getAllByText("title").length).toBe(1);
    });
  });
  it("Suggestions text city exist", () => {
    const { getAllByText } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
      />
    );

    waitFor(() => {
      expect(getAllByText("city").length).toBe(1);
    });
  });

  it("Suggestions text description exist", () => {
    const { getAllByText } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
      />
    );

    waitFor(() => {
      expect(getAllByText("description").length).toBe(1);
    });
  });

  it("Suggestions text photo exist", () => {
    const { getByTestId } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
      />
    );

    waitFor(() => {
      const image = getByTestId("photo");
      expect(image.props.source).toEqual({
        testUri: "../../../img/activities_images/symbol_earth.png",
      });
    });
  });

  it("Suggestions text Läs mer exist", () => {
    const { getAllByText } = render(
      <Suggestions
        navigation={navigation}
        adminGallery={adminGallery}
        inactiveActivities={inactiveActivities}
      />
    );

    waitFor(() => {
      expect(getAllByText("Läs mer").length).toBe(1);
    });
  });

  it("Possible for admin to delete activity ", () => {
    useActivityCardContext().oneActivityHasBeenDeleted = true;
    useActivityCardContext().confirmToDeleteActivity(false);
  });

  it("Possible for admin to change status popular activity ", () => {
    useCreateActivityFunction().updateGallery = true;
    useActivityCardContext().changePopularStatusInAdminGallery(false);
    useCreateActivityFunction().setUpdateGallery(false);
  });
});
