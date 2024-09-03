import { Platform, StyleSheet } from "react-native";

type Props = {
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
  shadowOffsetHeight?: number;
};

export const shadow = ({
  shadowOpacity = 0.3,
  shadowRadius = 1,
  elevation = 1,
  shadowOffsetHeight = 0.8,
}: Props) => ({
  ...Platform.select({
    ios: {
      shadowOffset: {
        height: shadowOffsetHeight,
      },
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
    },
    android: {
      elevation: elevation,
    },
  }),
});

export const shadows = StyleSheet.create({
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
          width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
