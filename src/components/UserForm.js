import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import { Icon } from "react-native-elements";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import BottomNavButtons from "./BottomNavButtons";
import { useNavigation } from "@react-navigation/native";

const UserForm = ({
  userLevel,
  name,
  setName,
  surname,
  setSurname,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  nextPage,
}) => {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    role === null ? "Behörighet" : role
  );
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordFilledUp, setPasswordFilledUp] = useState(null);
  const [nameFilledUp, setNameFilledUp] = useState(null);
  const [surnameFilledUp, setSurnameFilledUp] = useState(null);
  const [emailFilledUp, setEmailFilledUp] = useState(null);
  const [placeholderFilledUp, setPlaceholderFilledUp] = useState(null);
  const roles = ["user", "admin", "superadmin"];
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  useEffect(() => {
    if (name != null) {
      if (name != "" && name.trim()) {
        setNameFilledUp(true);
      } else {
        setNameFilledUp(false);
      }
    }
  }, [name]);

  useEffect(() => {
    if (surname != null) {
      if (surname != "" && surname.trim()) {
        setSurnameFilledUp(true);
      } else {
        setSurnameFilledUp(false);
      }
    }
  }, [surname]);

  useEffect(() => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email != null) {
      if (email != "" && email.trim()) {
        setEmailFilledUp(true);
      } else {
        setEmailFilledUp(false);
      }

      if (reg.test(email) === false) {
        setInvalidEmail(true);
      } else {
        setInvalidEmail(false);
      }
    }
  }, [email]);

  useEffect(() => {
    if (password != null) {
      if (password.length < 6) {
        setInvalidPassword(true);
      } else {
        setInvalidPassword(false);
      }
      if (password != "" && password.trim()) {
        setPasswordFilledUp(true);
      } else {
        setPasswordFilledUp(false);
      }
    }
  }, [password]);

  useEffect(() => {
    if (userLevel === "admin") {
      setPlaceholderFilledUp(true);
      setPlaceholder("");
    } else {
      if (placeholder === "Admin" || "User" || "Super admin") {
        setPlaceholderFilledUp(true);
      } else {
        setPlaceholderFilledUp(false);
      }
    }
  }, [placeholder]);

  function validInputs() {
    if (
      nameFilledUp &&
      surnameFilledUp &&
      emailFilledUp &&
      passwordFilledUp &&
      !invalidEmail &&
      !invalidPassword &&
      placeholderFilledUp &&
      placeholder != "Behörighet"
    ) {
      return true;
    } else {
      if (name === null) setNameFilledUp(false);
      if (surname === null) setSurnameFilledUp(false);
      if (email === null) setEmailFilledUp(false);
      if (password === null) setPasswordFilledUp(false);
      if (placeholder === "Behörighet") setPlaceholderFilledUp(false);
      return false;
    }
  }

  return (
    <>
      <ScrollView
        keyboardDismissMode={"on-drag"}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <TextInput
          style={[styles.input, styles.dropdownShadow]}
          maxLength={30}
          onChangeText={setName}
          value={name}
          placeholder="Förnamn"
          placeholderTextColor={colors.dark}
          returnKeyType="next"
          onSubmitEditing={() => ref_input1.current.focus()}
        />
        {nameFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[styles.input, styles.dropdownShadow]}
          maxLength={30}
          onChangeText={setSurname}
          value={surname}
          placeholder="Efternamn"
          placeholderTextColor={colors.dark}
          ref={ref_input1}
          returnKeyType={"next"}
          onSubmitEditing={() => ref_input2.current.focus()}
        />
        {surnameFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[styles.input, styles.dropdownShadow]}
          textContentType={"emailAddress"}
          keyboardType={"email-address"}
          maxLength={100}
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail"
          placeholderTextColor={colors.dark}
          ref={ref_input2}
          returnKeyType="next"
          onSubmitEditing={() => {
            ref_input3.current.focus();
          }}
        />
        {emailFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        {invalidEmail && emailFilledUp && (
          <Text style={styles.warningAboutRequired}>
            * Ange en giltig e-mail
          </Text>
        )}
        <View style={{ flexDirection: "row", position: "relative" }}>
          <TextInput
            style={[styles.input, styles.dropdownShadow]}
            maxLength={30}
            onChangeText={setPassword}
            value={password}
            placeholder="Lösenord"
            placeholderTextColor={colors.dark}
            ref={ref_input3}
            returnKeyType="default"
            secureTextEntry={showPassword ? false : true}
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
        {passwordFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        {invalidPassword && passwordFilledUp && (
          <Text style={styles.warningAboutRequired}>
            * Lösenordet måste innehålla minst 6 tecken
          </Text>
        )}

        {userLevel === "superadmin" && (
          <>
            <TouchableOpacity
              style={[
                styles.input,
                styles.dropdownShadow,
                styles.dropdown,
                {
                  borderWidth: 1,
                  borderColor: expanded ? colors.dark : colors.background,
                },
              ]}
              onPress={() => setExpanded(!expanded)}
            >
              <Text style={styles.placeholderText}>{placeholder}</Text>
              <Icon
                color="#5B6770"
                name={expanded === true ? "arrow-drop-up" : "arrow-drop-down"}
                size={30}
              />
            </TouchableOpacity>

            {expanded === true && (
              <View
                style={[styles.listItemContentStyle, styles.dropdownShadow]}
              >
                {roles.map((role, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setPlaceholder(role);
                      setRole(role.toLowerCase().replace(" ", ""));
                      setExpanded(false);
                    }}
                  >
                    <Text style={styles.dropdownItem}>{role}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {placeholderFilledUp === false && (
              <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
            )}
          </>
        )}
      </ScrollView>
      <BottomNavButtons
        primaryText="Nästa"
        secondaryText="Avbryt"
        primaryFunc={() => {
          if (validInputs()) nextPage();
        }}
        secondaryFunc={() => navigation.goBack()}
      />
    </>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    maxHeight: 55,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 15,
    alignSelf: "center",
    paddingBottom: 10,
    elevation: 2,
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
    marginTop: -10,
    flexDirection: "column",
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: colors.background,
  },
});
