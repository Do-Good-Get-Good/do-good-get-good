import { Control, FieldError, FieldErrors } from "react-hook-form";
import { InputFieldWithController } from "../InputFieldWithController";
import { LoginInput } from "./Login";
import { useState } from "react";
import { VisibilityIcon } from "../../assets/icons/VisibilityIcon";
import { View } from "react-native";

type Props = {
  control: Control<LoginInput, any>;
  errors?: FieldErrors<LoginInput>;
};

export const EmailAndPasswordInput = ({ control, errors }: Props) => {
  const [onVisible, setOnVisible] = useState(false);

  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <InputFieldWithController
        placeholderText={"E-post"}
        control={control}
        error={errors?.email}
        name={"email"}
        autoCapitalize={"none"}
        keyboardType={"email-address"}
        testID={"email"}
        toTrim={true}
      />
      <InputFieldWithController
        placeholderText={"Lösenord"}
        control={control}
        error={errors?.password}
        name={"password"}
        autoCapitalize={"none"}
        secureTextEntry={!onVisible}
        testID={"password"}
        toTrim={true}
        IconRight={
          <VisibilityIcon
            onPress={() => setOnVisible(!onVisible)}
            visibilityOn={onVisible}
          />
        }
      />
    </View>
  );
};
