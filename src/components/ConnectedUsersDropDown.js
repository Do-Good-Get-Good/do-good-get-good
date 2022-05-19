import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export function ConnectedUsersDropDown({ usersConnectedToTheAdmin }) {
  console.log("usersConnectedToTheAdmin   ", usersConnectedToTheAdmin);
  const [openDropDown, setOpenDropDown] = useState(false);

  const clickOnPencilIcon = () => {
    console.log("Pencil");
  };

  const whatTextToShow = (text) => {
    let icon = "";
    if (openDropDown) {
      icon = "arrow-drop-up";
    }
    {
      icon = "arrow-drop-down";
    }
    return (
      <View style={styles.container}>
        <View style={styles.containerForTextAndIcon}>
          <Text style={styles.userAndAdminNames}>{text}</Text>
          <TouchableOpacity onPress={() => setOpenDropDown(!openDropDown)}>
            <Icon color={colors.secondary} name={icon} size={25} />
          </TouchableOpacity>
        </View>
        {openDropDown && (
          <View style={styles.containerAdminName}>
            <Text style={styles.adminText}>Admin:</Text>
            <View style={[styles.containerAdminName, styles.adminNameAndIcon]}>
              <Text style={styles.userAndAdminNames}>{text}</Text>
              <TouchableOpacity onPress={() => clickOnPencilIcon()}>
                <Icon
                  color={colors.secondary}
                  type="material-community"
                  name="pencil-outline"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return <View>{whatTextToShow("Sven Swensson")}</View>;
}
export default ConnectedUsersDropDown;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    marginTop: 10,
    borderRadius: 3,
  },
  containerForTextAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...typography.b1,
    paddingVertical: 14,
  },
  adminText: {
    fontWeight: "500",
    ...typography.b1,
  },
  containerAdminName: {
    flexDirection: "row",
    marginBottom: 7,
  },
  userAndAdminNames: {
    ...typography.b1,
  },
  adminNameAndIcon: {
    paddingLeft: 10,
    justifyContent: "space-between",
    flex: 1,
  },
});
