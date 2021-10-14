import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import inputStyles from "../styles/inputStyle";
import { Icon, Overlay } from "react-native-elements";
import auth from "@react-native-firebase/auth";

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
      onBackdropPress={openModal}
      overlayStyle={{
        backgroundColor: "#F5F5F5",
        width: "90%",
        borderRadius: 5,
      }}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={{ position: "absolute", right: -18, top: -18 }}
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
              style={tw`bg-white rounded-full`}
            />
          </TouchableOpacity>
          <View style={tw`mt-0`}>
            <Text style={tw`text-lg font-bold`}>Glömt ditt lösenord?</Text>
            <Text>
              Inga problem! Skriv in din mail nedan, så skickar vi en länk för
              att återställa lösenordet.
            </Text>
            <TextInput
              style={[
                inputStyles.textInput,
                tw`mt-5 mb-2`,
                error != null ? inputStyles.textInputInvalid : null,
              ]}
              placeholder="E-post"
              value={email}
              keyboardType={"email-address"}
              onChangeText={(text) => setEmail(text)}
            />
            <View
              style={tw.style({
                hidden: error === null,
                "mb-2 pl-2": error != null,
              })}
            >
              <Text style={{ color: "#C62F25" }}>* {error}</Text>
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
              <Text style={tw`text-center text-lg`}>Skicka</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Overlay>
  );
};

export default ResetPassModal;

const styles = StyleSheet.create({
  // modalContainer: {
  //   marginVertical: 10,
  // },
  sendBtn: {
    backgroundColor: "#84BD00",
    height: 55,
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: -10,
  },
});
