import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { MenuOverlay } from "../../components/MenuOverlay";
import { useMenuNavigation } from "../../components/MenuOverlay/useMenuNavigation";
import {
  mockUserNav,
  adminNavigations,
  superAdminNavigations,
} from "../../components/MenuOverlay/mock/mockUseMenuNavigation";

import { Role } from "../../utility/enums";
import { UserLevelProvider } from "../../context/useUserLevel";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

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

jest.mock("../../context/SuperAdminContext", () => ({
  useSuperAdminFunction: () => ({
    setGetAllUsers: jest.fn(),
    userLevel: jest.fn(),
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("../../components/MenuOverlay/useMenuNavigation", () => ({
  useMenuNavigation: jest.fn(),
}));

let mockUserLevel = Role.user;

jest.mock("../../context/useUserLevel", () => ({
  useUserLevel: () => ({
    userLevel: mockUserLevel,
  }),
}));

const user = () => {
  mockUserLevel = Role.user;
  useMenuNavigation.mockReturnValueOnce(mockUserNav);
};

const admin = () => {
  mockUserLevel = Role.admin;
  useMenuNavigation.mockReturnValueOnce([...mockUserNav, ...adminNavigations]);
};

const superAdmin = () => {
  mockUserLevel = Role.superadmin;
  useMenuNavigation.mockReturnValueOnce([
    ...mockUserNav,
    ...adminNavigations,
    ...superAdminNavigations,
  ]);
};

describe("Testing MenuOverlay", () => {
  it("Are the user-menu buttons visible", () => {
    user();
    const { getAllByText, queryByText } = render(
      <MenuOverlay isVisible={true} />,
      { wrapper: UserLevelProvider },
    );

    expect(getAllByText("Stäng").length).toBe(1);
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
    expect(getAllByText("Chat").length).toBe(1);
    expect(getAllByText("Logga ut").length).toBe(1);
  });

  it("Are the admin-menu buttons visible", () => {
    admin();
    const { getAllByText, queryByText } = render(
      <MenuOverlay isVisible={true} />,
      { wrapper: UserLevelProvider },
    );
    expect(getAllByText("Stäng").length).toBe(1);
    expect(getAllByText("Hem").length).toBe(1);
    expect(getAllByText("Min tid").length).toBe(1);
    expect(getAllByText("Aktiviteter").length).toBe(1);
    expect(getAllByText("Admin").length).toBe(1);
    const superAdminPageLink = queryByText("Alla användare");
    expect(superAdminPageLink).toBeNull();
    expect(getAllByText("Om konceptet").length).toBe(1);
    expect(getAllByText("FAQ").length).toBe(1);
    expect(getAllByText("Chat").length).toBe(1);
    expect(getAllByText("Logga ut").length).toBe(1);
  });

  it("Are the superadmin-menu buttons visible", () => {
    superAdmin();
    const { getAllByText } = render(<MenuOverlay isVisible={true} />, {
      wrapper: UserLevelProvider,
    });
    expect(getAllByText("Stäng").length).toBe(1);
    expect(getAllByText("Hem").length).toBe(1);
    expect(getAllByText("Min tid").length).toBe(1);
    expect(getAllByText("Aktiviteter").length).toBe(1);
    expect(getAllByText("Admin").length).toBe(1);
    expect(getAllByText("Om konceptet").length).toBe(1);
    expect(getAllByText("FAQ").length).toBe(1);
    expect(getAllByText("Chat").length).toBe(1);
    expect(getAllByText("Logga ut").length).toBe(1);
  });

  describe("Can you click on the menu buttons?", () => {
    it("Close button", () => {
      const onClickMock = jest.fn();
      user();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const closeButton = getByTestId("menuOverlay.closeButton");
      fireEvent.press(closeButton);
    });

    it("Home button", () => {
      const onClickMock = jest.fn();
      user();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const homeButton = getByTestId("menuLinkButton.HomePage");
      fireEvent.press(homeButton);
      expect(mockedNavigate).toHaveBeenCalledWith("HomePage", {});
    });

    it("My time button", () => {
      const onClickMock = jest.fn();
      user();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const myTimeButton = getByTestId("menuLinkButton.MyTimePage");
      fireEvent.press(myTimeButton);
      expect(mockedNavigate).toHaveBeenCalledWith("MyTimePage", {});
    });

    it("Concept button", () => {
      const onClickMock = jest.fn();
      user();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const aboutButton = getByTestId("menuLinkButton.ConceptPage");
      fireEvent.press(aboutButton);
      expect(mockedNavigate).toHaveBeenCalledWith("ConceptPage", {});
    });

    it("FAQ button", () => {
      const onClickMock = jest.fn();
      user();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const faqButton = getByTestId("menuLinkButton.Faq");
      fireEvent.press(faqButton);
      expect(mockedNavigate).toHaveBeenCalledWith("Faq", {});
    });
    it("Chat button", () => {
      const onClickMock = jest.fn();
      user();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const ChatButton = getByTestId("menuLinkButton.Chat");
      fireEvent.press(ChatButton);
      expect(mockedNavigate).toHaveBeenCalledWith("Chat", {});
    });

    it("Admin button", () => {
      admin();
      const onClickMock = jest.fn();
      const { getByTestId, debug } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );
      debug();
      const adminButton = getByTestId("menuLinkButton.AdminPage");
      fireEvent.press(adminButton);

      expect(mockedNavigate).toHaveBeenCalledWith("AdminPage", {});
    });

    it("Activities button", () => {
      admin();
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const activitiesButton = getByTestId(
        "menuLinkButton.AdminActivityGallery",
      );
      fireEvent.press(activitiesButton);
      expect(mockedNavigate).toHaveBeenCalledWith("AdminActivityGallery", {});
    });
    it("Super admin button", () => {
      superAdmin();
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const superAdminButton = getByTestId(
        "menuLinkButton.AllUsersInTheSystem",
      );
      fireEvent.press(superAdminButton);

      expect(mockedNavigate).toHaveBeenCalledWith("AllUsersInTheSystem", {});
    });

    it("Log out button", () => {
      const onClickMock = jest.fn();
      let error = "ete";
      const { getByTestId } = render(
        <MenuOverlay openOverlay={onClickMock} isVisible={true} />,
        { wrapper: UserLevelProvider },
      );

      const logoutButton = getByTestId("menuOverlay.logoutButton");
      mockAuthSignOut.mockResolvedValue();
      fireEvent.press(logoutButton);
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
