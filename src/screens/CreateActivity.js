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
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import { Icon, Dialog } from "react-native-elements";
import DropDownSmall from "../components/DropDownSmall";
import Images from "../Images";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useAdminHomePageFunction } from "../context/AdminHomePageContext";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import functions from "@react-native-firebase/functions";

export function CreateActivity({ route, navigation }) {
  const createActivityContext = useCreateActivityFunction();
  const { creatingNewUser, activityExist, newUserInfo } = route.params;

  const [whileCreatingNewUser, setWhileCreatingNewUser] =
    useState(creatingNewUser);
  const [existingActivity, setExistingActivity] = useState(activityExist);
  const [checkBoxPressed, setCheckBoxPressed] = useState(false);
  const titleForNewActivity = "Lägg till aktivitet";
  const titleForNewActivityWithCreateNewUser = "Skapa aktivitet";
  const titleForExistingActivityWithCreateNewUser =
    "Lägg till aktivitet för användare";
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [city, setCity] = useState("");
  const [titleFilledUp, setTitleFilledUp] = useState(null);
  const [placeFilledUp, setPlaceFilledUp] = useState(null);
  const [cityFilledUp, setCityFilledUp] = useState(null);
  const [description, setDescription] = useState("");
  const [newActivityImage, setNewActivityImage] = useState();
  const [createNewUser, setCreatNewUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activityFromSelectionInDropDown, setActivityFromSelectionInDropDown] =
    useState([]);

  const newUserAdded = useAdminHomePageFunction().newUserAdded;

  useEffect(() => {
    if (newUserInfo != null) {
      setCreatNewUser({
        firstName: newUserInfo.first_name,
        lastName: newUserInfo.last_name,
        email: newUserInfo.email,
        password: newUserInfo.password,
      });
    }
  }, [newUserInfo]);

  useEffect(() => {
    if (route.params?.imageForActivity === undefined) {
      setNewActivityImage("symbol_hands_heart-DEFAULT");
    } else {
      setNewActivityImage(route.params?.imageForActivity);
    }
  }, [route.params?.imageForActivity]);

  function setImageForNewActivity() {
    for (let index = 0; index < Images.length; index++) {
      if (newActivityImage === Images[index].name) {
        return Images[index].image;
      }
    }
  }

  useEffect(() => {
    if (creatingNewUser === true) {
      if (
        createActivityContext.sendChoiceFromDropDown === "Skapa ny aktivitet"
      ) {
        setExistingActivity(false);
      } else if (
        createActivityContext.sendChoiceFromDropDown != "Skapa ny aktivitet"
      ) {
        setExistingActivity(true);
      } else {
        console.log("Nothing selected in DropDown Menu");
      }
    }
  }, [createActivityContext.sendChoiceFromDropDown]);

  function chooseTitle() {
    if (existingActivity === false && whileCreatingNewUser === false) {
      return titleForNewActivity;
    } else if (existingActivity === false && whileCreatingNewUser === true) {
      return titleForNewActivityWithCreateNewUser;
    } else {
      return titleForExistingActivityWithCreateNewUser;
    }
  }

  function showDropDownMenyOrNot() {
    if (whileCreatingNewUser === true) {
      return (
        <View>
          <View style={styles.dropDown}>
            <DropDownSmall />
          </View>
        </View>
      );
    }
  }
  useEffect(() => {
    if (createActivityContext.sendChoiceFromDropDown != "Skapa ny aktivitet") {
      const searchingObjectWithSelectionFromDropDown =
        createActivityContext.activeActivities.filter(
          (object) =>
            object.title === createActivityContext.sendChoiceFromDropDown
        );
      setActivityFromSelectionInDropDown(
        searchingObjectWithSelectionFromDropDown
      );
    }
  }, [createActivityContext.sendChoiceFromDropDown]);

  function setTheRightPhoto(activityObjectPhoto) {
    for (let index = 0; index < Images.length; index++) {
      if (activityObjectPhoto === Images[index].name) {
        return Images[index].image;
      }
    }
  }

  async function linkChoosenActivityToNewUser() {
    if (createNewUser != null) {
      var createUser = functions().httpsCallable("createUser");
      await createUser({
        firstName: createNewUser.firstName,
        lastName: createNewUser.lastName,
        email: createNewUser.email,
        password: createNewUser.password,
        role: "user",
        activityId: activityFromSelectionInDropDown[0].id,
      }).then((res) => {
        let newUser = res.data.createdUser;
        console.log("New User: ", newUser);

        // Save new user locally
        newUserAdded(newUser);

        setLoading(false);
        navigation.navigate("HomePage");
      });
    } else {
      console.log("ingen ny användare");
    }
  }

  function sendNewActivityToCreateActivityContext() {
    if (
      title != " " &&
      city != " " &&
      place != " " &&
      title.trim() &&
      city.trim() &&
      place.trim()
    ) {
      let newActivityAndUser;
      if (createNewUser != null) {
        newActivityAndUser = {
          active_status: true,
          activity_city: city,
          activity_description: description,
          activity_photo: newActivityImage,
          activity_place: place,
          activity_title: title,
          tg_favorite: checkBoxPressed,
          newUserInfo: createNewUser,
        };
      } else {
        newActivityAndUser = {
          active_status: true,
          activity_city: city,
          activity_description: description,
          activity_photo: newActivityImage,
          activity_place: place,
          activity_title: title,
          tg_favorite: checkBoxPressed,
        };
      }
      createActivityContext
        .createNewActivityAndUser(newActivityAndUser)
        .then(() => {
          setLoading(false);
          navigation.navigate("HomePage");
        });

      setTitle("");
      setPlace("");
      setCity("");
      setDescription("");
      setCheckBoxPressed(false);
    }

    if (title != " " && title.trim()) {
      setTitleFilledUp(true);
    } else {
      setTitleFilledUp(false);
    }

    if (city != " " && city.trim()) {
      setCityFilledUp(true);
    } else {
      setCityFilledUp(false);
    }

    if (place != " " && place.trim()) {
      setPlaceFilledUp(true);
    } else {
      setPlaceFilledUp(false);
    }
  }

  function twoBottomButtonsForAllViews() {
    if (whileCreatingNewUser === true) {
      return (
        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity
            testID="sendNewActivityToCreateActivityContext"
            onPress={() => {
              setLoading(true);
              if (
                createActivityContext.sendChoiceFromDropDown !=
                  "Skapa ny aktivitet" &&
                whileCreatingNewUser === true
              ) {
                linkChoosenActivityToNewUser();
              } else sendNewActivityToCreateActivityContext();
            }}
          >
            {loading ? (
              <Dialog.Loading
                loadingProps={{
                  color: colors.secondary,
                  style: [styles.buttonSave, { width: "100%" }],
                }}
              />
            ) : (
              <Text style={styles.buttonSave}>Spara</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            testID="goBackButton"
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonBorderStyleButtonBackAndCancel}
            >
              <Text style={styles.buttonBack}>Tillbaka</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    } else if (whileCreatingNewUser === false) {
      return (
        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity
            testID="Save button"
            onPress={() => sendNewActivityToCreateActivityContext()}
          >
            <Text style={styles.buttonSave}>Spara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
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
      );
    }
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

  const viewCreateNewActivity = () => {
    return (
      <View style={styles.containerForAllInput}>
        <TextInput
          style={[titleCityPlaceStyle(), titleBorderStyle()]}
          maxLength={30}
          onChangeText={setTitle}
          value={title}
          placeholder="Aktivitet"
          placeholderTextColor={colors.dark}
        />
        {titleFilledUp === false ? (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        ) : null}
        <TextInput
          style={[titleCityPlaceStyle(), placeBorderStyle()]}
          maxLength={30}
          onChangeText={setCity}
          value={city}
          placeholder="Var"
          placeholderTextColor={colors.dark}
        />
        {placeFilledUp === false ? (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        ) : null}
        <TextInput
          style={[titleCityPlaceStyle(), cityBorderStyle()]}
          maxLength={30}
          onChangeText={setPlace}
          value={place}
          placeholder="Aktör"
          placeholderTextColor={colors.dark}
        />
        {cityFilledUp === false ? (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        ) : null}
        <TextInput
          style={styles.textInputDescription}
          numberOfLines={5}
          multiline={true}
          onChangeText={setDescription}
          value={description}
          placeholder="Vad"
          placeholderTextColor={colors.dark}
        />
        <View style={styles.containerImageAndInsertButton}>
          <Image
            testID="photo"
            style={styles.image}
            source={setImageForNewActivity()}
          />

          <TouchableOpacity
            testID="navigateToImagesGallery"
            onPress={() =>
              navigation.navigate("ImagesGallery", {
                cameFrom: "CreateActivity",
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
        {twoBottomButtonsForAllViews()}
      </View>
    );
  };

  function viewAddExistingActivityToTheUser() {
    if (activityFromSelectionInDropDown.length != 0) {
      return (
        <View style={styles.containerCityPlaceDescription}>
          <Text style={styles.textCityPlace}>
            {activityFromSelectionInDropDown[0].city}
          </Text>
          <Text style={styles.textCityPlace}>
            {activityFromSelectionInDropDown[0].place}
          </Text>
          <Text style={styles.textDescription}>
            {activityFromSelectionInDropDown[0].description}
          </Text>
          <View style={styles.containerImageAndInsertButton}>
            <Image
              style={styles.imageExistingActivity}
              source={setTheRightPhoto(
                activityFromSelectionInDropDown[0].photo
              )}
            ></Image>

            <Text style={styles.textButtonChangeImage}>Byt bild</Text>
          </View>
          {twoBottomButtonsForAllViews()}
        </View>
      );
    }
  }

  function gotChoiceFromDropDownOrCreateNewActivity() {
    if (
      (createActivityContext.sendChoiceFromDropDown === "Skapa ny aktivitet" &&
        whileCreatingNewUser === true) ||
      whileCreatingNewUser === false
    ) {
      return <>{viewCreateNewActivity()}</>;
    } else if (
      createActivityContext.sendChoiceFromDropDown != "Skapa ny aktivitet" &&
      whileCreatingNewUser === true
    ) {
      return <>{viewAddExistingActivityToTheUser()}</>;
    } else {
      console.log("Something went wrong");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textMainTitle}>{chooseTitle()}</Text>
          <Text style={styles.numbersNearTitle}>
            {whileCreatingNewUser === true ? "2/2" : null}
          </Text>
        </View>

        {showDropDownMenyOrNot()}

        {gotChoiceFromDropDownOrCreateNewActivity()}
      </ScrollView>
    </SafeAreaView>
  );
}
export default CreateActivity;

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
  numbersNearTitle: {
    ...typography.b1,
  },
  dropDown: {
    flex: 1,
    marginRight: 16,
    marginLeft: -3,
    marginBottom: 1,

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
  containerForAllInput: {
    marginHorizontal: 16,
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
    resizeMode: "contain",
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
    flex: 1,
    marginHorizontal: 16,
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
    padding: 13,
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
    flex: 1,
    resizeMode: "contain",
    marginRight: 80,
    marginTop: 10,
    height: 98,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  containerForTwoBottomButtons: {
    marginTop: 30,
    marginBottom: 16,
  },
  buttonSave: {
    ...typography.button.lg,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    overflow: "hidden",
    height: 55,
    paddingTop: Platform.OS === "ios" ? 12 : null,
    color: colors.dark,
  },

  buttonBack: {
    ...typography.button.lg,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 2,
    height: 55,
    width: "100%",
    backgroundColor: colors.light,
    borderRadius: 5,
    overflow: "hidden",
    paddingTop: Platform.OS === "ios" ? 12 : null,
    color: colors.dark,
  },
  buttonCancel: {
    ...typography.button.lg,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 2,
    height: 55,
    width: "100%",
    backgroundColor: colors.light,
    borderRadius: 5,
    overflow: "hidden",
    paddingTop: Platform.OS === "ios" ? 12 : null,
    color: colors.dark,
  },
  buttonBorderStyleButtonBackAndCancel: {
    flex: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
    alignItems: "center",
  },
  warningAboutRequired: {
    color: colors.error,
    marginTop: 1,
  },
});
