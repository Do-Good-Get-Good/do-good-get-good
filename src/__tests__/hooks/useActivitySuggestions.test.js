import { act, renderHook } from "@testing-library/react-native";
import "react-native";
import { getAllActivities } from "../../firebase-functions/get";
import { useActivitySuggestions } from "../../hooks/useActivitySuggestions";

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

  it("useActivitySuggestions can throw error", async () => {
    let errorMessage = "There was an error fetching data.";
    getAllActivities.mockRejectedValue(new Error(errorMessage));

    const { result, rerender } = renderHook(useActivitySuggestions);
    expect(result.current).toMatchObject({
      suggestions: [],
      loading: true,
      error: null,
    });
    await act(async () => {
      rerender();
    });
    expect(result.current).toMatchObject({
      suggestions: [],
      loading: false,
      error: errorMessage,
    });
  });
});
