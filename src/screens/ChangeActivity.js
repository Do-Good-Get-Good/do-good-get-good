import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import BottomNavButtons from "../components/BottomNavButtons";

import Images from "../lib/images";

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

  useEffect(() => {
    if (route.params?.imageForActivity != undefined) {
      setPhoto(route.params?.imageForActivity);
    }
  }, [route.params?.imageForActivity]);

  function buttonSavePressed() {
    let changedObject = {
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

  function changeImageForActivity() {
    for (let index = 0; index < Images.length; index++) {
      if (photo === Images[index].name) {
        return Images[index].image;
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <Text style={styles.textMainTitle}>Ändra aktivitet</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={setTitle}
            value={title}
            placeholder={activity.title}
            placeholderTextColor={colors.dark}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setCity}
            value={city}
            placeholder={activity.city}
            placeholderTextColor={colors.dark}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={setPlace}
            value={place}
            placeholder={activity.place}
            placeholderTextColor={colors.dark}
          />
          <TextInput
            style={[styles.textInput, styles.textDescriptionField]}
            numberOfLines={5}
            multiline={true}
            onChangeText={setDescription}
            value={description}
            placeholder={activity.description}
            placeholderTextColor={colors.dark}
          />

          <View style={styles.containerImageAndInsertButton}>
            <Image style={styles.image} source={changeImageForActivity()} />
            <TouchableOpacity
              testID="navigateToImagesGallery"
              onPress={() =>
                navigation.navigate("ImagesGallery", {
                  activity: activity,
                  tgPopular: tgPopular,
                  cameFrom: "ChangeActivity",
                })
              }
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonBorderStyle}
              >
                <Text style={styles.textButtonInsert}>Ändra bild</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomNavButtons
        primaryText="Spara"
        secondaryText="Avbryt"
        primaryFunc={() => buttonSavePressed()}
        secondaryFunc={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}
export default ChangeActivity;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  textMainTitle: {
    ...typography.h2,
    fontWeight: "500",
    paddingTop: 5,
    color: colors.dark,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  textInput: {
    ...typography.b1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    color: colors.dark,
    marginBottom: 10,
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
  textDescriptionField: {
    marginTop: 5,
    textAlignVertical: "top",
    paddingTop: 12,
    height: 130,
  },
  containerImageAndInsertButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  textButtonInsert: {
    flex: 1,
    letterSpacing: 2,
    backgroundColor: colors.light,
    marginVertical: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.light,
    textAlign: "center",
    paddingTop: Platform.OS === "ios" ? 12 : null,
    textAlignVertical: "center",
    width: "99%",
    ...typography.button.lg,
    fontWeight: "500",
    color: colors.dark,
    overflow: "hidden",
  },
  buttonBorderStyle: {
    borderRadius: 5,
    height: 55,
    width: 200,
    alignItems: "center",
  },
});
