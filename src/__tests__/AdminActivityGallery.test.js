import "react-native";
import React, { useState as useStateMock } from "react";
import { render } from "@testing-library/react-native";

import AdminActivityGallery from "../screens/AdminActivityGallery";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../components/Suggestions", () => () => {
  return <mockSuggestions />;
});
jest.mock("../components/RadioButton", () => () => {
  return <mockRadioButton />;
});
jest.mock("../components/DropDownForSorting", () => () => {
  return <mockDropDownForSorting />;
});

jest.mock("../components/Menu", () => () => {
  return <mockMenu />;
});

jest.mock("../components/SearchBarComponent", () => () => {
  return <mockSearchBar />;
});

jest.mock("../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    inactiveActivities: jest.fn(),
    setSearchWordHasNoMatch: jest.fn(),
    showSearchObject: jest.fn(() => ({
      length: jest.fn(),
    })),
  }),
}));

jest.mock("../context/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    activeActivities: jest.fn(),
    setSearchWordHasNoMatch: jest.fn(),
    activityHasChanged: jest.fn(),
    showSearchObject: jest.fn(() => ({
      length: jest.fn(),
    })),
  }),
}));

jest.mock("../context/ActivityCardContext", () => ({
  useActivityCardContext: () => ({
    active: true,
    popular: true,
    changePopularStatusInAdminGallery: jest.fn(),
    changeActiveStatusInAdminGallery: jest.fn(),
    changePopular: jest.fn(),
    changeActive: jest.fn(),
  }),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("Testing AdminActivityGallery ", () => {
  const setArrayOfActiveActivities = jest.fn();
  const setInactiveActivities = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation((init) => [
      init,
      setArrayOfActiveActivities,
    ]);
    useStateMock.mockImplementation((init) => [init, setInactiveActivities]);
  });

  it("AdminActivityGallery if status active or popular has been changed ", () => {
    useActivityCardContext().popular = true;
    render(<AdminActivityGallery />);

    useCreateActivityFunction().activityHasChanged.mockReturnValue(true);

    useActivityCardContext().changePopularStatusInAdminGallery.mockReturnValue(
      false
    );
    useActivityCardContext().changeActiveStatusInAdminGallery.mockReturnValue(
      false
    );
  });

  it("AdminActivityGallery fill up arrayOfActiveActivities and inactiveActivities ", () => {
    const {} = render(<AdminActivityGallery />);
    setArrayOfActiveActivities(
      useCreateActivityFunction().activeActivities.mock
    );
    setInactiveActivities(useAdminGalleryFunction().inactiveActivities.mock);
  });
});
