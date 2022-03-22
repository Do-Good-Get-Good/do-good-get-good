import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import { Icon } from "react-native-elements";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

export function SearchBarComponent() {
  const adminGalleryContext = useAdminGalleryFunction();
  const createActivityContext = useCreateActivityFunction();
  const [wordToSearch, setWordToSearch] = useState("");

  function searchWordButtonPressed() {
    if (adminGalleryContext.activeOrInactiveActivity === true) {
      createActivityContext.word(wordToSearch);
    } else {
      adminGalleryContext.word(wordToSearch);
    }
    Keyboard.dismiss();
  }

  useEffect(() => {
    if (wordToSearch === "" || wordToSearch === " ") {
      if (adminGalleryContext.activeOrInactiveActivity === true) {
        createActivityContext.word("");
      } else {
        adminGalleryContext.word("");
      }
    }
  }, [wordToSearch]);

  useEffect(() => {
    if (adminGalleryContext.cleanUpSearchBarComponent) {
      setWordToSearch("");
      adminGalleryContext.setCleanUpSearchBarComponent(false);
    }
  }, [adminGalleryContext.cleanUpSearchBarComponent]);

  return (
    <View style={styles.container}>
      <TextInput
        onSubmitEditing={() => searchWordButtonPressed()}
        returnKeyType="search"
        style={styles.textInput}
        onChangeText={setWordToSearch}
        value={wordToSearch}
        placeholder="Sök"
      />
      <View style={styles.lineNearIcon}></View>
      <TouchableOpacity
        testID="searchButtonPressed"
        onPress={() => searchWordButtonPressed()}
        style={styles.iconContainer}
      >
        <Icon style={styles.icon} color="#5B6770" name="search" size={30} />
      </TouchableOpacity>
    </View>
  );
}
export default SearchBarComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 16,
    backgroundColor: colors.background,
    borderRadius: 5,
    height: 55,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
        shadowColor: colors.dark,
      },
    }),
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    ...typography.b1,
  },
  textAktiva: {
    fontSize: 20,
  },
  lineNearIcon: {
    width: 1,
    height: 55,
    borderLeftWidth: 1,
    borderColor: colors.dark,
    opacity: 0.18,
  },
  iconContainer: {
    width: 55,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
