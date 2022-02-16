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
            <Text style={styles.buttonSave}>Näst</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={["#84BD00", "#5B6770"]}
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
              colors={["#84BD00", "#5B6770"]}
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
      fontSize: 18,
      color: "#333333",
      backgroundColor: "white",
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
      borderColor: nameFilledUp === false ? "#C62F25" : "white",
    };
  };
  surnameBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: surnameFilledUp === false ? "#C62F25" : "white",
    };
  };
  emaiBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: emailFilledUp === false ? "#C62F25" : "white",
    };
  };
  passwordBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: passwordFilledUp === false ? "#C62F25" : "white",
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
          placeholderTextColor="#333333"
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
          placeholderTextColor="#333333"
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
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.textMainTitle}>{titleForScreen()}</Text>
            <Text style={styles.numbersNearTitle}>
              {newUser === true ? "   1/2" : null}
            </Text>
          </View>
          <View style={styles.containerInputButton}>
            <View style={styles.containerForAllInput}>
              <TextInput
                style={[nameSurnameEmailPasswordStyle(), nameBorderStyle()]}
                maxLength={30}
                onChangeText={setName}
                value={name}
                placeholder="Förnamn [obligatorisk]"
                placeholderTextColor="#333333"
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
                placeholderTextColor="#333333"
              />
              {surnameFilledUp === false ? (
                <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
              ) : null}

              {newUser === true ? viewForNewUser() : null}
              {newUser === false ? pressedUserStatusActive() : null}
            </View>
            <View style={{ flex: 1 }}>{twoBottomButtonsForAllViews()}</View>
          </View>
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
  containerInputButton: {
    flex: 1,
  },
  textMainTitle: {
    flex: 1.2,
    fontSize: 34,
    marginBottom: 10,
    color: "#333333",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
  },
  numbersNearTitle: {
    flex: 1,
    fontSize: 18,
    marginTop: 13,
    color: "#333333",
  },
  containerForAllInput: {
    flex: 1,
  },
  textInputTitleCityPlace: {
    flex: 1,
    paddingVertical: 13,
    paddingLeft: 11,
    marginTop: 9,
    fontSize: 18,
    color: "#333333",
    backgroundColor: "white",

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
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
  textInputDescription: {
    flex: 1,
    flexShrink: 1,
    paddingVertical: 13,
    paddingLeft: 11,
    marginTop: 20,
    fontSize: 18,
    color: "#333333",
    marginBottom: 7,
    paddingBottom: 89,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
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
  containerForTwoBottomButtons: {
    flex: 1,
    marginTop: 250,
    marginBottom: 40,
  },
  buttonSave: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "#84BD00",
    overflow: "hidden",
    paddingVertical: 13,
  },

  buttonBorderStyleButtonBackAndCancel: {
    flex: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    alignItems: "center",
  },
  buttonCancel: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 2,
    paddingVertical: 12,
    paddingHorizontal: 155,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    overflow: "hidden",
  },
  warningAboutRequired: {
    color: "#C62F25",

    marginTop: 1,
  },
  textChangeStatusActive: {
    flex: 1,
    marginTop: 30,
    color: "#333333",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginLeft: 2,
  },
});
