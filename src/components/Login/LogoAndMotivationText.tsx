import { Image, StyleSheet, Text, View } from "react-native";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";

const motivationTexts = [
  "Du är riktigt grym!",
  "Bra jobbat!",
  "Detta förtjänar du!",
  "Wohoo, du är tillbaka!",
];

const setRandomText = () =>
  motivationTexts[Math.floor(Math.random() * motivationTexts.length)];

export const LogoAndMotivationText = () => {
  return (
    <View style={styles.logo}>
      <Image
        testID="login.dgggLogo"
        source={require("../../assets/images/Logotyp_DGGG.png")}
        style={styles.logoImg}
      />
      <Text testID="login.motivationalText" style={styles.motivationTexts}>
        {setRandomText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logoImg: {
    height: "40%",
    aspectRatio: 2,
  },
  motivationTexts: {
    ...typography.title,
    color: colors.dark,
    alignSelf: "center",
    fontWeight: "500",
    marginTop: 15,
  },
});
