import { useState } from "react";
import { Controller, FieldError } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowUpDown } from "../assets/icons/ArrowUpDown";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { errorTextStyle } from "../styles/errorTextStyle";
import { Role } from "../utility/enums";

type Props = {
  control: any;
  error?: FieldError;
};

export const ChangeUserRole = ({ control, error = undefined }: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={{ marginTop: 10 }}>
      <Controller
        name="role"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity
              onBlur={onBlur}
              style={[
                styles.input,
                styles.dropdownShadow,
                styles.dropdown,
                {
                  borderWidth: 1,
                  borderColor: expanded ? colors.dark : colors.background,
                },
              ]}
              onPress={() => {
                setExpanded(!expanded);
              }}
            >
              <Text testID={"role-item"} style={styles.placeholderText}>
                {value}
              </Text>
              <ArrowUpDown
                onPress={() => setExpanded(!expanded)}
                expanded={expanded}
              />
            </TouchableOpacity>
            {expanded && (
              <View
                style={[styles.listItemContentStyle, styles.dropdownShadow]}
              >
                {Object.values(Role).map((role, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      [onChange(role), setExpanded(!expanded)];
                    }}
                  >
                    <Text
                      testID={`role-item-${role}`}
                      style={styles.dropdownItem}
                    >
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {error && (
              <Text testID={"role-error"} style={errorTextStyle()}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    maxHeight: 55,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 5,
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
  },

  warningAboutRequired: {
    color: colors.error,
    marginTop: -5,
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownShadow: {
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  dropdownItem: {
    marginVertical: 8,
    ...typography.button.sm,
  },
  placeholderText: {
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    color: colors.dark,
  },
  listItemContentStyle: {
    flexDirection: "column",
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: colors.background,
  },
});
