import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "react-native";
import InfoModal from "../../components/InfoModal";

const homepageInfoText =
  "Du får betalt för halva dina utförda timmar och du kan max få betalt för 8 timmar per år";
const imageGalleryInfoText =
  "Välj en bild som bäst representerar aktiviteten som den ska tillhöra.";

describe("Testing InfoModal", () => {
  it("Renders homepage tooltip info correctly", async () => {
    const { getByTestId } = render(
      <InfoModal screen="homepage" tooltipWidth={250} />
    );

    const icon = getByTestId("InfoModal.viewAroundIcon");
    fireEvent.press(icon);

    const infoText = getByTestId("InfoModal.infoText");
    expect(infoText.props.children).toEqual(homepageInfoText);
  });
  it("Renders image gallery tooltip info correctly", async () => {
    const { getByTestId } = render(
      <InfoModal screen="imageGallery" tooltipWidth={200} />
    );

    const icon = getByTestId("InfoModal.viewAroundIcon");
    fireEvent.press(icon);

    const infoText = getByTestId("InfoModal.infoText");
    expect(infoText.props.children).toEqual(imageGalleryInfoText);
  });
});
