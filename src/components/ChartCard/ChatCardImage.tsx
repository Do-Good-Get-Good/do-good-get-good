import React from "react";
import { Image, Dimensions, ImageStyle } from "react-native";
import { UserPost } from "../../utility/types";

type Props = {
  size?: number;
  imageUrl: UserPost["imageURL"];
};
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export const ChatCardImage = ({ imageUrl, size = 2.3 }: Props) => {
  const imageStyle: ImageStyle = {
    minWidth: screenWidth / size,
    minHeight: screenHeight / size,
    resizeMode: "contain",
  };

  return (
    <Image
      testID="chat-card-image"
      source={{ uri: imageUrl }}
      style={imageStyle}
    />
  );
};
