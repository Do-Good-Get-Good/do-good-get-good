import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import BottomNavButtons from "../components/BottomNavButtons";
import Menu from "../components/Menu";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useActivityImages } from "../context/ActivityImagesContext/ActivityImagesContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext/CreateActivityContext";
import useSelectedImage from "../hooks/useSelectedImage";

export function ChangeActivity({ route, navigation }) {
  const { activity, tgPopular, image } = route.params;
  const activityCardFunction = useActivityCardContext();
  const createActivityContext = useCreateActivityFunction();
  const { getImageForActivity } = useActivityImages();

  const [title, setTitle] = useState(activity.title);
  const [city, setCity] = useState(activity.city);
  const [place, setPlace] = useState(activity.place);
  const [description, setDescription] = useState(activity.description);

  const photo = useSelectedImage(image, activity);

  function buttonSavePressed() {
    let changedObject = {
      active: activity.active,
      city: city,
      description: description,
      id: activity.id,
      photo: photo.photo,
      place: place,
      popular: activity.popular,
      title: title,
      imageUrl: photo.imageUrl,
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
            <Image
              style={styles.image}
              source={getImageForActivity(photo?.photo, photo?.imageUrl)}
            />
            <TouchableOpacity
              testID="navigateToImagesGallery"
              onPress={() =>
                navigation.navigate("ImagesGallery", {
                  activity: activity,
                  tgPopular: tgPopular,
                  cameFrom: "ChangeActivity",
                  selectedImage: photo,
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
    resizeMode: "cover",
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
