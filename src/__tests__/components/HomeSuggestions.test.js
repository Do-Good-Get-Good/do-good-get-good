import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import HomeSuggestions from "../../components/HomeSuggestions";

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

const mockSuggestions = [
  {
    id: 123,
    title: "title",
    city: "city",
    place: "place",
    description: "description",
    photo: "blodgivning",
    popular: true,
  },
];

describe("Testing HomeSuggestions", () => {
  it("Renders the suggestion card correctl and can press on it", () => {
    const { getByText, getByTestId } = render(
      <HomeSuggestions
        navigation={mockNavigation}
        suggestions={mockSuggestions}
      />,
    );

    const title = getByText("title");
    expect(title);

    const city = getByText("city");
    expect(city);

    const description = getByText("description");
    expect(description);

    const image = getByTestId("photo");
    expect(image.props.source).toEqual({
      testUri:
        "../../../assets/images/activities/square/blodgivning_400x400.png",
    });

    const suggestionCard = getByTestId("lookDetails");
    expect(suggestionCard);
    fireEvent.press(suggestionCard);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("ActivityCard", {
      active: undefined,
      activityInfo: {
        city: mockSuggestions[0].city,
        description: mockSuggestions[0].description,
        id: mockSuggestions[0].id,
        photo: mockSuggestions[0].photo,
        place: mockSuggestions[0].place,
        popular: mockSuggestions[0].popular,
        title: mockSuggestions[0].title,
      },
      admin: false,
      tgPopular: true,
    });
  });
});
