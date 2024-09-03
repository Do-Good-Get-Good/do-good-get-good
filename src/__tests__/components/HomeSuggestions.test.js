import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import HomeSuggestions from "../../components/HomeSuggestions";

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

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

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
const mockSuggestions = [
  {
    id: 123,
    title: "title",
    city: "city",
    place: "place",
    description: "description",
    photo: "symbol_blood",
    popular: true,
  },
];

describe("Testing HomeSuggestions", () => {
  it("Renders the suggestion card correctl and can press on it", () => {
    const { getByText, getByTestId } = render(
      <HomeSuggestions suggestions={mockSuggestions} />
    );

    const title = getByText("title");
    expect(title);

    const city = getByText("city");
    expect(city);

    const description = getByText("description");
    expect(description);

    const image = getByTestId("photo");
    expect(image.props.source).toEqual({
      photo: "symbol_blood",
    });

    const suggestionCard = getByTestId("lookDetails");
    expect(suggestionCard);
    fireEvent.press(suggestionCard);
    expect(mockNavigate).toHaveBeenCalledWith("ActivityCardDetails", {
      activityInfo: {
        city: mockSuggestions[0].city,
        description: mockSuggestions[0].description,
        id: mockSuggestions[0].id,
        photo: mockSuggestions[0].photo,
        place: mockSuggestions[0].place,
        popular: mockSuggestions[0].popular,
        title: mockSuggestions[0].title,
      },
    });
  });
});
