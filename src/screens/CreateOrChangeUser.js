import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import LinearGradient from "react-native-linear-gradient";

import { Icon } from "react-native-elements";

import Menu from "../components/Menu";

import { useChangeUserInfoFunction } from "../context/ChangeUserInfoContext";
import { useAdminCheckFunction } from "../context/AdminContext";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

export const CreateOrChangeUser = ({ route, navigation }) => {
  const userLevel = useAdminCheckFunction();
  const changeUserInfoContext = useChangeUserInfoFunction();
  const createActivityContext = useCreateActivityFunction();
  const {
    createNewUser,

    userName,
    userSurname,
    statusActive,
    userID,
  } = route.params;

  const titleNewUser = "Ny användare";
  const titleChangeUser = "Ändra användare";

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordFilledUp, setPasswordFilledUp] = useState(null);
  const [nameFilledUp, setNameFilledUp] = useState(null);
  const [surnameFilledUp, setSurnameFilledUp] = useState(null);
  const [emailFilledUp, setEmailFilledUp] = useState(null);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [userStatusActive, setUserStatusActive] = useState(statusActive);
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const sortOptions = ["User", "Admin", "Super admin"];
  const [placeholder, setPlaceholder] = useState("Role");
  const [expanded, setExpanded] = useState(false);
  const [role, setRole] = useState("user");
  const [placeholderFilledUp, setPlaceholderFilledUp] = useState(null);

  function titleForScreen() {
    if (createNewUser === true) {
      return titleNewUser;
    } else if (createNewUser === false) {
      return titleChangeUser;
    } else {
      console.log("User undefind");
    }
  }

  useEffect(() => {
    const createNewUserOrChangeUser = () => {
      if (createNewUser === false) {
        setName(userName);
        setSurname(userSurname);
      }
    };
    createNewUserOrChangeUser();
  }, [createNewUser]);

  function sendNewUserToCreateActivityScreen() {
    navigation.navigate("CreateActivity", {
      creatingNewUser: true,
      newUserInfo: {
        first_name: name,
        last_name: surname,
        email: email,
        password: password,
        role: role,
      },
    });
  }

  function validateInputs() {
    if (
      nameFilledUp &&
      surnameFilledUp &&
      emailFilledUp &&
      passwordFilledUp &&
      !invalidEmail &&
      !invalidPassword &&
      placeholderFilledUp &&
      placeholder != "Role"
    ) {
      return true;
    } else {
      if (name === null) setNameFilledUp(false);
      if (surname === null) setSurnameFilledUp(false);
      if (email === null) setEmailFilledUp(false);
      if (password === null) setPasswordFilledUp(false);
      if (placeholder === "Role") setPlaceholderFilledUp(false);
      return false;
    }
  }

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

  function twoBottomButtonsForAllViews() {
    if (createNewUser === true) {
      return (
        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity
            onPress={() => {
              if (validateInputs()) sendNewUserToCreateActivityScreen();
            }}
            style={styles.buttonSave}
          >
            <Text style={styles.buttonSaveText}>Nästa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              createActivityContext.chooseInDropDown(null);
              navigation.goBack();
            }}
            style={styles.buttonCancel}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.backAndCancelBorderGradient}
            >
              <Text style={styles.buttonCancelText}>Avbryt</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    } else if (createNewUser === false) {
      return (
        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity
            onPress={() => buttonSavePressed()}
            style={styles.buttonSave}
          >
            <Text style={styles.buttonSaveText}>Spara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => {
              createActivityContext.chooseInDropDown(null);
              navigation.goBack();
            }}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.backAndCancelBorderGradient}
            >
              <Text style={styles.buttonCancelText}>Avbryt</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    } else {
      console.log("User undefind");
    }
  }

  nameSurnameEmailPasswordStyle = function () {
    return {
      paddingVertical: 13,
      paddingLeft: 11,
      marginTop: 9,
      width: "100%",
      fontSize: typography.b1.fontSize,
      fontFamily: typography.b1.fontFamily,
      color: colors.dark,
      backgroundColor: colors.background,
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
    };
  };

  nameBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: nameFilledUp === false ? colors.error : colors.background,
    };
  };
  surnameBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: surnameFilledUp === false ? colors.error : colors.background,
    };
  };
  emailBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor:
        emailFilledUp === false || invalidEmail
          ? colors.error
          : colors.background,
    };
  };
  passwordBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor:
        passwordFilledUp === false || invalidPassword
          ? colors.error
          : colors.background,
    };
  };

  roleBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: expanded ? colors.dark : colors.background,
    };
  };

  function viewForNewUser() {
    return (
      <>
        <TextInput
          textContentType={"emailAddress"}
          keyboardType={"email-address"}
          style={[nameSurnameEmailPasswordStyle(), emailBorderStyle()]}
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
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <TextInput
            style={[nameSurnameEmailPasswordStyle(), passwordBorderStyle()]}
            maxLength={30}
            onChangeText={setPassword}
            value={password}
            placeholder="Lösenord"
            placeholderTextColor={colors.dark}
            ref={ref_input3}
            returnKeyType="send"
            secureTextEntry={showPassword ? false : true}
            onSubmitEditing={() => {
              if (validateInputs()) sendNewUserToCreateActivityScreen();
            }}
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
          <View style={styles.dropdownShadow}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <View style={[styles.styleForDropdown, roleBorderStyle()]}>
                <Text style={styles.placeholderText}>{placeholder}</Text>
                <Icon
                  color="#5B6770"
                  style={styles.sortIcon}
                  name={expanded === true ? "arrow-drop-up" : "arrow-drop-down"}
                  size={30}
                />
              </View>
            </TouchableOpacity>

            {expanded === true && (
              <View style={styles.listItemContentStyle}>
                {sortOptions.map((option, index) => (
                  <TouchableNativeFeedback
                    key={index}
                    onPress={() => {
                      setPlaceholder(option);
                      setRole(option.toLowerCase().replace(" ", ""));
                      setExpanded(false);
                    }}
                  >
                    <Text style={styles.dropdownItem}>{option}</Text>
                  </TouchableNativeFeedback>
                ))}
              </View>
            )}
            {placeholderFilledUp === false && (
              <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
            )}
          </View>
        )}
      </>
    );
  }
  function changeUserStatusActive() {
    setUserStatusActive(!userStatusActive);
  }

  function pressedUserStatusActive() {
    return (
      <>
        <TouchableOpacity onPress={() => changeUserStatusActive()}>
          {userStatusActive ? (
            <Text style={styles.textChangeStatusActive}>
              Inaktivera användare
            </Text>
          ) : (
            <Text style={styles.textChangeStatusActive}>
              Aktivera användare
            </Text>
          )}
        </TouchableOpacity>
      </>
    );
  }

  function buttonSavePressed() {
    if (
      userStatusActive != statusActive ||
      name != userName ||
      surname != userSurname
    ) {
      changeUserInfoContext.setNewChangesInUserInfo({
        userID: userID,
        userFirstName: name,
        userLastName: surname,
        statusActive: userStatusActive,
      });
    }
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <ScrollView keyboardDismissMode={"on-drag"} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.textMainTitle}>{titleForScreen()}</Text>
            <Text style={styles.numbersNearTitle}>
              {createNewUser === true && "1/2"}
            </Text>
          </View>

          <TextInput
            style={[nameSurnameEmailPasswordStyle(), nameBorderStyle()]}
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
            style={[nameSurnameEmailPasswordStyle(), surnameBorderStyle()]}
            maxLength={30}
            onChangeText={setSurname}
            value={surname}
            placeholder="Efternamn"
            placeholderTextColor={colors.dark}
            ref={ref_input1}
            returnKeyType={createNewUser ? "next" : "send"}
            onSubmitEditing={() => {
              if (!createNewUser) {
                buttonSavePressed();
              } else {
                ref_input2.current.focus();
              }
            }}
          />
          {surnameFilledUp === false && (
            <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
          )}

          {createNewUser === true && viewForNewUser()}
          {createNewUser === false && pressedUserStatusActive()}
        </View>
        {twoBottomButtonsForAllViews()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height - 232,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  textMainTitle: {
    ...typography.h2,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.dark,
  },
  titleContainer: {
    flexDirection: "row",
  },
  numbersNearTitle: {
    ...typography.b1,
    alignSelf: "center",
    color: colors.dark,
    paddingLeft: 10,
  },
  containerForAllInput: {
    height: 500,
  },
  showPasswordIcon: {
    justifyContent: "center",
    right: 36,
    top: 4,
    elevation: 2,
  },
  containerForTwoBottomButtons: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  buttonSave: {
    borderRadius: 5,
    backgroundColor: colors.primary,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSaveText: {
    ...typography.button.lg,
    fontWeight: "500",
    letterSpacing: 2,
    color: colors.dark,
  },
  backAndCancelBorderGradient: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
  buttonCancel: {
    height: 55,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonCancelText: {
    ...typography.button.lg,
    fontWeight: "500",
    letterSpacing: 2,
    backgroundColor: colors.light,
    borderRadius: 5,
    height: "100%",
    textAlignVertical: "center",
    textAlign: "center",
    overflow: "hidden",
    paddingTop: Platform.OS === "ios" ? 12 : null,
    color: colors.dark,
  },
  warningAboutRequired: {
    color: colors.error,
    marginTop: 1,
  },
  textChangeStatusActive: {
    marginTop: 20,
    color: colors.dark,
    ...typography.button.sm,
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginLeft: 2,
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
  styleForDropdown: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingLeft: 11,
    borderRadius: 3,
    backgroundColor: colors.background,
    overflow: "hidden",
    paddingVertical: 13,
    marginTop: 9,
  },
  placeholderText: {
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    color: colors.dark,
  },
  listItemContentStyle: {
    justifyContent: "space-between",
    overflow: "hidden",
    paddingLeft: 14,
    borderRadius: 3,
    backgroundColor: colors.background,
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
    paddingVertical: 10,
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    color: colors.dark,
  },
});
