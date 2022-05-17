import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

import inputStyles from "../styles/inputStyle";

import { Icon, Overlay } from "react-native-elements";

import auth from "@react-native-firebase/auth";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

const ResetPassModal = ({ isModalOpen, openModal }) => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);

  const resetPass = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail(null);
        setError(null);
        openModal(false);
        alertMessage();
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
          setError("Ange en giltig e-post");
        }
        if (errorCode === "auth/user-not-found") {
          setEmail(null);
          setError(null);
          openModal(false);
          alertMessage();
        }
      });
  };

  const alertMessage = () => {
    Alert.alert(
      "Återställ lösenord",
      "Om din e-post existerar kommer du få ett mail med en länk för att återställa ditt lösenord!"
    );
  };

  return (
    <Overlay
      isVisible={isModalOpen}
      onBackdropPress={() => {
        setEmail(null);
        setError(null);
        openModal(false);
      }}
      overlayStyle={styles.overlayStyle}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <TouchableOpacity
            testID="resetPassModal.closeBtn"
            style={styles.closeButtonStyle}
            onPress={() => {
              setEmail(null);
              setError(null);
              openModal(false);
            }}
          >
            <Icon
              name="close"
              type="material"
              size={30}
              style={styles.closeIconStyle}
            />
          </TouchableOpacity>
          <View style={styles.modalViewWrapper}>
            <Text testID="resetPassModal.forgotPass" style={styles.titleText}>
              Glömt ditt lösenord?
            </Text>
            <Text
              testID="resetPassModal.forgotPassDesc"
              style={styles.infoText}
            >
              Inga problem! Skriv in din mail nedan, så skickar vi en länk för
              att återställa lösenordet.
            </Text>
            <TextInput
              testID="resetPassModal.emailInput"
              style={[
                inputStyles.textInput,
                { marginTop: 12, marginBottom: 10 },
                error != null ? inputStyles.textInputInvalid : null,
              ]}
              placeholder="E-post"
              value={email}
              keyboardType={"email-address"}
              onChangeText={(text) => setEmail(text)}
            />
            {error != null ? (
              <View style={{ marginBottom: 4 }}>
                <Text
                  testID="resetPassModal.errorText"
                  style={{ color: colors.error }}
                >{`* ${error}`}</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              if (email === null || email === "") {
                setError("Du måste fylla i en e-post");
              } else {
                resetPass();
              }
            }}
          >
            <Text style={styles.sendBtnText}>Skicka</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};

export default ResetPassModal;

const styles = StyleSheet.create({
  overlayStyle: {
    backgroundColor: colors.light,
    width: "90%",
    borderRadius: 5,
  },
  closeButtonStyle: {
    position: "absolute",
    right: -18,
    top: -18,
  },
  closeIconStyle: {
    backgroundColor: colors.background,
    borderRadius: 25,
  },
  modalViewWrapper: {
    paddingTop: 6,
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  titleText: {
    fontFamily: typography.title.fontFamily,
    fontSize: typography.title.fontSize,
    marginBottom: 6,
  },
  infoText: {
    ...typography.b2,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    height: 55,
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: -10,
  },
  sendBtnText: {
    ...typography.button.lg,
    alignSelf: "center",
  },
});
