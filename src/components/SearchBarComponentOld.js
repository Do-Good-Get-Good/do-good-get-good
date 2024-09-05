import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext/CreateActivityContext";

export function SearchBarComponentOld() {
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
export default SearchBarComponentOld;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: 5,
    height: 55,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
          width: 1,
        },
        shadowOpacity: 0.2,
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
