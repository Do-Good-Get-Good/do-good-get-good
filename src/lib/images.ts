import { ImageSourcePropType } from "react-native/Libraries/Image/Image";
import { Format } from "./enums/imageFormat";

export const placeholderImage = require("../assets/images/placeholder.png");

type Activity = {
  id: string;
  title: any;
  city: any;
  place: any;
  description: any;
  photo: any;
  popular: any;
  imageUrl?: string;
};

export function setTheRightPhoto(
  activity: Activity,
): ImageSourcePropType | undefined {
  if (!activity?.imageUrl) {
    let images = Images.filter((image) => image.format === Format.wide);
    let found = images.find((image) => image.name === activity?.photo);

    if (!found) return placeholderImage;

    return found.image;
  }

  return { uri: activity.imageUrl };
}

const Images = [
  {
    key: "1",
    image: require("../assets/images/activities/square/blodgivning_400x400.png"),
    name: "blodgivning",
    selected: false,
    format: Format.square,
  },
  {
    key: "2",
    image: require("../assets/images/activities/square/djurambulans_400x400.png"),
    name: "djurambulans",
    selected: false,
    format: Format.square,
  },
  {
    key: "3",
    image: require("../assets/images/activities/square/fotbollstranare_400x400.png"),
    name: "fotbollstranare",
    selected: false,
    format: Format.square,
  },

  {
    key: "4",
    image: require("../assets/images/activities/square/friluftsliv-kajak_400x400.png"),
    name: "friluftsliv-kajak",
    selected: false,
    format: Format.square,
  },
  {
    key: "5",
    image: require("../assets/images/activities/square/friluftsliv-unga_400x400.png"),
    name: "friluftsliv-unga",
    selected: false,
    format: Format.square,
  },
  {
    key: "6",
    image: require("../assets/images/activities/square/frisor_400x400.png"),
    name: "frisor",
    selected: false,
    format: Format.square,
  },
  {
    key: "7",
    image: require("../assets/images/activities/square/internationellt_400x400.png"),
    name: "internationellt",
    selected: false,
    format: Format.square,
  },

  {
    key: "8",
    image: require("../assets/images/activities/square/rasta_hund_400x400.png"),
    name: "rasta_hund",
    selected: false,
    format: Format.square,
  },
  {
    key: "9",
    image: require("../assets/images/activities/square/soppkok_400x400.png"),
    name: "soppkok",
    selected: false,
    format: Format.square,
  },
  {
    key: "10",
    image: require("../assets/images/activities/wide/blodgivning_700x400.png"),
    name: "blodgivning",
    selected: false,
    format: Format.wide,
  },
  {
    key: "11",
    image: require("../assets/images/activities/wide/djurambulans_700x400.png"),
    name: "djurambulans",
    selected: false,
    format: Format.wide,
  },
  {
    key: "12",
    image: require("../assets/images/activities/wide/fotbollstranare_700x400.png"),
    name: "fotbollstranare",
    selected: false,
    format: Format.wide,
  },

  {
    key: "13",
    image: require("../assets/images/activities/wide/friluftsliv-kajak_700x400.png"),
    name: "friluftsliv-kajak",
    selected: false,
    format: Format.wide,
  },
  {
    key: "14",
    image: require("../assets/images/activities/wide/friluftsliv-unga_700x400.png"),
    name: "friluftsliv-unga",
    selected: false,
    format: Format.wide,
  },
  {
    key: "15",
    image: require("../assets/images/activities/wide/frisor_700x400.png"),
    name: "frisor",
    selected: false,
    format: Format.wide,
  },
  {
    key: "16",
    image: require("../assets/images/activities/wide/internationellt_700x400.png"),
    name: "internationellt",
    selected: false,
    format: Format.wide,
  },

  {
    key: "17",
    image: require("../assets/images/activities/wide/rasta_hund_700x400.png"),
    name: "rasta_hund",
    selected: false,
    format: Format.wide,
  },
  {
    key: "18",
    image: require("../assets/images/activities/wide/soppkok_700x400.png"),
    name: "soppkok",
    selected: false,
    format: Format.wide,
  },
];

export default Images;
