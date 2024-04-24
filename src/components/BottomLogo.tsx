import {
  StyleSheet,
  Image,
  View,
  StyleProp,
  FlexStyle,
  TextStyle,
} from "react-native";
import React from "react";

type Props = {
  style?: StyleProp<FlexStyle | TextStyle>;
};

const BottomLogo = ({ style }: Props) => {
  return (
    <View style={[styles.bottomLogoView, style]}>
      <Image
        testID="login.bottomLogo"
        source={require("../assets/images/Technogarden-logotyp-Large.png")}
        style={styles.bottomLogoImg}
      />
    </View>
  );
};

export default BottomLogo;

const styles = StyleSheet.create({
  bottomLogoView: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomLogoImg: {
    width: 143,
    height: 23,
  },
});
