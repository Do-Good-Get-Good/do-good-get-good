import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";

import { useChangeUserInfoFunction } from "../context/ChangeUserInfoContext";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import BottomNavButtons from "../components/BottomNavButtons";

export const ChangeUser = ({ route, navigation }) => {
  const changeUserInfoContext = useChangeUserInfoFunction();
  const { userName, userSurname, statusActive, userID } = route.params;

  const [name, setName] = useState(userName);
  const [surname, setSurname] = useState(userSurname);
  const [nameFilledUp, setNameFilledUp] = useState(null);
  const [surnameFilledUp, setSurnameFilledUp] = useState(null);
  const [userStatusActive, setUserStatusActive] = useState(statusActive);
  const ref_input1 = useRef();

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

  nameSurnameStyle = function () {
    return {
      paddingVertical: 16,
      paddingLeft: 12,
      marginTop: 10,
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
          elevation: 2,
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
      <View style={styles.container}>
        <Text style={styles.textMainTitle}>Ändra användare</Text>

        <TextInput
          style={[nameSurnameStyle(), nameBorderStyle()]}
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
          style={[nameSurnameStyle(), surnameBorderStyle()]}
          maxLength={30}
          onChangeText={setSurname}
          value={surname}
          placeholder="Efternamn"
          placeholderTextColor={colors.dark}
          ref={ref_input1}
          returnKeyType={"send"}
          onSubmitEditing={() => {
            buttonSavePressed();
          }}
        />
        {surnameFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TouchableOpacity
          style={{
            marginTop: 10,
            alignSelf: "flex-start",
          }}
          onPress={() => setUserStatusActive(!userStatusActive)}
        >
          <Text style={styles.textChangeStatusActive}>
            {userStatusActive ? "Inaktivera användare" : "Aktivera användare"}
          </Text>
        </TouchableOpacity>
      </View>

      <BottomNavButtons
        primaryText="Spara"
        secondaryText="Avbryt"
        primaryFunc={() => buttonSavePressed()}
        secondaryFunc={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default ChangeUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  textMainTitle: {
    ...typography.h2,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.dark,
    ...Platform.select({
      ios: {
        paddingTop: 12,
      },
    }),
  },
  warningAboutRequired: {
    color: colors.error,
    marginTop: 1,
  },
  textChangeStatusActive: {
    color: colors.dark,
    ...typography.button.sm,
    textDecorationLine: "underline",
    fontWeight: "bold",
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
  placeholderText: {
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    color: colors.dark,
  },
});
