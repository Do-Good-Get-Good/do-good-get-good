import React, { useState, useEffect, useMemo } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import { Icon } from "@rneui/base";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import BottomNavButtons from "../components/BottomNavButtons";
import { addActivity } from "../firebase-functions/add";
import LoadingOverlay from "../components/LoadingOverlay";
import { useActivityImages } from "../context/ActivityImagesContext";
import useSelectedImage from "../hooks/useSelectedImage";

export function CreateActivity({ route, navigation }) {
  const { setAllActiveActvivitiesFB } = useCreateActivityFunction();
  const { getImageForActivity } = useActivityImages();
  const photo = useSelectedImage(route.params?.image);

  const [checkBoxPressed, setCheckBoxPressed] = useState(false);
  const [title, setTitle] = useState(null);
  const [place, setPlace] = useState(null);
  const [city, setCity] = useState(null);
  const [description, setDescription] = useState("");
  const [titleFilledUp, setTitleFilledUp] = useState(null);
  const [placeFilledUp, setPlaceFilledUp] = useState(null);
  const [cityFilledUp, setCityFilledUp] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (title !== null) {
      if (title.trim() === "") {
        setTitleFilledUp(false);
      } else {
        setTitleFilledUp(true);
      }
    }
  }, [title]);

  useEffect(() => {
    if (city !== null) {
      if (city.trim() === "") {
        setCityFilledUp(false);
      } else {
        setCityFilledUp(true);
      }
    }
  }, [city]);

  useEffect(() => {
    if (place !== null) {
      if (place.trim() === "") {
        setPlaceFilledUp(false);
      } else {
        setPlaceFilledUp(true);
      }
    }
  }, [place]);

  function validateInputs() {
    if (titleFilledUp && placeFilledUp && cityFilledUp) return true;

    if (titleFilledUp === null) setTitleFilledUp(false);
    if (cityFilledUp === null) setCityFilledUp(false);
    if (placeFilledUp === null) setPlaceFilledUp(false);
    return false;
  }

  async function createActivityAndAddLocally() {
    setLoading(true);
    const newActivity = {
      active_status: true,
      activity_city: city,
      activity_description: description,
      activity_photo: photo.photo,
      image_url: photo.imageUrl,
      activity_place: place,
      activity_title: title,
      tg_favorite: checkBoxPressed,
    };
    try {
      let createdActivityId = await addActivity(newActivity);
      setAllActiveActvivitiesFB((prev) => [
        ...prev,
        {
          id: createdActivityId,
          active: newActivity.active_status,
          title: newActivity.activity_title,
          city: newActivity.activity_city,
          place: newActivity.activity_place,
          description: newActivity.activity_description,
          photo: newActivity.activity_photo,
          imageUrl: newActivity.image_url,
          popular: newActivity.tg_favorite,
        },
      ]);
      setLoading(false);
      alertPopUp(newActivity.activity_title);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Ett fel uppstod! Det gick inte att skapa aktiviteten",
        error.message,
      );
    }
  }

  function alertPopUp(title) {
    let alertTitle = "Skapa aktivitet";
    let alertMessage = `Aktiviteten '${title}' har skapats!`;

    Alert.alert(alertTitle, alertMessage, [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("AdminPage");
        },
      },
    ]);
  }

  titleCityPlaceStyle = function () {
    return {
      flex: 1,
      paddingVertical: 16,
      paddingLeft: 12,
      marginTop: 10,
      fontFamily: typography.b1.fontFamily,
      fontSize: typography.b1.fontSize,
      color: colors.dark,
      backgroundColor: colors.background,
      ...styles.shadow,
    };
  };

  titleBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: titleFilledUp === false ? colors.error : colors.background,
    };
  };
  cityBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: cityFilledUp === false ? colors.error : colors.background,
    };
  };
  placeBorderStyle = function () {
    return {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: placeFilledUp === false ? colors.error : colors.background,
    };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && <LoadingOverlay />}
      <Menu />
      <Text style={styles.textMainTitle}>Lägg till aktivitet</Text>
      <ScrollView
        keyboardDismissMode={"on-drag"}
        contentContainerStyle={{ marginHorizontal: 16, paddingBottom: 16 }}
      >
        <TextInput
          style={[titleCityPlaceStyle(), titleBorderStyle()]}
          maxLength={30}
          onChangeText={setTitle}
          onEndEditing={() => {
            title !== null && setTitle(title.trim());
          }}
          value={title}
          placeholder="Aktivitet"
          placeholderTextColor={colors.dark}
        />
        {titleFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[titleCityPlaceStyle(), cityBorderStyle()]}
          maxLength={30}
          onChangeText={setCity}
          onEndEditing={() => {
            city !== null && setCity(city.trim());
          }}
          value={city}
          placeholder="Var"
          placeholderTextColor={colors.dark}
        />
        {cityFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[titleCityPlaceStyle(), placeBorderStyle()]}
          maxLength={30}
          onChangeText={setPlace}
          onEndEditing={() => {
            place !== null && setPlace(place.trim());
          }}
          value={place}
          placeholder="Aktör"
          placeholderTextColor={colors.dark}
        />
        {placeFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[styles.textInputDescription, styles.shadow]}
          numberOfLines={5}
          multiline={true}
          onChangeText={setDescription}
          onEndEditing={() => setDescription(description.trim())}
          value={description}
          placeholder="Vad"
          placeholderTextColor={colors.dark}
        />
        <View style={styles.containerImageAndInsertButton}>
          <Image
            testID="photo"
            style={styles.image}
            source={getImageForActivity(photo.photo, photo.imageUrl)}
          />

          <TouchableOpacity
            testID="navigateToImagesGallery"
            onPress={() =>
              navigation.navigate("ImagesGallery", {
                cameFrom: "CreateActivity",
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
              <Text style={styles.textButtonInsert}>Infoga</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.containerTextAndCheckbox}>
          <Text style={styles.textNearCheckBox}>Lägg till som TG-favorit</Text>
          <TouchableOpacity
            testID="buttonSomTGFavorit"
            onPress={() => {
              checkBoxPressed === false
                ? setCheckBoxPressed(true)
                : setCheckBoxPressed(false);
            }}
          >
            {checkBoxPressed === true ? (
              <View style={styles.checkBoxTrue}>
                <Icon name="done" size={20}></Icon>
              </View>
            ) : (
              <View style={styles.checkBoxFalse}></View>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.textUnderCheckBox}>
          TG-favoriter visas för alla användare
        </Text>
      </ScrollView>
      <BottomNavButtons
        primaryText="Spara"
        secondaryText="Avbryt"
        primaryFunc={() => {
          if (validateInputs()) createActivityAndAddLocally();
        }}
        secondaryFunc={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}
export default CreateActivity;

const styles = StyleSheet.create({
  textMainTitle: {
    ...typography.h2,
    fontWeight: "500",
    color: colors.dark,
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        paddingTop: 16,
      },
      android: {
        paddingTop: 8,
      },
    }),
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  textInputDescription: {
    paddingLeft: 11,
    paddingTop: 11,
    paddingBottom: 11,
    textAlignVertical: "top",
    height: 130,
    marginTop: 20,
    ...typography.b1,
    color: colors.dark,
    marginBottom: 30,
    backgroundColor: colors.background,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.background,
  },
  containerImageAndInsertButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
    paddingHorizontal: Platform.OS === "ios" ? 63 : 64,
    ...typography.button.lg,
    fontWeight: "500",
    color: colors.dark,
    overflow: "hidden",
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
  buttonBorderStyle: {
    borderRadius: 5,
    height: 55,
    width: 200,
    alignItems: "center",
  },
  containerTextAndCheckbox: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
  },
  checkBoxTrue: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.dark,
  },
  checkBoxFalse: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.background,
  },
  textNearCheckBox: {
    marginRight: 5,
    fontSize: typography.b1.fontSize,
    fontWeight: "bold",
    color: colors.dark,
    marginRight: 17,
  },
  textUnderCheckBox: {
    fontSize: typography.b2.fontSize,
    fontFamily: typography.b2.fontFamily,
  },
  warningAboutRequired: {
    color: colors.error,
    marginTop: 1,
  },
});
