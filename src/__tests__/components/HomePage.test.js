import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

import { HomePage } from "../../screens/HomePage";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("../../components/MenuOverlay", () => () => {
  return <mockMenuOverlay />;
});

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

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

jest.mock("../../hooks/useLinkedActivities", () => () => {
  return {
    timeObject: jest.fn(),
    activities: jest.fn(),
    loading: jest.fn(),
  };
});

jest.mock("../../hooks/useActivitySuggestions", () => ({
  useActivitySuggestions: () => {
    return {
      suggestions: jest.fn(),
      loading: jest.fn(),
    };
  },
}));

jest.mock("../../components/MyActivities", () => ({
  MyActivities: () => <></>,
}));

jest.mock("../../components/TimeStatistics", () => () => {
  return <></>;
});

jest.mock("../../components/NewestTimeEntries", () => () => {
  return <></>;
});

jest.mock("../../components/HomeSuggestions", () => () => {
  return <></>;
});

describe("Testing HomePage", () => {
  it("Can find the 'Förslag & inspiration' text", () => {
    const { getByText } = render(<HomePage />);
    expect(getByText("Förslag & inspiration"));
  });
});
