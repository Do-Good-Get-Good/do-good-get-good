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
  Dimensions,
} from "react-native";
import Menu from "../components/Menu";

import Images from "../Images";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export function ChangeActivity({ route, navigation }) {
  const { activity, tgPopular } = route.params;
  const activityCardFunction = useActivityCardContext();
  const createActivityContext = useCreateActivityFunction();
  const [title, setTitle] = useState(activity.title);
  const [city, setCity] = useState(activity.city);
  const [place, setPlace] = useState(activity.place);
  const [description, setDescription] = useState(activity.description);
  const [photo, setPhoto] = useState(activity.photo);

  function buttonSavePressed() {
    let changedObject = {};

    changedObject = {
      active: activity.active,
      city: city,
      description: description,
      id: activity.id,
      photo: photo,
      place: place,
      popular: activity.popular,
      title: title,
    };

    activityCardFunction.changeActivityCard(true);
    activityCardFunction.activityWithChangedInfor(changedObject);
    navigation.navigate("ActivityCard", {
      activityInfo: changedObject,
      admin: true,
      active: true,
      tgPopular: tgPopular,
    });
    createActivityContext.activityHasChangedID({
      activityInfo: changedObject,
      popular: tgPopular,
      statusActive: true,
    });
    createActivityContext.activityHasChanged(true);
  }

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: Dimensions.get("screen").height,
          }}
        >
          <View style={styles.container}>
            <Text style={styles.textMainTitle}>Ändra aktivitet</Text>

            <TextInput
              style={{
                ...styles.textInputs,
                ...styles.textTitleField,
                ...styles.textForTitlePlaceCityInput,
              }}
              numberOfLines={2}
              multiline={true}
              onChangeText={setTitle}
              value={title}
              placeholder={activity.title}
              placeholderTextColor={colors.dark}
            />
            <TextInput
              style={{
                ...styles.textInputs,
                ...styles.textForTitlePlaceCityInput,
              }}
              numberOfLines={2}
              multiline={true}
              onChangeText={setCity}
              value={city}
              placeholder={activity.city}
              placeholderTextColor={colors.dark}
            />
            <TextInput
              style={{
                ...styles.textInputs,
                ...styles.textForTitlePlaceCityInput,
              }}
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
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Spara</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="backButton"
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cancelButtonBorder}
              >
                <Text style={styles.cancelButtonText}>Avbryt</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default ChangeActivity;

const styles = StyleSheet.create({
  container: {
    flex: 2.3,
    marginHorizontal: 16,
    marginVertical: 15,
  },
  textMainTitle: {
    ...typography.h2,
    fontWeight: "500",
    paddingTop: 7,
    color: colors.dark,
    marginRight: 10,
  },

  textForTitlePlaceCityInput: {
    flex: 0.2,
  },
  textInputs: {
    paddingLeft: 11,
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
    height: 130,
  },

  containerForTwoBottomButtons: {
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  saveButton: {
    borderRadius: 5,
    backgroundColor: colors.primary,
    height: 50,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    ...typography.button.lg,
    fontWeight: "500",
  },
  cancelButton: {
    borderRadius: 5,
    backgroundColor: colors.light,
    height: 50,
  },
  cancelButtonText: {
    ...typography.button.lg,
    backgroundColor: colors.light,
    borderRadius: 5,
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
    fontWeight: "500",
    paddingTop: Platform.OS === "ios" ? 12 : null,
  },
  cancelButtonBorder: {
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 5,
  },
});
