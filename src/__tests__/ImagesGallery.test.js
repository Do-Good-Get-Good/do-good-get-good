import "react-native";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import ImagesGallery from "../screens/ImagesGallery";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../components/Menu", () => () => {
  return <mockMenu />;
});

describe("Testing ImagesGallery", () => {
  it("ImagesGallery exist ", () => {
    const { getAllByText } = render(<ImagesGallery />);
    expect(getAllByText("Bildgalleri").length).toBe(1);
  });

  it("ImagesGallery. Images exist ", () => {
    const { getAllByTestId } = render(<ImagesGallery />);
    const image = getAllByTestId("imageInImageGallery");
    expect(image[0].props.source).toEqual({
      testUri: "../../../img/activities_images/symbol_hands_heart-DEFAULT.png",
    });
  });

  //   it("ImagesGallery. When press on image ", () => {
  //     const { getAllByTestId } = render(<ImagesGallery />);
  //     const pressOnImage = getAllByTestId("pressOnImage");
  //     fireEvent.press(pressOnImage);
  //   });
});
