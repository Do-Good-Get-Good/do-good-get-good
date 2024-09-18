import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import * as yup from "yup";
import { LogoAndMotivationText } from "./LogoAndMotivationText";

import { useState } from "react";
import { StyleSheet } from "react-native";
import Config from "react-native-config";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import BottomLogo from "../BottomLogo";
import { LongButton } from "../Buttons/LongButton";
import DevRelease from "../DevRelease";
import ResetPassModal from "../ResetPassModal";
import { EmailAndPasswordInput } from "./EmailAndPasswordInput";
import { ForgotPasswordTextAndButton } from "./ForgotPasswordTextAndButton";
import { useSignIn } from "./useSignIn";

export type LoginInput = {
  email: string;
  password: string;
};

const schema: yup.ObjectSchema<LoginInput> = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email("* Ange en giltig e-mail")
      .required("Du måste fylla i e-post och lösenord"),

    password: yup.string().trim().required("* Du måste fylla i ett lösenord"),
  })
  .defined();

export const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const { authError, onSignIn } = useSignIn();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onLoginPress = ({ email, password }: LoginInput) =>
    onSignIn(email, password);

  return (
    <ImageBackground
      testID="login.backgroundImage"
      source={require("../../assets/images/blueprint-white.png")}
      resizeMode={"cover"}
      style={styles.container}
    >
      <SafeAreaView style={styles.wrapper}>
        {Config.NODE_ENV === "dev" && <DevRelease />}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ResetPassModal isModalOpen={showModal} openModal={setShowModal} />
            <LogoAndMotivationText />
            <EmailAndPasswordInput control={control} errors={errors} />
            <LongButton onPress={handleSubmit(onLoginPress)} title="Logga in" />
            <ForgotPasswordTextAndButton
              onPress={() => setShowModal(!showModal)}
            />
            {authError && (
              <Text style={styles.authErrorText}>* {authError}</Text>
            )}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <BottomLogo style={{ flex: 0.2 }} />
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#00000009",
    paddingHorizontal: 16,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  authErrorText: {
    color: colors.error,
    ...typography.b2,
    marginBottom: 10,
  },
});
