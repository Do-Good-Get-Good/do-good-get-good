import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowUpDown } from "../../assets/icons/ArrowUpDown";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";

type Props = {
  mainTitle: string;
};

export const DropDown = ({ mainTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.containerForTextAndIcon}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.userAndAdminNames}>{mainTitle}</Text>

        <ArrowUpDown onPress={() => setIsOpen(!isOpen)} expanded={isOpen} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  containerForTextAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...typography.b1,
    paddingVertical: 14,
  },
  userAndAdminNames: {
    ...typography.b2,
  },
});
