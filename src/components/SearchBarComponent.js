import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

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

  return (
    <View style={styles.container}>
      <TextInput
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
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: "white",

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
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
      },
    }),
  },
  textInput: {
    flex: 3,
    paddingLeft: 15,
    fontSize: 20,
    paddingVertical: 13,
  },

  icon: {
    flex: 1,
  },
  textAktiva: {
    fontSize: 20,
  },
  lineNearIcon: {
    borderLeftWidth: 1,
    borderColor: "#5B6770",
    opacity: 0.18,
  },
  iconContainer: {
    marginTop: 13,
    paddingHorizontal: 15,
  },
});
