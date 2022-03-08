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
import { Icon } from "react-native-elements";

import Images from "../Images";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export function ChangeActivity({ route, navigation }) {
  const { activity } = route.params;
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  console.log("activity   ", activity);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textMainTitle}>Ändra aktivitet</Text>
        </View>
        <View style={styles.containerForInputs}>
          <TextInput
            style={{
              ...styles.textInputs,
              ...styles.textTitleField,
            }}
            numberOfLines={2}
            multiline={true}
            onChangeText={setTitle}
            value={title}
            placeholder={activity.title}
            placeholderTextColor={colors.dark}
          />
          <TextInput
            style={styles.textInputs}
            numberOfLines={2}
            multiline={true}
            onChangeText={setCity}
            value={city}
            placeholder={activity.city}
            placeholderTextColor={colors.dark}
          />
          <TextInput
            style={styles.textInputs}
            numberOfLines={2}
            multiline={true}
            onChangeText={setPlace}
            value={place}
            placeholder={activity.place}
            placeholderTextColor={colors.dark}
          />
          <TextInput
            style={{
              ...styles.textInputs,
              ...styles.textDescriptionField,
            }}
            numberOfLines={5}
            multiline={true}
            onChangeText={setDescription}
            value={description}
            placeholder={activity.description}
            placeholderTextColor={colors.dark}
          />
        </View>

        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity
            testID="saveButton"
            onPress={() => buttonSavePressed()}
          >
            <Text style={styles.buttonSave}>Spara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="backButton"
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
      </ScrollView>
    </SafeAreaView>
  );
}
export default ChangeActivity;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textMainTitle: {
    ...typography.h2,
    fontWeight: "500",
    color: colors.dark,
    marginRight: 10,
  },
  containerForInputs: {
    marginHorizontal: 16,
  },
  textInputs: {
    paddingLeft: 11,
    // paddingTop: 11,
    // paddingBottom: 11,
    // textAlignVertical: "top",
    // height: 130,
    // marginTop: 12,
    ...typography.b1,
    color: colors.dark,
    marginBottom: 12,
    backgroundColor: colors.background,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.background,
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
  textTitleField: {
    marginTop: 18,
  },
  textDescriptionField: {
    marginTop: 18,
    textAlignVertical: "top",
    paddingTop: 13,
  },
  containerForTwoBottomButtons: {
    marginTop: 30,
    marginBottom: 16,
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
    paddingVertical: 20,
    paddingBottom: 10,
    marginBottom: 10,
  },
  buttonBorderStyleButtonBackAndCancel: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
});
