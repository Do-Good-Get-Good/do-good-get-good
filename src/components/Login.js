import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import { Icon } from "@rneui/base";

import { SafeAreaView } from "react-native-safe-area-context";

import Config from "react-native-config";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

import inputStyles from "../styles/inputStyle";
import ResetPassModal from "./ResetPassModal";
import BottomLogo from "./BottomLogo";
import DevRelease from "./DevRelease";

import auth from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [randomText, setRandomText] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPassValid, setPassValid] = useState(true);
  const ref_input2 = useRef();

  const motivationTexts = [
    "Du är riktigt grym!",
    "Bra jobbat!",
    "Detta förtjänar du!",
    "Wohoo, du är tillbaka!",
  ];

  //Authorize user and sign in
  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("Den e-post adressen används redan");
        }
        if (error.code === "auth/user-not-found") {
          setError("Fel e-post eller lösenord");
          checkValidity(false, false);
        }
        if (error.code === "auth/wrong-password") {
          setError("Fel e-post eller lösenord");
          checkValidity(false, false);
        }
        if (error.code === "auth/invalid-email") {
          setError("Ange en giltig e-post");
          checkValidity(false, true);
        }
        crashlytics().recordError(error);
        crashlytics().setAttributes({ email });
        console.error(error);
      });
  };

  const isOpen = (value) => {
    setShowModal(value);
  };

  const checkValidity = (emailValid, passValid) => {
    setEmailValid(emailValid);
    setPassValid(passValid);
  };

  const checkInputsAndSignIn = () => {
    if ((email === null && pass === null) || (email === "" && pass === "")) {
      setError("Du måste fylla i e-post och lösenord");
      checkValidity(false, false);
    } else if (
      (email != null && pass === null) ||
      (email != "" && pass === "")
    ) {
      setError("Du måste fylla i ett lösenord");
      checkValidity(true, false);
    } else if (
      (email === null && pass != null) ||
      (email === "" && pass != "")
    ) {
      setError("Du måste fylla i en e-post");
      checkValidity(false, true);
    } else {
      signIn();
    }
  };

  //Randomizes a motivational text once every app launch/login screen reload
  useEffect(() => {
    setRandomText(
      motivationTexts[Math.floor(Math.random() * motivationTexts.length)],
    );
  }, []);

  return (
    <ImageBackground
      testID="login.backgroundImage"
      source={require("../assets/images/blueprint-white.png")}
      resizeMode={"cover"}
      style={{
        backgroundColor: "#00000009",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      <SafeAreaView style={styles.wrapper}>
        {Config.NODE_ENV === "dev" && <DevRelease />}
        <ResetPassModal isModalOpen={showModal} openModal={isOpen} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.logo}>
              <Image
                testID="login.dgggLogo"
                source={require("../assets/images/Logotyp_DGGG.png")}
                style={styles.logoImg}
              />
              <Text
                testID="login.motivationalText"
                style={styles.motivationTexts}
              >
                {randomText}
              </Text>
            </View>

            <View style={styles.loginFormView}>
              <View style={styles.inputView}>
                <TextInput
                 testID="input-email"
                  textContentType={"emailAddress"}
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text.trim())}
                  value={email}
                  keyboardType={"email-address"}
                  placeholder={"E-post"}
                  returnKeyType="next"
                  onSubmitEditing={() => ref_input2.current.focus()}
                  blurOnSubmit={false}
                  style={[
                    inputStyles.textInput,
                    error != null && inputStyles.textInputInvalid,
                    !isEmailValid && inputStyles.textInputInvalid,
                    { fontFamily: typography.b1.fontFamily },
                  ]}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <TextInput
                 testID="input-password"
                  textContentType={"password"}
                  onChangeText={(text) => setPass(text.trim())}
                  value={pass}
                  placeholder={"Lösenord"}
                  secureTextEntry={showPassword ? false : true}
                  returnKeyType="send"
                  onSubmitEditing={() => checkInputsAndSignIn()}
                  ref={ref_input2}
                  style={[
                    inputStyles.textInput,
                    error != null && inputStyles.textInputInvalid,
                    !isPassValid && inputStyles.textInputInvalid,
                    { paddingRight: 44, fontFamily: typography.b1.fontFamily },
                  ]}
                />
                <View style={styles.showPasswordIcon}>
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
                    type="material"
                    size={25}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                </View>
              </View>
              {error != null ? (
                <View>
                  <Text
                    style={{
                      color: colors.error,
                      ...typography.b2,
                      marginBottom: 10,
                    }}
                  >
                    * {error}
                  </Text>
                </View>
              ) : null}
              <View>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => {
                    checkInputsAndSignIn();
                  }}
                >
                  <Text
                    style={{
                      ...typography.button.lg,
                      color: colors.dark,
                      fontWeight: "500",
                    }}
                  >
                    Logga in
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.passReset}>
                <Text
                  style={{
                    color: "#333333",
                    marginRight: 4,
                    ...typography.b2,
                  }}
                >
                  Glömt ditt lösenord?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    isOpen(true);
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      textDecorationLine: "underline",
                      ...typography.b2,
                      fontWeight: "700",
                    }}
                  >
                    Tryck här
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <BottomLogo />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 20,
  },
  logo: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
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
  loginFormView: {
    paddingHorizontal: 18,
    flex: 1,
  },
  inputView: {
    marginBottom: 10,
    alignItems: "center",
  },
  showPasswordIcon: {
    justifyContent: "center",
    right: 36,
    elevation: 2,
  },
  loginBtn: {
    backgroundColor: "#84BD00",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  passReset: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
