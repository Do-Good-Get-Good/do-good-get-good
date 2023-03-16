import "react-native";
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ConceptPage from "../../screens/ConceptPage";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: () => ({
    isConnected: false,
  }),
}));

jest.mock("../../components/Menu", () => () => {
  return <></>;
});

jest.mock("../../firebase-functions/get", () => ({
  getUserData: () => ({
    id: "123",
    first_name: "test",
    last_name: "test",
  }),
  getActivitiesMatchTimeEntries: () => ({
    title: "Title",
    photo: "symbol_earth",
    city: "City",
  }),
  getConcept: () => {
    return [
      {
        order_id: 0,
        heading: "Heading",
        body: "Body",
      },
    ];
  },
  getTenLastConfirmedTimeEntries: () => ({
    size: 1,
    docs: [
      {
        data: () => ({
          user_id: "123",
          date: {
            toDate: () => new Date("2022-12-30"),
          },
        }),
      },
    ],
  }),
}));

describe("Testing ManageUsers component", () => {
  it("Renders the page correctly", async () => {
    const { getByText, getByTestId } = render(<ConceptPage />);

    await waitFor(() => {
      expect(getByText("Om konceptet"));
      expect(getByText("Heading"));
      expect(getByText("Body"));
      expect(getByText("Senaste"));
      expect(getByText("Title"));
      expect(getByText("City"));
      expect(getByText("test test"));

      const image = getByTestId("image");
      expect(image.props.source).toEqual({
        testUri: "../../../img/activities_images/symbol_earth.png",
      });

      const bottomLogo = getByTestId("login.bottomLogo");
      expect(bottomLogo.props.source).toEqual({
        testUri: "../../../img/Technogarden-logotyp-Large.png",
      });
    });
  });
});
