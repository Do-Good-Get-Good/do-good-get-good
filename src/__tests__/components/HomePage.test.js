import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import "react-native";
import { HomePage } from "../../screens/HomePage";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: () => ({
    isConnected: false,
  }),
}));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: jest.fn(),
  };
});

jest.mock("../../hooks/useLinkedActivities", () => ({
  useLinkedActivities: () => ({
    timeObject: [],
    activities: [],
    isLoading: false,
  }),
}));

jest.mock("../../hooks/useActivitySuggestions", () => ({
  useActivitySuggestions: () => {
    return {
      suggestions: jest.fn(),
      loading: jest.fn(),
    };
  },
}));

jest.mock("../../components/MyActivities", () => ({
  MyActivities: () => <mockView></mockView>,
}));

jest.mock("../../components/TimeStatistics", () => () => {
  return <mockView></mockView>;
});

jest.mock("../../components/NewestTimeEntries", () => () => {
  return <mockView></mockView>;
});

jest.mock("../../components/HomeSuggestions", () => () => {
  return <mockView></mockView>;
});

let mockAuthSignOut = jest.fn();

jest.mock("@react-native-firebase/auth", () => {
  const auth = jest.requireActual("@react-native-firebase/auth");
  return () => ({
    ...auth,
    signOut: mockAuthSignOut,
  });
});
let mockPrivacyPolicyKey = "false";
const mockSetItemAsyncStorage = jest.fn();
jest.mock("@react-native-async-storage/async-storage", () => {
  const actualAsyncStorage = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  );

  return {
    ...actualAsyncStorage,
    getItem: jest.fn((key) => {
      if (key === "@Is_Approved_Privacy_Policy_Key") {
        return Promise.resolve(mockPrivacyPolicyKey);
      }
      return actualAsyncStorage.getItem(key);
    }),
    setItem: jest.fn((key, value) => {
      mockSetItemAsyncStorage(key, value);
      return Promise.resolve();
    }),
  };
});
const setMockPrivacyPolicyKey = (value) => {
  mockPrivacyPolicyKey = value;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Testing HomePage", () => {
  it("Should not show Disclaimer if user approved it already", async () => {
    setMockPrivacyPolicyKey("true");

    const { queryByTestId } = render(<HomePage />);
    await waitFor(() => {
      expect(queryByTestId("disclaimer-overlay")).toBeNull();
    });
  });

  it("Should show Disclaimer if user did not approve it yet", async () => {
    setMockPrivacyPolicyKey("false");
    const { getByTestId } = render(<HomePage />);
    await waitFor(() => {
      expect(getByTestId("disclaimer-overlay")).toBeTruthy();
    });
  });

  it("Should save value in local storage and hide disclaimer  if user pressed Fortsätt", async () => {
    setMockPrivacyPolicyKey("false");

    const { getByTestId, getByText, queryByTestId } = render(<HomePage />);
    await waitFor(() => {
      expect(getByTestId("disclaimer-overlay")).toBeTruthy();
    });

    fireEvent.press(getByText("Fortsätt"));
    expect(mockSetItemAsyncStorage).toHaveBeenCalledWith(
      "@Is_Approved_Privacy_Policy_Key",
      "true"
    );

    await waitFor(() => {
      expect(queryByTestId("disclaimer-overlay")).toBeNull();
    });
  });

  it("Should logout if user pressed Avbryt", async () => {
    setMockPrivacyPolicyKey("false");

    const { getByTestId, getByText } = render(<HomePage />);

    await waitFor(() => {
      expect(getByTestId("disclaimer-overlay")).toBeTruthy();
    });

    fireEvent.press(getByText("Avbryt"));
    expect(mockSetItemAsyncStorage).toHaveBeenCalledWith(
      "@Is_Approved_Privacy_Policy_Key",
      "false"
    );

    await waitFor(() => {
      expect(mockAuthSignOut).toHaveBeenCalled();
    });
  });

  it("Can find the 'Förslag & inspiration' text", () => {
    const { getByText } = render(<HomePage />);

    expect(getByText("Förslag & inspiration"));
  });
});
