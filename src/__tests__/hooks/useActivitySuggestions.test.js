import "react-native";
import React from "react";
import { renderHook, act } from "@testing-library/react-native";

import { useActivitySuggestions } from "../../hooks/useActivitySuggestions";
import { getAllActivities } from "../../firebase-functions/get";

jest.mock("../../firebase-functions/get", () => ({
  getAllActivities: jest.fn(),
}));

const mockData = [
  {
    id: 123,
    title: "title",
    city: "city",
    place: "place",
    description: "description",
    photo: "photo",
    popular: true,
  },
];

describe("Testing useActivitySuggestions", () => {
  it("useActivitySuggestions returns suggestions", async () => {
    getAllActivities.mockReturnValue(mockData);

    const { result, rerender } = renderHook(useActivitySuggestions);
    expect(result.current).toMatchObject({
      suggestions: [],
      loading: true,
    });
    await act(async () => {
      rerender();
    });
    expect(result.current).toMatchObject({
      suggestions: mockData,
      loading: false,
    });
  });
});
