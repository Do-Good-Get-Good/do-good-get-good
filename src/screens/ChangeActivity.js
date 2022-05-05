import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import Menu from "../components/Menu";

import { SafeAreaView } from "react-native-safe-area-context";

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
  const [holderCantBeEmply, setHolderCantBeEmply] = useState(false);

  const MENU_HEIGHT = 65;

  useEffect(() => {
    if (route.params?.imageForActivity != undefined) {
      setPhoto(route.params?.imageForActivity);
    }
  }, [route.params?.imageForActivity]);

  function calculateBottomButtonHeight() {
    let saveButtonHeight = styles.saveButton.height;
    let cancelButtonHeight = styles.cancelButton.height;
    let saveButtonMarginBottom = styles.saveButton.marginBottom;
    let bottomButtonContainerMarginBottom =
      styles.containerForTwoBottomButtons.marginBottom;

    let sum =
      saveButtonHeight +
      cancelButtonHeight +
      saveButtonMarginBottom +
      bottomButtonContainerMarginBottom;

    return sum;
  }

  function buttonSavePressed() {
    if (
      title != " " &&
      city != " " &&
      place != " " &&
      title.trim() &&
      city.trim() &&
      place.trim()
    ) {
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
      <ScrollView style={styles.container}>
        <View
          style={{
            minHeight:
              Dimensions.get("window").height -
              MENU_HEIGHT -
              calculateBottomButtonHeight(),
          }}
        >
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
            placeholder="Aktivitet"
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
            placeholder="Var"
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
            placeholder="Aktör"
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
            placeholder="Vad"
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
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
}
export default ChangeActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  textMainTitle: {
    ...typography.h2,
    fontWeight: "500",
    paddingTop: 5,
    color: colors.dark,
    marginRight: 10,
  },
  textForTitlePlaceCityInput: {},
  textInputs: {
    paddingLeft: 10,
    ...typography.b1,
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
  textTitleField: {
    marginTop: 18,
  },
  textDescriptionField: {
    marginTop: 18,
    textAlignVertical: "top",
    paddingTop: 13,
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
  containerForTwoBottomButtons: {
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
