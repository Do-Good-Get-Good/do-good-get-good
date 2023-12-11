import { Text, TextInput } from "react-native";
import { errorTextStyle } from "../styles/errorTextStyle";
import { Controller, FieldError } from "react-hook-form";
import colors from "../assets/theme/colors";
import { borderStyle } from "../styles/borderStyle";
import { placeholderTextStyle } from "../styles/placeholderTextStyle";

type Props = {
  error?: FieldError;
  control: any;
  name: string;
  placeholderText: string;
  required?: boolean;
};

export const InputField = ({
  error = undefined,
  control,
  placeholderText,
  name,
  required = true,
}: Props) => {
  console.log(error, "error");
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            style={[placeholderTextStyle(), borderStyle(error !== undefined)]}
            maxLength={30}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder={placeholderText}
            placeholderTextColor={colors.dark}
            returnKeyType="next"
          />
          {error && <Text style={errorTextStyle()}>* Obligatorisk</Text>}
        </>
      )}
    />
  );
};
