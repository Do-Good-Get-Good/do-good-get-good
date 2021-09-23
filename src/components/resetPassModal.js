import React from "react";
import {
  StyleSheet,
  Text,
  Modal,
  View,
  Pressable,
  TextInput,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import inputStyles from "../styles/inputStyle";
import { Icon } from "react-native-elements";
import auth from "@react-native-firebase/auth";

const resetPassModal = ({ isModalOpen, openModal }) => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);

  const resetPass = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail(null);
        setError(null);
        openModal(false);
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
        }
      });
  };

  return (
    <Modal visible={isModalOpen} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Pressable
            style={[tw`absolute`, { right: -8, top: -8 }]}
            onPress={() => {
              setEmail(null);
              setError(null);
              openModal(false);
            }}
          >
            <Icon
              name="close"
              type="material"
              style={[tw`bg-white rounded-full`, { padding: 2 }]}
            />
          </Pressable>
          <View style={tw`mt-10`}>
            <Text style={tw`text-lg font-bold`}>Glömt ditt lösenord?</Text>
            <Text>
              Inga problem! Skriv in din mail nedan, så skickar vi en länk för
              att återställa lösenordet.
            </Text>
            {/* <View style={tw`mt-4`}>
              <Text style={{color: '#84BD00'}}>Om din e-post existerar kommer du få ett mail med ett nytt lösenord!</Text>
            </View> */}
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
            <Pressable
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
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default resetPassModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040",
  },
  modal: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  sendBtn: {
    backgroundColor: "#84BD00",
    height: 55,
    justifyContent: "center",
    borderRadius: 5,
  },
});
