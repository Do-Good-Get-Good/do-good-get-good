import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ImagesGallery from "../screens/ImagesGallery";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../components/Menu", () => () => {
  return <mockMenu />;
});

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const imageName = jest.fn();

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

  it("ImagesGallery. Button 'Save' exist and navigate back  ", () => {
    const { getAllByText, getByTestId } = render(
      <ImagesGallery navigation={navigation} />
    );
    expect(getAllByText("Spara").length).toBe(1);
    const saveButton = getByTestId("saveButton");
    fireEvent.press(saveButton);
    expect(navigation.navigate).toHaveBeenCalledWith("CreateActivity", {
      imageForActivity: "symbol_hands_heart-DEFAULT",
    });
  });

  it("ImagesGallery. Button 'Back' exist and navigate back  ", () => {
    const { getAllByText, getByTestId } = render(
      <ImagesGallery navigation={navigation} />
    );
    expect(getAllByText("Avbryt").length).toBe(1);
    const backButton = getByTestId("backButton");
    fireEvent.press(backButton);
    expect(navigation.goBack).toHaveBeenCalled();
  });
  it("ImagesGallery. When you press on image the border around image should become 7  ", () => {
    const { getAllByTestId } = render(
      <ImagesGallery navigation={navigation} />
    );
    const image = getAllByTestId("pressOnImage");
    // expect(image.props.style.borderWidth).toEqual(7);
  });
});
