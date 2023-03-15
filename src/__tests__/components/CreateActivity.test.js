import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import CreateActivity from "../../screens/CreateActivity";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("../../components/Menu", () => () => {
  return <fakeMenu />;
});

jest.mock("@react-navigation/native");

jest.mock("../../context/CreateActivityContext", () => ({
  useCreateActivityFunction: () => ({
    setAllActiveActvivitiesFB: jest.fn(),
  }),
}));

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const route = {
  params: {
    imageForActivity: "blodgivning",
  },
};

describe("Testing CreateActivity ", () => {
  it("Title exists", () => {
    const { getAllByText } = render(<CreateActivity route={route} />);
    expect(getAllByText("Lägg till aktivitet").length).toBe(1);
  });

  it("Can update activity title", () => {
    const { getByPlaceholderText } = render(<CreateActivity route={route} />);
    fireEvent.changeText(getByPlaceholderText("Aktivitet"), "Aktivity title");
  });

  it("Can update place", () => {
    const { getByPlaceholderText } = render(<CreateActivity route={route} />);
    fireEvent.changeText(getByPlaceholderText("Var"), "Aktivity place");
  });

  it("Can update city", () => {
    const { getByPlaceholderText } = render(<CreateActivity route={route} />);
    fireEvent.changeText(getByPlaceholderText("Aktör"), "Aktivity city");
  });

  it("Can update description", () => {
    const { getByPlaceholderText } = render(<CreateActivity route={route} />);
    fireEvent.changeText(getByPlaceholderText("Vad"), "Aktivity Description");
  });

  it("Photo exists in CreateActivity", () => {
    const { getByTestId } = render(<CreateActivity route={route} />);
    const image = getByTestId("photo");
    expect(image.props.source).toEqual({
      testUri:
        "../../../assets/images/activities/square/blodgivning_400x400.png",
    });
  });
  it("Can navigate to ImagesGallery", () => {
    const { getByTestId } = render(
      <CreateActivity route={route} navigation={navigation} />,
    );

    const imagesGalleryButton = getByTestId("navigateToImagesGallery");
    fireEvent.press(imagesGalleryButton);
    expect(navigation.navigate).toHaveBeenCalledWith("ImagesGallery", {
      cameFrom: "CreateActivity",
      selectedImage: "blodgivning",
    });
  });

  it("Button with text 'Infoga' exist", () => {
    const { getAllByText } = render(
      <CreateActivity route={route} navigation={navigation} />,
    );
    expect(getAllByText("Infoga").length).toBe(1);
  });
  it("Text 'Lägg till som TG-favorit' exist", () => {
    const { getAllByText } = render(
      <CreateActivity route={route} navigation={navigation} />,
    );
    expect(getAllByText("Lägg till som TG-favorit").length).toBe(1);
  });

  it("Can press TG-favorite button", () => {
    const { getByTestId } = render(
      <CreateActivity route={route} navigation={navigation} />,
    );

    const buttonSomTGFavorit = getByTestId("buttonSomTGFavorit");
    fireEvent.press(buttonSomTGFavorit);
  });

  it("Text 'TG-favoriter visas för alla användare' exist", () => {
    const { getAllByText } = render(
      <CreateActivity route={route} navigation={navigation} />,
    );
    expect(getAllByText("TG-favoriter visas för alla användare").length).toBe(
      1,
    );
  });
});
