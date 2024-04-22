import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputIOSProps,
  TextInputProps,
  View,
} from "react-native";
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
  keyboardType?: KeyboardTypeOptions | undefined;
  textContentType?: TextInputIOSProps["textContentType"];
  IconRight?: any;
  returnKeyType?: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  contextMenuHidden?: boolean;
  testID?: string;
  toTrim?: boolean;
};

export const InputFieldWithController = ({
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
  autoCapitalize = "words",
  contextMenuHidden = false,
  testID,
  toTrim,
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
              testID={`input-${testID}`}
              style={[placeholderTextStyle(), borderStyle(error !== undefined)]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(toTrim ? value.trim() : value)}
              value={value}
              placeholder={placeholderText}
              placeholderTextColor={colors.dark}
              returnKeyType={returnKeyType}
              keyboardType={keyboardType}
              textContentType={textContentType}
              secureTextEntry={secureTextEntry}
              autoCapitalize={autoCapitalize}
              contextMenuHidden={contextMenuHidden}
            />
            <View style={styles.showPasswordIcon}>
              {IconRight && IconRight}
            </View>
          </View>
          {error && (
            <Text testID={`input-error-${testID}`} style={errorTextStyle()}>
              {error.message}
            </Text>
          )}
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
