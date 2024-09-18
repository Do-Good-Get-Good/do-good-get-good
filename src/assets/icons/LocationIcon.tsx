import { Icon } from "@rneui/base";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import colors from "../theme/colors";

type Props = {
  size?: number;
  style?: ViewStyle | TextStyle | undefined;
};

export const LocationIcon = ({ size = 25, style }: Props) => {
  return (
    <Icon
      type="material-community"
      name="map-marker-outline"
      size={size}
      color={colors.dark}
      style={style}
    />
  );
};
