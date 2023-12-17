import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  Text,
  TextInput,
  TextInputIOSProps,
  View,
} from "react-native";
import { errorTextStyle } from "../styles/errorTextStyle";
import { Controller, FieldError } from "react-hook-form";
import colors from "../assets/theme/colors";
import { borderStyle } from "../styles/borderStyle";
import { placeholderTextStyle } from "../styles/placeholderTextStyle";
import { StyleSheet } from "react-native";

type Props = {
  error?: FieldError;
  control: any;
  name: string;
  placeholderText: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  textContentType?: TextInputIOSProps["textContentType"];
  IconRight?: any;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
};

export const InputField = ({
  error = undefined,
  control,
  placeholderText,
  name,
  required = true,
  keyboardType,
  textContentType,
  IconRight,
  returnKeyType = "next",
  secureTextEntry = false,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <View style={styles.containerInput}>
            <TextInput
              style={[placeholderTextStyle(), borderStyle(error !== undefined)]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder={placeholderText}
              placeholderTextColor={colors.dark}
              returnKeyType={returnKeyType}
              keyboardType={keyboardType}
              textContentType={textContentType}
              secureTextEntry={secureTextEntry}
            />
            <View style={styles.showPasswordIcon}>
              {IconRight && IconRight}
            </View>
          </View>
          {error && <Text style={errorTextStyle()}>{error.message}</Text>}
        </>
      )}
    />
  );
};

export const styles = StyleSheet.create({
  containerInput: { flexDirection: "row", position: "relative" },
  showPasswordIcon: {
    position: "absolute",
    right: 15,
    paddingTop: 10,
    alignSelf: "center",
  },
});
