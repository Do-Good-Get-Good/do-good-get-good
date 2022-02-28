import { StyleSheet, Image, View } from "react-native";
import React from "react";

const BottomLogo = () => {
  return (
    <View style={styles.bottomLogoView}>
      <Image
        testID="login.bottomLogo"
        source={require("../img/Technogarden-logotyp-Large.png")}
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
  },
  bottomLogoImg: {
    width: 143,
    height: 23,
  },
});
