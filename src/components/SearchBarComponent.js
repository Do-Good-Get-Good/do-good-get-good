import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";

import { useRoute } from "@react-navigation/native";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

export const SearchBarComponent = ({ navigation }) => {
  const rout = useRoute();
  const adminGalleryContext = useAdminGalleryFunction();
  const [wordToSearch, setWordToSearch] = useState("");
  const [wordTOSend, setWordToSend] = useState("");
  const [isClean, setIsClean] = useState(true);

  useEffect(() => {
    if (isClean === true) {
      adminGalleryContext.word("");
    } else {
    }
    adminGalleryContext.word(wordTOSend);
  }, [isClean, wordTOSend]);

  useEffect(() => {
    if (wordToSearch != "") {
      setIsClean(false);
    } else {
      setIsClean(true);
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
          onPress={() => setWordToSend(wordToSearch)}
          size={30}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // borderColor: 'black',
    // borderWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: "white",
    // overflow: 'hidden',
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
  textRadioButtonFilter: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 16,
  },
});
