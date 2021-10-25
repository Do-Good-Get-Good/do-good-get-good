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
import { DropDownSmall } from "../components/DropDownSmall";
import Images from "../Images";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

export const CreateActivity = ({}) => {
  const createActivityContext = useCreateActivityFunction();
  const [whileCreatingNewUser, setWhileCreatingNewUser] = useState(true);
  const [existingActivity, setExistingActivity] = useState(true);
  const [checkBoxPressed, setCheckBoxPressed] = useState(false);
  const titleForNewActivity = "Lägg till aktivitet";
  const titleForNewActivityWithCreateNewUser = "Skapa aktivitet";
  const titleForExistingActivityWithCreateNewUser =
    "Lägg till aktivitet för användare";
  const [newActivity, setNewActivity] = useState({
    active_status: "true",
    activity_city: "",
    activity_description: "",
    activity_photo: "",
    activity_place: "",
    activity_title: "",
    tg_favorite: "false",
  });
  const [activityFromSelectionInDropDown, setActivityFromSelectionInDropDown] =
    useState([]);
  const placeholderAktivitet = ["Aktivitet", " [required]"];
  // const placeholderRequired = " ";
  console.log("createActivityContext inCREAC", createActivityContext);

  useEffect(() => {
    if (createActivityContext.sendChoiceFromDropDown === "Skapa ny aktivitet") {
      setExistingActivity(false);
    } else if (
      createActivityContext.sendChoiceFromDropDown != "Skapa ny aktivitet"
    ) {
      setExistingActivity(true);
    } else {
      console.log("Nothing selected in DropDown Menu");
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
            <DropDownSmall></DropDownSmall>
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

  function twoBottomButtonsForAllViews() {
    if (whileCreatingNewUser === true) {
      return (
        <View style={styles.containerForTwoBottomButtons}>
          <Text style={styles.buttonSave}>Spara</Text>
          <LinearGradient
            colors={["#84BD00", "#5B6770"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonBorderStyleButtonBackAndCancel}
          >
            <Text style={styles.buttonBack}>Tillbaka</Text>
          </LinearGradient>
        </View>
      );
    } else if (whileCreatingNewUser === false) {
      return (
        <View style={styles.containerForTwoBottomButtons}>
          <Text style={styles.buttonSave}>Spara</Text>
          <LinearGradient
            colors={["#84BD00", "#5B6770"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonBorderStyleButtonBackAndCancel}
          >
            <Text style={styles.buttonCancel}>Avbryt</Text>
          </LinearGradient>
        </View>
      );
    }
  }

  const viewCreateNewActivity = () => {
    return (
      <View style={styles.containerForAllInput}>
        <TextInput
          style={styles.textInputTitleCityPlace}
          numberOfLines={2}
          // onChangeText={setNewActivity.activity_title}
          value={newActivity.activity_title}
          // placeholder={placeholderAktivotet[0] + placeholderAktivotet[1]}
          placeholderTextColor="#333333"
          // placeholderTextColor={placeholderAktivotet[0] ? "black" : "gray"}
          // placeholderTextColor={placeholderAktivotet[1] ? "black" : "gray"}
          // placeHolderStyle={{

          // }}
        />
        <TextInput
          style={styles.textInputTitleCityPlace}
          numberOfLines={2}
          onChangeText={setNewActivity.activity_title}
          value={newActivity.activity_title}
          placeholder="Var [required]"
          placeholderTextColor="#333333"
          // placeholderTextColor={placeholderAktivotet[0] ? "black" : "gray"}
          // placeholderTextColor={placeholderAktivotet[1] ? "black" : "gray"}
          // placeHolderStyle={{

          // }}
        />
        <TextInput
          style={styles.textInputTitleCityPlace}
          numberOfLines={2}
          onChangeText={setNewActivity.activity_title}
          value={newActivity.activity_title}
          placeholderTextColor="#333333"
          // placeholder={placeholderAktivotet[0] + placeholderAktivotet[1]}

          // }}
        />
        <TextInput
          style={styles.textInputDescription}
          numberOfLines={2}
          onChangeText={setNewActivity.activity_title}
          value={newActivity.activity_title}
          // placeholder={placeholderAktivotet[0] + placeholderAktivotet[1]}
          placeholderTextColor="#333333"
        />
        <View style={styles.containerImageAndInsertButton}>
          <LinearGradient
            colors={["#84BD00", "#5B6770"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.imageBorderStyle}
          >
            <Image
              style={styles.image}
              source={require("../img/activities_images/symbol_hands_heart-DEFAULT.png")}
            ></Image>
          </LinearGradient>
          <TouchableOpacity>
            <LinearGradient
              colors={["#84BD00", "#5B6770"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonBorderStyle}
            >
              <Text style={styles.textButtonInsert}>Infoga</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.containerTextAndCheckbox}>
          <Text style={styles.textNearCheckBox}>Lägg till somTG-favorit</Text>
          <TouchableOpacity
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
        <Text>[TG-favoriter vissas för alla användare]</Text>
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
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.textMainTitle}>
              {chooseTitle()}
              <Text style={styles.numbersNearTitle}>
                {whileCreatingNewUser === true ? "   2/2" : null}
              </Text>
            </Text>
          </View>
        </View>

        {showDropDownMenyOrNot()}

        {gotChoiceFromDropDownOrCreateNewActivity()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 18,
  },
  textMainTitle: {
    flex: 3,
    fontSize: 34,
    marginBottom: 17,
    color: "#333333",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
  },
  numbersNearTitle: {
    flex: 1,
    fontSize: 18,
    marginTop: 15,
  },
  dropDown: {
    flex: 1,
    marginRight: 16,
    marginLeft: -3,
    // marginTop: 5,
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
  textInputTitleCityPlace: {
    flex: 1,
    paddingVertical: 13,
    paddingLeft: 11,
    marginTop: 13,
    fontSize: 18,

    // marginVertical: 16,
    backgroundColor: "white",

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
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
    flex: 1,
    paddingVertical: 13,
    paddingLeft: 11,
    marginTop: 13,
    fontSize: 18,

    marginBottom: 20,
    paddingBottom: 89,

    // marginVertical: 16,
    backgroundColor: "white",

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textButtonInsert: {
    flex: 1,
    letterSpacing: 2,
    backgroundColor: "#F5F5F5",
    marginVertical: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    textAlign: "center",
    paddingTop: 12,
    paddingHorizontal: 64,
    overflow: "hidden",
    fontSize: 20,
    color: "#333333",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    margin: 2,
    height: 98,
    backgroundColor: "white",
  },
  buttonBorderStyle: {
    borderRadius: 5,
    height: 55,
    width: 200,
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 25,
  },
  imageBorderStyle: {
    borderRadius: 5,
    height: 101,
    width: 120,

    alignItems: "center",
  },
  containerTextAndCheckbox: {
    flex: 1,
    marginTop: 20,
    marginBottom: 5,
    flexDirection: "row",
  },
  checkBoxTrue: {
    backgroundColor: "#84BD00",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333333",
  },
  checkBoxFalse: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#5B6770",
    backgroundColor: "white",
  },
  textNearCheckBox: {
    marginRight: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 17,
  },
  containerCityPlaceDescription: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 12,
  },
  textCityPlace: {
    flex: 1,
    fontSize: 18,
    color: "#333333",
    backgroundColor: "#B7B7B7",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#B7B7B7",
    marginBottom: 13,
    padding: 13,
    overflow: "hidden",
  },
  textDescription: {
    flex: 1,
    fontSize: 18,
    color: "#333333",
    backgroundColor: "#B7B7B7",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#B7B7B7",
    marginBottom: 13,
    padding: 13,
    paddingBottom: 90,
    overflow: "hidden",
    marginTop: 20,
  },
  textButtonChangeImage: {
    flex: 1.5,
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#B7B7B7",
    textAlign: "center",
    backgroundColor: "#B7B7B7",
    color: "#7C7C7C",
    marginVertical: 30,
    paddingTop: 12,
    overflow: "hidden",
    letterSpacing: 2,
  },
  imageExistingActivity: {
    flex: 1,
    resizeMode: "contain",
    marginRight: 80,
    marginTop: 10,
    height: 98,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "white",
  },
  containerForTwoBottomButtons: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonSave: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "#84BD00",
    overflow: "hidden",
    paddingVertical: 13,
  },

  buttonBack: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 2,
    paddingVertical: 12,
    paddingHorizontal: 148,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    overflow: "hidden",
  },
  buttonCancel: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 2,
    paddingVertical: 12,
    paddingHorizontal: 155,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    overflow: "hidden",
  },
  buttonBorderStyleButtonBackAndCancel: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,

    // height: 101,
    // width: 120,
    // paddingHorizontal: 4,
    alignItems: "center",
    // justifyContent: "center",
  },
});
