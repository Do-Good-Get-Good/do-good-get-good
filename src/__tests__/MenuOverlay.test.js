import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import MenuOverlay from "../components/MenuOverlay";

import { useAdminCheckFunction } from "../context/AdminContext";
import { useActivityFunction } from "../context/ActivityContext";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

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

let mockAuthSignOut = jest.fn();

jest.mock("@react-native-firebase/auth", () => {
  const auth = jest.requireActual("@react-native-firebase/auth");
  return () => ({
    ...auth,
    currentUser: {
      email: "test@test.com",
    },
    signOut: mockAuthSignOut,
  });
});

jest.mock("../context/AdminContext", () => ({
  useAdminCheckFunction: jest.fn(),
}));

jest.mock("../context/ActivityContext", () => ({
  useActivityFunction: () => ({
    getIfoFromActivitiesList: jest.fn(),
    setLimitAmountForTimeEntries: jest.fn(),
  }),
}));

jest.mock("../context/AdminGalleryContext", () => ({
  useAdminGalleryFunction: () => ({
    chooseActiveOrNot: jest.fn(),
    setCleanUpSearchBarComponent: jest.fn(),
  }),
}));

jest.mock("../context/SuperAdminContext", () => ({
  useSuperAdminFunction: () => ({
    setGetAllUsers: jest.fn(),
    userLevel: jest.fn(),
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testing MenuOverlay", () => {
  it("Are the user-menu buttons visible", () => {
    const { getAllByText, queryByText } = render(
      <MenuOverlay isVisible={true} />
    );
    expect(getAllByText("Stäng").length).toBe(1);
    expect(getAllByText("Byt språk").length).toBe(1);
    expect(getAllByText("Hem").length).toBe(1);
    expect(getAllByText("Min tid").length).toBe(1);
    const activitiesLink = queryByText("Aktiviteter");
    const adminPageLink = queryByText("Admin");
    const superAdminPageLink = queryByText("Alla användare");
    expect(activitiesLink).toBeNull();
    expect(adminPageLink).toBeNull();
    expect(superAdminPageLink).toBeNull();
    expect(getAllByText("Om konceptet").length).toBe(1);
    expect(getAllByText("FAQ").length).toBe(1);
    expect(getAllByText("Logga ut").length).toBe(1);
  });

  it("Are the admin-menu buttons visible", () => {
    useAdminCheckFunction.mockReturnValueOnce("admin");
    const { getAllByText, queryByText } = render(
      <MenuOverlay isVisible={true} />
    );
    expect(getAllByText("Stäng").length).toBe(1);
    expect(getAllByText("Byt språk").length).toBe(1);
    expect(getAllByText("Hem").length).toBe(1);
    expect(getAllByText("Min tid").length).toBe(1);
    expect(getAllByText("Aktiviteter").length).toBe(1);
    expect(getAllByText("Admin").length).toBe(1);
    const superAdminPageLink = queryByText("Alla användare");
    expect(superAdminPageLink).toBeNull();
    expect(getAllByText("Om konceptet").length).toBe(1);
    expect(getAllByText("FAQ").length).toBe(1);
    expect(getAllByText("Logga ut").length).toBe(1);
  });

  it("Are the superadmin-menu buttons visible", () => {
    useAdminCheckFunction.mockReturnValueOnce("superadmin");
    const { getAllByText } = render(<MenuOverlay isVisible={true} />);
    expect(getAllByText("Stäng").length).toBe(1);
    expect(getAllByText("Byt språk").length).toBe(1);
    expect(getAllByText("Hem").length).toBe(1);
    expect(getAllByText("Min tid").length).toBe(1);
    expect(getAllByText("Aktiviteter").length).toBe(1);
    expect(getAllByText("Admin").length).toBe(1);
    expect(getAllByText("Alla användare").length).toBe(1);
    expect(getAllByText("Om konceptet").length).toBe(1);
    expect(getAllByText("FAQ").length).toBe(1);
    expect(getAllByText("Logga ut").length).toBe(1);
  });

  describe("Can you click on the menu buttons?", () => {
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
      expect(mockedNavigate).toHaveBeenCalledWith("HomePage");
    });

    it("Activities button", () => {
      useAdminCheckFunction.mockReturnValueOnce("admin");
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const activitiesButton = getByTestId("menuOverlay.activitiesButton");
      fireEvent.press(activitiesButton);
      useAdminGalleryFunction().chooseActiveOrNot.mockReturnValue(true);
      useAdminGalleryFunction().setCleanUpSearchBarComponent.mockReturnValue(
        true
      );

      expect(mockedNavigate).toHaveBeenCalledWith("AdminActivityGallery");
    });

    it("Admin button", () => {
      useAdminCheckFunction.mockReturnValueOnce("admin");
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const adminButton = getByTestId("menuOverlay.adminButton");
      fireEvent.press(adminButton);

      expect(mockedNavigate).toHaveBeenCalledWith("AdminPage");
    });

    it("Super admin button", () => {
      useAdminCheckFunction.mockReturnValueOnce("superadmin");
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const superAdminButton = getByTestId("menuOverlay.allUsersInTheSystem");
      fireEvent.press(superAdminButton);

      expect(mockedNavigate).toHaveBeenCalledWith("AllUsersInTheSystem");
    });

    it("My time button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const myTimeButton = getByTestId("menuOverlay.myTimeButton");
      fireEvent.press(myTimeButton);
      useActivityFunction().setLimitAmountForTimeEntries.mockReturnValue(20);
      expect(mockedNavigate).toHaveBeenCalledWith("MyTimePage");
    });

    it("About button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const aboutButton = getByTestId("menuOverlay.aboutButton");
      fireEvent.press(aboutButton);
      expect(mockedNavigate).toHaveBeenCalledWith("ConceptPage");
    });

    it("FAQ button", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const faqButton = getByTestId("menuOverlay.faqButton");
      fireEvent.press(faqButton);
      expect(mockedNavigate).toHaveBeenCalledWith("Faq");
    });

    it("Log out button", () => {
      const onClickMock = jest.fn();
      let error = "ete";
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />
      );

      const logoutButton = getByTestId("menuOverlay.logoutButton");
      mockAuthSignOut.mockResolvedValue();
      fireEvent.press(logoutButton);
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
