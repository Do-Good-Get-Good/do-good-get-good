import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Icon, Tooltip } from "react-native-elements";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

const InfoModal = ({ screen, tooltipWidth }) => {
  const [infoText, setInfoText] = useState(null);

  useEffect(() => {
    switch (screen) {
      case "homepage":
        setInfoText(
          "Du får betalt för halva dina utförda timmar och du kan max få betalt för 8 timmar per år"
        );
        break;
      case "imageGallery":
        setInfoText(
          "Välj en bild som bäst representerar aktiviteten som den ska tillhöra."
        );
        break;
    }
  }, [screen]);

  return (
    <Tooltip
      popover={
        <Text testID="InfoModal.infoText" style={styles.infoText}>
          {infoText}
        </Text>
      }
      skipAndroidStatusBar
      height="auto"
      width={tooltipWidth}
      withOverlay={false}
      withPointer={false}
      containerStyle={styles.overlay}
    >
      <View testID="InfoModal.viewAroundIcon">
        <Icon type="material" name="info-outline" size={20} />
      </View>
    </Tooltip>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  overlay: {
    padding: 8,
    backgroundColor: colors.background,
    borderColor: colors.dark,
    borderWidth: 0.7,
    borderRadius: 5,
    elevation: 20,
    shadowColor: colors.dark,
  },
  infoText: {
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
  },
});
