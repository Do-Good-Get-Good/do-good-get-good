import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { useNavigation } from "@react-navigation/native";

import { Icon } from "@rneui/base";

import BottomNavButtons from "./BottomNavButtons";

import { useCreateActivityFunction } from "../context/CreateActivityContext";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { setTheRightPhoto } from "../lib/images";
import { Format } from "../lib/enums/imageFormat";

export function LinkActivityToNewUser({
  activity,
  setActivity,
  selectedActivity,
  setSelectedActivity,
  goBack,
  createUserAndNewActivity,
  createUserAndLinkSelectedActivity,
}) {
  const navigation = useNavigation();
  const createActivityContext = useCreateActivityFunction();
  const { activeActivities } = createActivityContext;

  const [expanded, setExpanded] = useState(false);
  const [titleFilledUp, setTitleFilledUp] = useState(null);
  const [placeFilledUp, setPlaceFilledUp] = useState(null);
  const [cityFilledUp, setCityFilledUp] = useState(null);

  useEffect(() => {
    if (activity.title.trim() === "") {
      setTitleFilledUp(false);
    } else {
      setTitleFilledUp(true);
    }
  }, [activity.title]);

  useEffect(() => {
    if (activity.city.trim() === "") {
      setCityFilledUp(false);
    } else {
      setCityFilledUp(true);
    }
  }, [activity.city]);

  useEffect(() => {
    if (activity.place.trim() === "") {
      setPlaceFilledUp(false);
    } else {
      setPlaceFilledUp(true);
    }
  }, [activity.place]);

  function validateInputs() {
    if (titleFilledUp && cityFilledUp && placeFilledUp) return true;
    else return false;
  }

  titleCityPlaceStyle = function () {
    return {
      flex: 1,
      paddingVertical: 13,
      paddingLeft: 11,
      marginTop: 9,
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

  const createNewActivity = () => {
    return (
      <>
        <TextInput
          style={[titleCityPlaceStyle(), titleBorderStyle()]}
          maxLength={30}
          onChangeText={(text) => setActivity({ ...activity, title: text })}
          onEndEditing={() =>
            setActivity({
              ...activity,
              title: activity.title.trim(),
            })
          }
          value={activity.title}
          placeholder="Aktivitet"
          placeholderTextColor={colors.dark}
        />
        {!titleFilledUp && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[titleCityPlaceStyle(), cityBorderStyle()]}
          maxLength={30}
          onChangeText={(text) => setActivity({ ...activity, city: text })}
          onEndEditing={() =>
            setActivity({
              ...activity,
              city: activity.city.trim(),
            })
          }
          value={activity.city}
          placeholder="Var"
          placeholderTextColor={colors.dark}
        />
        {!cityFilledUp && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[titleCityPlaceStyle(), placeBorderStyle()]}
          maxLength={30}
          onChangeText={(text) => setActivity({ ...activity, place: text })}
          onEndEditing={() =>
            setActivity({
              ...activity,
              place: activity.place.trim(),
            })
          }
          value={activity.place}
          placeholder="Aktör"
          placeholderTextColor={colors.dark}
        />
        {!placeFilledUp && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[styles.textInputDescription, styles.shadow]}
          numberOfLines={5}
          multiline={true}
          onChangeText={(text) =>
            setActivity({ ...activity, description: text })
          }
          onEndEditing={() =>
            setActivity({
              ...activity,
              description: activity.description.trim(),
            })
          }
          value={activity.description}
          placeholder="Vad"
          placeholderTextColor={colors.dark}
        />
        <View style={styles.containerImageAndInsertButton}>
          <Image
            testID="photo"
            style={styles.image}
            source={setTheRightPhoto(activity, Format.square)}
          />

          <TouchableOpacity
            testID="navigateToImagesGallery"
            onPress={() =>
              navigation.navigate("ImagesGallery", {
                cameFrom: "CreateUser",
                selectedImage: activity.photo,
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
            onPress={() =>
              setActivity({ ...activity, favorite: !activity.favorite })
            }
          >
            {activity.favorite ? (
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
      </>
    );
  };

  const AddExistingActivity = () => {
    return (
      <View style={styles.containerCityPlaceDescription}>
        <Text style={styles.textCityPlace}>{selectedActivity.city}</Text>
        <Text style={styles.textCityPlace}>{selectedActivity.place}</Text>
        <Text style={styles.textDescription}>
          {selectedActivity.description}
        </Text>
        <View style={styles.containerImageAndInsertButton}>
          <Image
            style={styles.imageExistingActivity}
            source={setTheRightPhoto(selectedActivity, Format.square)}
          ></Image>

          <Text style={styles.textButtonChangeImage}>Byt bild</Text>
        </View>
      </View>
    );
  };

  function dropDownTitle() {
    if (selectedActivity !== null && selectedActivity !== "create-new") {
      return selectedActivity.title;
    } else if (selectedActivity === "create-new") {
      return "Skapa ny aktivitet";
    } else return "Välj aktivitet";
  }

  const DropDown = () => {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.dropdown,
            styles.shadow,
            { borderColor: expanded ? colors.dark : colors.background },
          ]}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.dropdownTitle}>{dropDownTitle()}</Text>
          <Icon
            color={colors.secondary}
            style={styles.sortIcon}
            name={expanded ? "arrow-drop-up" : "arrow-drop-down"}
            size={30}
          />
        </TouchableOpacity>
        {expanded && (
          <View
            style={{
              backgroundColor: colors.background,
              paddingHorizontal: 12,
            }}
          >
            <TouchableOpacity
              style={{ paddingVertical: 8 }}
              onPress={() => {
                setSelectedActivity("create-new");
                setTitleFilledUp(null);
                setCityFilledUp(null);
                setPlaceFilledUp(null);
                setExpanded(false);
              }}
            >
              <Text style={{ ...typography.b1, fontStyle: "italic" }}>
                Skapa ny aktivitet
              </Text>
            </TouchableOpacity>
            {activeActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={{ paddingVertical: 8 }}
                onPress={() => {
                  setSelectedActivity(activity);
                  setExpanded(false);
                }}
              >
                <Text style={{ ...typography.b1 }}>{activity.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  function existingActivity() {
    return selectedActivity !== "create-new" && selectedActivity !== null;
  }

  function validate() {
    if (existingActivity()) createUserAndLinkSelectedActivity();
    else {
      if (validateInputs()) createUserAndNewActivity();
    }
  }

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        keyboardDismissMode={"on-drag"}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <DropDown />
        {selectedActivity === "create-new" && createNewActivity()}
        {existingActivity() && <AddExistingActivity />}
      </ScrollView>
      <BottomNavButtons
        primaryText="Spara"
        secondaryText="Tillbaka"
        primaryFunc={validate}
        secondaryFunc={goBack}
      />
    </>
  );
}
export default LinkActivityToNewUser;

const styles = StyleSheet.create({
  dropdown: {
    maxHeight: 55,
    backgroundColor: colors.background,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownTitle: {
    fontFamily: typography.b1.fontFamily,
    fontSize: typography.b1.fontSize,
  },
  shadow: {
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
  containerCityPlaceDescription: {
    marginTop: 12,
  },
  textCityPlace: {
    flex: 1,
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    color: colors.dark,
    backgroundColor: colors.disabled,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.disabled,
    marginBottom: 13,
    padding: 12,
    overflow: "hidden",
  },
  textDescription: {
    flex: 1,
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    fontWeight: "500",
    color: colors.dark,
    backgroundColor: colors.disabled,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.disabled,
    marginBottom: 13,
    padding: 13,
    paddingBottom: 90,
    overflow: "hidden",
    marginTop: 20,
  },
  textButtonChangeImage: {
    flex: 1.5,
    ...typography.button.lg,
    fontWeight: "500",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.disabled,
    textAlign: "center",
    backgroundColor: colors.disabled,
    color: colors.dark,
    marginVertical: 30,
    paddingTop: Platform.OS === "ios" ? 12 : null,
    overflow: "hidden",
    letterSpacing: 2,
    height: 55,
    width: 200,
    textAlignVertical: "center",
  },
  imageExistingActivity: {
    resizeMode: "cover",
    marginRight: 80,
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  warningAboutRequired: {
    color: colors.error,
    marginTop: 1,
  },
});
