import { render } from "@testing-library/react-native";
import React, { useState as useStateMock } from "react";
import "react-native";
import { useActivityCardContext } from "../../context/ActivityCardContext";
import { useAdminGalleryFunction } from "../../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../../context/CreateActivityContext/CreateActivityContext";
import AdminActivityGallery from "../../screens/AdminActivityGallery";

jest.mock("../../components/Suggestions", () => () => {
  return <></>;
});
jest.mock("../../components/RadioButton", () => () => {
  return <></>;
});

jest.mock("../../components/DropDownForSorting", () => () => {
  return <></>;
});

jest.mock("../../components/SearchBarComponentOld", () => () => {
  return <></>;
});

jest.mock("../../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    inactiveActivities: jest.fn(),
    setSearchWordHasNoMatch: jest.fn(),
    showSearchObject: jest.fn(() => ({
      length: jest.fn(),
    })),
  }),
}));

jest.mock("../../context/CreateActivityContext/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    activeActivities: jest.fn(),
    setSearchWordHasNoMatch: jest.fn(),
    activityHasChanged: jest.fn(),
    showSearchObject: jest.fn(() => ({
      length: jest.fn(),
    })),
  }),
}));

jest.mock("../../context/ActivityCardContext", () => ({
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
