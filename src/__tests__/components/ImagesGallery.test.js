import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import ImagesGallery from "../../screens/ImagesGallery";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("../../components/Menu", () => () => {
  return <mockMenu />;
});

jest.mock("../../context/ActivityImagesContext/ActivityImagesContext", () => ({
  useActivityImages: jest.fn(() => ({
    images: [
      {
        photo: "blodgivning",
        imageUrl: "image-url",
      },
    ],
  })),
}));

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const route = {
  params: {
    cameFrom: "CreateActivity",
    selectedImage: { photo: "blodgivning" },
  },
};

describe("Testing ImagesGallery", () => {
  it("ImagesGallery exist ", () => {
    const { getAllByText } = render(<ImagesGallery route={route} />);
    expect(getAllByText("Bildgalleri").length).toBe(1);
  });

  it("ImagesGallery. Images exist ", () => {
    const { getAllByTestId } = render(<ImagesGallery route={route} />);
    const image = getAllByTestId("imageInImageGallery");

    expect(image[0].props.source).toEqual({
      uri: "image-url",
    });
  });

  it("ImagesGallery. Button 'Save' exist and navigate back  ", () => {
    const { getAllByText, getByText } = render(
      <ImagesGallery navigation={navigation} route={route} />
    );
    expect(getAllByText("Spara").length).toBe(1);
    const saveButton = getByText("Spara");
    fireEvent.press(saveButton);
    expect(navigation.navigate).toHaveBeenCalledWith("CreateActivity", {
      image: { photo: "blodgivning", imageUrl: undefined },
    });
  });

  it("ImagesGallery. Button 'Back' exist and navigate back  ", () => {
    const { getAllByText, getByText } = render(
      <ImagesGallery navigation={navigation} route={route} />
    );
    expect(getAllByText("Avbryt").length).toBe(1);
    const backButton = getByText("Avbryt");
    fireEvent.press(backButton);
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it("ImagesGallery. When you press on image the border around image should become 7  ", () => {
    const { getAllByTestId } = render(
      <ImagesGallery navigation={navigation} route={route} />
    );
    const pressOnImage = getAllByTestId("pressOnImage");
    const image = getAllByTestId("imageInImageGallery");
    fireEvent.press(pressOnImage[0]);
    expect(image[0].props.style.borderWidth).toEqual(7);
  });
});
