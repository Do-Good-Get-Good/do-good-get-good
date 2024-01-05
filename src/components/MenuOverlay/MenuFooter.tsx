import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import typography from "../../assets/theme/typography";
import { User } from "../../utilily/types";

type Props = {
  userEmail: User["email"] | undefined;
  signOutFunction: () => void;
};

export const MenuFooter = ({ userEmail, signOutFunction }: Props) => {
  return (
    <View style={styles.menuOverlayFooter}>
      <View style={styles.menuOverlayLoggedInAccount}>
        <Text style={{ ...typography.b2 }}>Inloggad som: </Text>
        <Text style={{ textDecorationLine: "underline", ...typography.b2 }}>
          {userEmail}
        </Text>
      </View>
      <TouchableOpacity
        testID="menuOverlay.logoutButton"
        style={styles.menuOverlayLogOutButton}
        onPress={() => signOutFunction()}
      >
        <Text style={styles.menuOverlayLogOutButtonText}>Logga ut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOverlayFooter: {
    marginBottom: 25,
  },
  menuOverlayLogOutButtonText: {
    ...typography.b1,
  },
  menuOverlayLoggedInAccount: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  menuOverlayLogOutButton: {
    width: 100,
    marginTop: 10,
    paddingVertical: 5,
  },
});
