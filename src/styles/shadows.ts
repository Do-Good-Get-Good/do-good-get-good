import { Platform, StyleSheet } from "react-native";

import {
  ViewStyle
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export const shadows =  StyleSheet.create({   
cardShadow: {

  ...Platform.select({
    ios: {
      shadowOffset: {
        height: 2,
        width: 0
      },
      shadowOpacity: 0.3,
      shadowRadius: 1,
    },
    android: {
      elevation: 2,
    },
  }),

}
   });
