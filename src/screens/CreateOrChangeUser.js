import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import Menu from "../components/Menu";
import { useCreateUserFunction } from "../context/CreateUserContext";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export const CreateOrChangeUser = ({ route, navigation }) => {
  const createUserOrChangeContext = useCreateUserFunction();
  const {
    createNewUser,
    userName,
    userSurname,
    statusActive,
    userID,
    personalInfoID,
  } = route.params;
  const [newUser, setNewUser] = useState(createNewUser);
  const titleNewUser = "Ny användare";
  const titleChangeUser = "Ändra användare";

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameFilledUp, setNameFilledUp] = useState(null);
  const [surnameFilledUp, setSurnameFilledUp] = useState(null);
  const [emailFilledUp, setEmailFilledUp] = useState(null);
  const [passwordFilledUp, setPasswordFilledUp] = useState(null);
  const [userStatusActive, setUserStatusActive] = useState(statusActive);

  function titleForScreen() {
    if (newUser === true) {
      return titleNewUser;
    } else if (newUser === false) {
      return titleChangeUser;
    } else {
      console.log("User undefind");
    }
  }

  useEffect(() => {
    const createNewUserOrChangeUser = () => {
      if (newUser === false) {
        setName(userName);
        setSurname(userSurname);
      }
    };
    createNewUserOrChangeUser();
  }, [newUser]);

  function sendNewUserToCreateActivityScreen() {
    if (
      name != " " &&
      surname != " " &&
      email != " " &&
      password != " " &&
      name.trim() &&
      surname.trim() &&
      email.trim() &&
      password.trim()
    ) {
      navigation.navigate("CreateActivity", {
        creatingNewUser: true,
        // activityExist: null,

        newUserInfo: {
          first_name: name,
          last_name: surname,
          email: email,
          password: password,
        },
      });

      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    } else {
      console.log("One of fild is empty");
    }
    ckeckingForEmptyLines();
  }

  function ckeckingForEmptyLines() {
    if (name != " " && name.trim()) {
      setNameFilledUp(true);
    } else {
      setNameFilledUp(false);
    }

    if (surname != " " && surname.trim()) {
      setSurnameFilledUp(true);
    } else {
      setSurnameFilledUp(false);
    }

    if (email != " " && email.trim()) {
      setEmailFilledUp(true);
    } else {
      setEmailFilledUp(false);
    }

    if (password != " " && password.trim()) {
      setPasswordFilledUp(true);
    } else {
      setPasswordFilledUp(false);
    }
  }

  function twoBottomButtonsForAllViews() {
    if (newUser === true) {
      return (
        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity onPress={() => sendNewUserToCreateActivityScreen()}>
            <Text style={styles.buttonSave}>Nästa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonBorderStyleButtonBackAndCancel}
            >
              <Text style={styles.buttonCancel}>Avbryt</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    } else if (newUser === false) {
      return (
        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity onPress={() => buttonSavePressed()}>
            <Text style={styles.buttonSave}>Spara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonBorderStyleButtonBackAndCancel}
            >
              <Text style={styles.buttonCancel}>Avbryt</Text>
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
      flex: 1,
      paddingVertical: 13,
      paddingLeft: 11,
      marginTop: 9,
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
  emaiBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: emailFilledUp === false ? colors.error : colors.background,
    };
  };
  passwordBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor:
        passwordFilledUp === false ? colors.error : colors.background,
    };
  };

  function viewForNewUser() {
    return (
      <>
        <TextInput
          style={[nameSurnameEmailPasswordStyle(), surnameBorderStyle()]}
          maxLength={30}
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail [obligatorisk]"
          placeholderTextColor={colors.dark}
        />
        {emailFilledUp === false ? (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        ) : null}
        <TextInput
          style={[nameSurnameEmailPasswordStyle(), passwordBorderStyle()]}
          maxLength={30}
          onChangeText={setPassword}
          value={password}
          placeholder="Lösenord [obligatorisk]"
          placeholderTextColor={colors.dark}
        />
        {passwordFilledUp === false ? (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        ) : null}
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
    if (userStatusActive != statusActive) {
      createUserOrChangeContext.userActiveStatusChange(userStatusActive);
      createUserOrChangeContext.userIDToChangePersonalInfo(userID);
    } else if (name != userName) {
      createUserOrChangeContext.userFirstNameToChange(name);
      createUserOrChangeContext.userIDToChangePersonalInfo(userID);
      createUserOrChangeContext.personalInformationID(personalInfoID);
      //   setTellToAdminHomePageToUpdate(true);
    } else if (surname != userSurname) {
      createUserOrChangeContext.userLastNameToChange(surname);
      createUserOrChangeContext.userIDToChangePersonalInfo(userID);
      createUserOrChangeContext.personalInformationID(personalInfoID);
      //   setTellToAdminHomePageToUpdate(true);
    } else {
      console.log("No changes in user personal info ");
    }
    navigation.goBack();
    // navigation.navigate("HomePage", {
    //   reload: tellToAdminHomePageToUpdate,
    // });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.textMainTitle}>{titleForScreen()}</Text>
            <Text style={styles.numbersNearTitle}>
              {newUser === true ? "   1/2" : null}
            </Text>
          </View>

          <View style={styles.containerForAllInput}>
            <TextInput
              style={[nameSurnameEmailPasswordStyle(), nameBorderStyle()]}
              maxLength={30}
              onChangeText={setName}
              value={name}
              placeholder="Förnamn [obligatorisk]"
              placeholderTextColor={colors.dark}
            />
            {nameFilledUp === false ? (
              <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
            ) : null}
            <TextInput
              style={[nameSurnameEmailPasswordStyle(), emaiBorderStyle()]}
              maxLength={30}
              onChangeText={setSurname}
              value={surname}
              placeholder="Efternamn [obligatorisk]"
              placeholderTextColor={colors.dark}
            />
            {surnameFilledUp === false ? (
              <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
            ) : null}

            {newUser === true ? viewForNewUser() : null}
            {newUser === false ? pressedUserStatusActive() : null}
          </View>
          {twoBottomButtonsForAllViews()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 15,
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
    marginTop: 13,
    color: colors.dark,
  },
  containerForAllInput: {
    flex: 1,
  },
  containerForTwoBottomButtons: {
    marginTop: 250,
    marginBottom: 40,
  },
  buttonSave: {
    ...typography.button.lg,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    overflow: "hidden",
    paddingVertical: 13,
  },

  buttonBorderStyleButtonBackAndCancel: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    alignItems: "center",
  },
  buttonCancel: {
    ...typography.button.lg,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 2,
    paddingVertical: 12,
    paddingHorizontal: 151,
    backgroundColor: colors.light,
    borderRadius: 5,
    overflow: "hidden",
  },
  warningAboutRequired: {
    color: colors.error,
    marginTop: 1,
  },
  textChangeStatusActive: {
    flex: 1,
    marginTop: 30,
    color: colors.dark,
    ...typography.button.sm,
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginLeft: 2,
  },
});
