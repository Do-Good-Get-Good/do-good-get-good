import auth from "@react-native-firebase/auth";
import { Icon, Overlay } from "@rneui/base";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { useUserLevel } from "../../context/useUserLevel";
import { MenuFooter } from "./MenuFooter";
import { MenuLink } from "./MenuLink";
import { useMenuNavigation } from "./useMenuNavigation";

type Props = {
  openOverlay: () => void;
  isVisible: boolean;
};

export const MenuOverlay = ({ openOverlay, isVisible }: Props) => {
  const { userLevel } = useUserLevel();
  const userEmail = auth()?.currentUser?.email;
  const menuNavigation = useMenuNavigation(userLevel ?? undefined);
  function signOutFunction() {
    auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log("Enable in your firebase console.");

        console.error(error);
      });
  }
  return (
    <Overlay
      isVisible={isVisible}
      fullScreen
      animationType="fade"
      overlayStyle={{
        backgroundColor: colors.primary,
      }}
    >
      <TouchableOpacity
        testID="menuOverlay.closeButton"
        style={styles.menuOverlayCloseButton}
        onPress={openOverlay}
      >
        <Icon name="close" size={25} />
        <Text style={styles.menuOverlayCloseButtonText}>Stäng</Text>
      </TouchableOpacity>
      <View style={styles.menuOverlay}>
        <View style={styles.menuOverlayItemStyling}>
          {menuNavigation?.map((item, i) => (
            <MenuLink
              key={item.screenName + i}
              openOverlay={openOverlay}
              navigationObj={item}
            />
          ))}
        </View>

        <MenuFooter
          userEmail={userEmail ?? ""}
          signOutFunction={signOutFunction}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    paddingHorizontal: 40,
    ...Platform.select({
      ios: {
        paddingTop: 50,
      },
    }),
  },
  menuOverlayCloseButton: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
    ...Platform.select({
      ios: {
        top: 60,
        right: 4,
        zIndex: 1,
      },
      android: {
        top: 2,
        right: 4,
      },
    }),
  },
  menuOverlayCloseButtonText: {
    textTransform: "uppercase",
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
    marginTop: -3,
  },
  menuOverlayItemStyling: {
    flex: 1,
    marginTop: 40,
  },
});
