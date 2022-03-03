import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

export function SearchBarComponent() {
  const adminGalleryContext = useAdminGalleryFunction();
  const createActivityContext = useCreateActivityFunction();
  const [wordToSearch, setWordToSearch] = useState("");

  // function searchWordButtonPressed() {
  //   if (adminGalleryContext.activeOrInactiveActivity === true) {
  //     createActivityContext.word(wordToSearch);
  //   } else {
  //     adminGalleryContext.word(wordToSearch);
  //   }
  // }

  useEffect(() => {
    if (adminGalleryContext.activeOrInactiveActivity === true) {
      createActivityContext.word(wordToSearch);
    } else {
      adminGalleryContext.word(wordToSearch);
    }
  }, [wordToSearch]);

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={setWordToSearch}
          value={wordToSearch}
          placeholder="Sök"
        />
        <Icon
          style={styles.icon}
          color="#5B6770"
          name="search"
          onPress={() => searchWordButtonPressed()}
          size={30}
        />
      </View>
    </View>
  );
}
export default SearchBarComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",

    paddingVertical: 10,
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
  },

  icon: {
    flex: 1,
    marginRight: 20,
  },
  textAktiva: {
    fontSize: 20,
  },
  // textRadioButtonFilter: {
  //   flex: 1,
  //   flexDirection: "row",
  //   marginHorizontal: 16,
  // },
});
