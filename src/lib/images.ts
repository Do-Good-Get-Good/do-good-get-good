import { ImageSourcePropType } from "react-native/Libraries/Image/Image";

export const placeholderImage = require("../assets/images/placeholder.png");

export function setTheRightPhoto(
  photo: string,
  imageUrl?: string,
): ImageSourcePropType | undefined {
  if (!imageUrl) {
    let found = Images.find((image) => image.name === photo);

    if (!found) return placeholderImage;

    return found.image;
  }

  return { uri: imageUrl };
}

const Images = [
  {
    key: "1",
    image: require("../assets/images/activities/symbol_hands_heart-DEFAULT.png"),
    name: "symbol_hands_heart-DEFAULT",
    selected: true,
  },
  {
    key: "2",
    image: require("../assets/images/activities/symbol_blood.png"),
    name: "symbol_blood",
    selected: false,
  },
  {
    key: "3",
    image: require("../assets/images/activities/symbol_earth.png"),
    name: "symbol_earth",
    selected: false,
  },
  {
    key: "4",
    image: require("../assets/images/activities/symbol_hund.png"),
    name: "symbol_hund",
    selected: false,
  },
  {
    key: "5",
    image: require("../assets/images/activities/symbol_sport.png"),
    name: "symbol_sport",
    selected: false,
  },
];

export default Images;
