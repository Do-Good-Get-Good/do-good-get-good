import { StatusBar } from "expo-status-bar";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import inputStyles from "../styles/inputStyle";
import auth from "@react-native-firebase/auth";
import ResetPassModal from "./ResetPassModal";
import { Icon } from "react-native-elements";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [randomText, setRandomText] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPassValid, setPassValid] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
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
      motivationTexts[Math.floor(Math.random() * motivationTexts.length)]
    );
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../img/blueprint-white.png")}
      resizeMode={"cover"}
      style={{
        flex: 1,
        backgroundColor: "#00000009",
      }}
      imageStyle={{ opacity: 1 }}
    >
      <SafeAreaView style={tw`flex-1`}>
        <StatusBar style="auto" />
        <ResetPassModal isModalOpen={showModal} openModal={isOpen} />
        <View style={styles.logo}>
          <Image
            testID="login.dgggLogo"
            source={require("../img/Logotyp_DGGG.png")}
            style={styles.logoImg}
          />
        </View>
        <View style={styles.inputsAndBtns}>
          <Text
            testID="login.motivationalText"
            style={[
              tw`text-center text-xl mb-8 font-bold`,
              { color: "#333333" },
            ]}
          >
            {randomText}
          </Text>
          <View style={tw`flex-row mb-3`}>
            <TextInput
              textContentType={"emailAddress"}
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType={"email-address"}
              placeholder={"E-post"}
              returnKeyType="next"
              onSubmitEditing={() => ref_input2.current.focus()}
              blurOnSubmit={false}
              style={[
                inputStyles.textInput,
                error != null && !isEmailValid
                  ? inputStyles.textInputInvalid
                  : null,
                !isEmailValid ? inputStyles.textInputInvalid : null,
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
              textContentType={"password"}
              onChangeText={(text) => setPass(text)}
              value={pass}
              placeholder={"Lösenord"}
              secureTextEntry={showPassword ? false : true}
              returnKeyType="send"
              onSubmitEditing={() => checkInputsAndSignIn()}
              ref={ref_input2}
              style={[
                inputStyles.textInput,
                !isPassValid ? inputStyles.textInputInvalid : null,
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
          <View
            style={tw.style({
              hidden: error === null,
              "mb-0 pl-2": error != null,
            })}
          >
            <Text style={{ color: "#C62F25" }}>* {error}</Text>
          </View>
          <View style={tw`mt-2`}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                checkInputsAndSignIn();
              }}
            >
              <Text
                style={[
                  tw`text-center text-xl font-bold`,
                  { color: "#333333" },
                ]}
              >
                Logga in
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`mt-3 w-full flex-row justify-center`}>
            <Text style={{ color: "#333333" }}>Glömt ditt lösenord?</Text>
            <TouchableOpacity
              style={tw`ml-1`}
              onPress={() => {
                console.log("Tryckte på 'glömt lösenord'");
                isOpen(true);
              }}
            >
              <Text
                style={{
                  color: "#84BD00",
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                }}
              >
                Tryck här
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
        <Image
          source={require("../img/Technogarden-logotyp-Large.png")}
          style={
            keyboardStatus === "Keyboard Shown"
              ? tw`hidden`
              : styles.bottomLogoImg
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImg: {
    width: 200,
    height: 100,
  },
  inputsAndBtns: {
    padding: 20,
    flex: 1,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  loginBtn: {
    backgroundColor: "#84BD00",
    height: 55,
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
  bottomLogoImg: {
    width: 143,
    height: 23,
    alignSelf: "center",
    marginBottom: 10,
  },
});
