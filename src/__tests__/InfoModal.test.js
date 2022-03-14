import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

import InfoModal from "../components/InfoModal";

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

const homepageInfoText =
  "Du får betalt för halva dina utförda timmar och du kan max få beltalt för 10 timmar";
const imageGalleryInfoText =
  "Välj en bild som bäst representerar aktiviteten som den ska tillhöra.";

describe("Testing InfoModal", () => {
  it("Renders homepage tooltip info correctly", async () => {
    const { getByTestId } = render(
      <InfoModal screen="homepage" tooltipWidth={250} />
    );

    const infoText = getByTestId("InfoModal.infoText");
    expect(infoText.props.children).toEqual(homepageInfoText);
  });
  it("Renders image gallery tooltip info correctly", async () => {
    const { getByTestId } = render(
      <InfoModal screen="imageGallery" tooltipWidth={200} />
    );

    const infoText = getByTestId("InfoModal.infoText");
    expect(infoText.props.children).toEqual(imageGalleryInfoText);
  });
});
