import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { Overlay, Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { LongButton } from "./Buttons/LongButton";

const privacyPolicyKey = "@Is_Approved_Privacy_Policy_Key";

const getData = async (onContinue: (c: boolean) => void) => {
  try {
    const jsonValue = await AsyncStorage.getItem(privacyPolicyKey);
    return jsonValue === "true" ? onContinue(true) : onContinue(false);
  } catch (e) {
    onContinue(false);
    console.log(e);
  }
};

const storeData = async (
  isApproved: boolean,
  onContinue: (c: boolean) => void
) => {
  try {
    const jsonValue = JSON.stringify(isApproved);
    await AsyncStorage.setItem(privacyPolicyKey, jsonValue);
    onContinue(isApproved);
  } catch (e) {
    console.log(e);
  }
};

const openLink = () => {
  Linking.openURL("https://www.technogarden.se/integritetspolicy/").catch(
    (err) => console.error("Failed to open URL:", err)
  );
};

export const Disclaimer = () => {
  const [isContinue, setIsContinue] = useState(true);
  const signOut = () => auth().signOut();

  const onPressYes = async () => {
    await storeData(true, setIsContinue);
  };

  const onPressNo = async () => {
    await storeData(false, setIsContinue);
    return signOut();
  };
  useEffect(() => {
    getData(setIsContinue);
  }, []);

  return (
    <Overlay
      testID="disclaimer-overlay"
      isVisible={!isContinue}
      animationType="fade"
      overlayStyle={{
        backgroundColor: "transparent",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.disclaimerText}>
          Genom att fortsätta använda appen godkänner du vår insamling och
          behandling av dina personuppgifter enligt vår{" "}
          {
            <Text style={styles.linkText} onPress={openLink}>
              Integritetspolicy
            </Text>
          }
          . Du kan när som helst återkalla ditt samtycke genom att kontakta oss
          på{" "}
          {
            <Text style={styles.emailText} onPress={openLink}>
              privacy@technogarden.se
            </Text>
          }
          .
        </Text>
        <LongButton onPress={onPressYes} title="Fortsätt" />
        <LongButton style={styles.button} onPress={onPressNo} title="Avbryt" />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 10,
    borderColor: colors.light,
  },
  disclaimerText: {
    ...typography.b2,
    marginBottom: 20,
  },
  linkText: {
    fontWeight: "500",
    color: colors.primary,
    textDecorationLine: "underline",
    textDecorationColor: colors.primary,
  },
  emailText: {
    fontWeight: "600",
    fontFamily: "Roboto Light",
  },
  button: {
    backgroundColor: colors.light,
    borderWidth: 0.5,
    borderColor: colors.primary,
    marginVertical: 10,
  },
});
