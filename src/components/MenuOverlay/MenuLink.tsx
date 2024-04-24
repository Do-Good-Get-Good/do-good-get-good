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
  navigationObj: NavigationObject;
  openOverlay: () => void;
};

export const MenuLink = ({ navigationObj, openOverlay }: Props) => {
  const navigation = useNavigation<{
    navigate: (
      nav: SuperAdminStack | AdminStack | UserStack,
      params: any,
    ) => void;
  }>();

  return (
    <TouchableOpacity
      testID={`menuLinkButton.${navigationObj.screenName}`}
      style={styles.menuOverlayLinkStyling}
      onPress={() => {
        openOverlay();
        navigation.navigate(navigationObj.screenName, {
          ...navigationObj?.params,
        });
        navigationObj.toDo && navigationObj.toDo();
      }}
    >
      <Text style={styles.menuOverlayLinkText}>{navigationObj.title}</Text>
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
