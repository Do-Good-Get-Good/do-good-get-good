import { StyleSheet, Text, TouchableOpacity } from "react-native";
import typography from "../../assets/theme/typography";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationObject } from "./useMenuNavigation";
import {
  AdminStack,
  SuperAdminStack,
  UserStack,
} from "../../utility/routeEnums";

type Props = {
  navigatationObj: NavigationObject;
  openOverlay: () => void;
};

export const MenuLink = ({ navigatationObj, openOverlay }: Props) => {
  const navigation = useNavigation<{
    navigate: (nav: SuperAdminStack | AdminStack | UserStack) => void;
  }>();

  return (
    <TouchableOpacity
      testID={`menuLinkButton.${navigatationObj.screenName}`}
      style={styles.menuOverlayLinkStyling}
      onPress={() => {
        openOverlay();
        navigation.navigate(navigatationObj.screenName);
        navigatationObj.toDo && navigatationObj.toDo();
      }}
    >
      <Text style={styles.menuOverlayLinkText}>{navigatationObj.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuOverlayLinkStyling: {
    marginBottom: 0,
    marginVertical: 4,
  },
  menuOverlayLinkText: {
    fontFamily: typography.title.fontFamily,
    fontSize: typography.title.fontSize,
    paddingVertical: 4,
  },
});
