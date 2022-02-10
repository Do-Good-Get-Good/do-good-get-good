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
} from "react-native";
import Menu from "../components/Menu";
import { Icon, Overlay } from "react-native-elements";

import Images from "../Images";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

export function ActivityCard ({ route, navigation }) {
  const activityCardContext = useActivityCardContext();
  const createActivityContext = useCreateActivityFunction();
  //   information comes from Suggestion.js with navigation when user or admin press on activity
    const { admin, activityInfo, active, tgPopular } = route.params;
  const [activity, setActivity] = useState({
    active: "",
    title: "",
    photo: "",
    city: "",
    description: "",
    popular: "",
  });
  const [adminOpenedActyvity, setAdminOpenedActyvity] = useState(admin);

  const [activeActivities, setActiveActivities] = useState(active);
  const [popular, setPopular] = useState(tgPopular);
  const [visible, setVisible] = useState(false);

  const alertQuestionToTakeAwayFromArchive =
    "Vill du flytta denna aktivitet från arkiv";
  const alertClarificationToTakeAwayFromArchive =
    "[Aktiviteten kommer att flyttas från icke-aktiv till aktiv, i biblioteket]";
  const alertArchiveQuestion = "Vill du arkivera denna aktivitet?";
  const alertArchiveClarification =
    "[Aktiviteten kommer att sparas i en separat flik i menyn men kommer försvinna från galleriet]";
  const alertDeleteQuestion = "Vill du slänga denna aktivitet?";
  const alertDeleteClarification =
    "[Aktiviteten kommer att försvinna för alltid]";
  const [alertQuestion, setAlertQuestion] = useState("");
  const [alertClarification, setAlertClarification] = useState("");
  const [pressedToArchive, setPressedToArchive] = useState(false);
  const [pressedToTakeAwayFromArchive, setPressedToTakeAwayFromArchive] =
    useState(false);
  const [pressedToDelete, setPressedToDelete] = useState(false);
  const alertToArchiveActivity = () => {
    setVisible(!visible);
    setPressedToArchive(true);
    setPressedToTakeAwayFromArchive(false);
    setPressedToDelete(false);
    setAlertQuestion(alertArchiveQuestion);
    setAlertClarification(alertArchiveClarification);
  };

  const alertToTakeAwayFromArchiveActivity = () => {
    setVisible(!visible);
    setPressedToTakeAwayFromArchive(true);
    setPressedToArchive(false);
    setPressedToDelete(false);
    setAlertQuestion(alertQuestionToTakeAwayFromArchive);
    setAlertClarification(alertClarificationToTakeAwayFromArchive);
  };

  const alertToDeleteActivity = () => {
    setVisible(!visible);
    setPressedToDelete(true);
    setPressedToTakeAwayFromArchive(false);
    setPressedToArchive(false);
    setAlertQuestion(alertDeleteQuestion);
    setAlertClarification(alertDeleteClarification);
  };

  function buttonYesPressed() {
    setVisible(!visible);

    if (pressedToArchive === true) {
      if (activeActivities === true) {
        activityCardContext.changeActive(false);
        setActiveActivities(false);
      } else {
        console.log(
          "Something went wrong with YES button while trying to archive"
        );
      }
      activityCardContext.idActivity(activityInfo.id);
      createActivityContext.activityHasChangedID(activityInfo.id);
      setPressedToArchive(false);
    } else if (pressedToTakeAwayFromArchive === true) {
      if (activeActivities === false) {
        activityCardContext.changeActive(true);

        setActiveActivities(true);
      } else {
        console.log(
          "Something went wrong with YES button while trying to take activity away from archive"
        );
      }
      activityCardContext.idActivity(activityInfo.id);
      createActivityContext.activityHasChangedID(activityInfo.id);
      setPressedToTakeAwayFromArchive(false);
    } else if (pressedToDelete === true) {
      activityCardContext.idActivity(activityInfo.id);
      activityCardContext.confirmToDeleteActivity(true);

      setPressedToDelete(false);
      navigation.goBack();
    } else {
      console.log("Something went wrong with pressing Yes button");
    }
  }

  function alertForArchivingAndDelete() {
    return (
      <Overlay overlayStyle={styles.overlay} isVisible={visible}>
        <Text style={styles.textQuestionAlert}>{alertQuestion}</Text>
        <Text style={styles.textUnderQuestionAlert}>{alertClarification}</Text>
        <View style={styles.containerButtonsAlert}>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Text style={styles.buttonAlertNo}>Nej</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonYesPressed()}>
            <Text style={styles.buttonAlertYes}>Ja</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }

  useEffect(() => {
    setAdminOpenedActyvity(admin);
    setActivity({
      title: activityInfo.title,
      photo: activityInfo.photo,
      city: activityInfo.city,
      description: activityInfo.description,
    });
  }, [admin, activityInfo]);

  useEffect(() => {
    setActiveActivities(active);
  }, [active]);

  useEffect(() => {
    setPopular(tgPopular);
  }, [tgPopular]);

  function setTheRightPhoto(activityObjectPhoto) {
    for (let i = 0; i < Images.length; i++) {
      if (activityObjectPhoto === Images[i].name) {
        return Images[i].image;
      }
    }
  }

  function changePopularStatus() {
    if (popular === true) {
      setPopular(false);
      activityCardContext.changePopular(false);
      activityCardContext.idActivity(activityInfo.id);
      createActivityContext.activityHasChangedID(activityInfo.id);
    } else if (popular === false) {
      setPopular(true);
      activityCardContext.changePopular(true);
      activityCardContext.idActivity(activityInfo.id);
      createActivityContext.activityHasChangedID(activityInfo.id);
    } else {
      console.log("Something went wrong with status popular", popular);
    }
  }

  function deleteActivity() {
    return (
      <View style={styles.containerDeleteAndText}>
        <Icon
          style={styles.iconDelete}
          color="#333333"
          name="delete-outline"
          type="material-community"
          size={25}
        />

        <TouchableOpacity testID="alertToDeleteActivity" onPress={() => alertToDeleteActivity()}>
          <Text style={styles.textNearDelete}>Ta bort</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toArchiveOrToTakeAwayFromArchive() {
    if (activeActivities === false) {
      return (
        <View style={styles.containerIconArchiveArrowAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconArchiveArrow}
              color="#333333"
              name="archive-arrow-up-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID="alertToTakeAwayFromArchiveActivity"
            onPress={() => alertToTakeAwayFromArchiveActivity()}
          >
            <Text style={styles.textNearIconArchiveArrow}>
              Flytta från arkiv
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (activeActivities === true) {
      return (
        <View style={styles.containerIconArchiveArrowAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconArchiveArrow}
              color="#333333"
              name="archive-arrow-down-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity testID="alertToArchiveActivity"  onPress={() => alertToArchiveActivity()}>
            <Text style={styles.textNearIconArchiveArrow}>Arkivera</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      console.log("Something went wrong with toArchiveOrToTakeAwayFromArchive");
    }
  }

  useEffect(() => {
    toArchiveOrToTakeAwayFromArchive();
  }, [activeActivities]);

  function tgFavourite() {
    if (popular) {
      return (
        <View style={styles.containerIconStarAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconStar}
              color="#333333"
              name="star"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity testID="toNotFavorite" onPress={() => changePopularStatus()}>
            <Text style={styles.textNearIconStar}>Ta bort från TG-favoriter</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.containerIconStarAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconStar}
              color="#333333"
              name="star-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity testID="toFavorite" onPress={() => changePopularStatus()}>
         <Text style={styles.textNearIconStar}>Lägg till som TG-favorit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  function adminActionsForActiveActivities() {
    return (
      <View>
        <View style={styles.containerPancilAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconPencil}
              color="#333333"
              name="pencil-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textNearPencil}>Ändra</Text>
          </TouchableOpacity>
        </View>

        {toArchiveOrToTakeAwayFromArchive()}
        {deleteActivity()}
        {tgFavourite()}
        <TouchableOpacity>
          <Text style={styles.buttonSeeAllUsers}> Se alla användare</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function adminActionsForInactiveActivities() {
    return (
      <View style={{ marginTop: 15 }}>
        {toArchiveOrToTakeAwayFromArchive()}
        {deleteActivity()}
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerArrowAndText}>
            <Icon
              style={styles.arrowIcon}
              name="arrow-back"
              color="#333333"
              size={25}
            />
            <TouchableOpacity testID="buttonGoBack" onPress={() => navigation.goBack()}>
              <Text style={styles.textNearArrow}>Gå tillbaka</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textTitle}>{activity.title}</Text>
          <Image
          testID="photo"
            style={styles.image}
            source={setTheRightPhoto(activity.photo)}
          ></Image>
          <View style={styles.containerIconAndCity}>
            <Icon
              type="material-community"
              name="map-marker-outline"
              color="#333333"
              size={25}
            />
            <Text style={styles.textCity}>{activity.city}</Text>
          </View>
          <View style={styles.iconsAndTextTimeContainer}>
            <Icon
              type="material-community"
              name="information-outline"
              color="#333333"
              size={25}
            />
            <Text numberOfLines={2} style={styles.textDescription}>
              {activity.description}
            </Text>
          </View>
          {adminOpenedActyvity === true && activeActivities === true
            ? adminActionsForActiveActivities()
            : null}
          {adminOpenedActyvity === true && activeActivities === false
            ? adminActionsForInactiveActivities()
            : null}
        </View>
        <View style={styles.logo}>
          <Image
            source={require("../img/Technogarden-logotyp-Large.png")}
            style={{ width: 140, height: "55%" }}
          />
        </View>
        {alertForArchivingAndDelete()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  containerArrowAndText: {
    flex: 1,
    flexDirection: "row",
    marginLeft: -5,
    marginTop: 30,
  },
  arrowIcon: { flex: 1 },
  textNearArrow: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#333333",
    fontWeight: "bold",
  },
  textTitle: {
    flex: 1,
    fontSize: 34,
    color: "#333333",
    marginTop: 32,
  },
  image: {
    flex: 1,
    resizeMode: "contain",

    marginTop: 22,
    height: 98,
    width: 107,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "white",
  },
  textCity: {
    fontSize: 18,
    paddingTop: 5,
    marginLeft: 5,
    color: "#333333",
  },
  containerIconAndCity: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
    marginLeft: -3,
    color: "#333333",
  },
  textDescription: {
    flex: 1,
    fontSize: 18,
    paddingTop: 3,
    marginLeft: 3,
    color: "#333333",
  },

  iconsAndTextTimeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
    color: "#333333",
    marginLeft: -3,
  },
  containerPancilAndText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 37,
  },
  textNearPencil: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  iconPencil: {
    flex: 1,
    marginRight: 7,
  },
  containerIconArchiveArrowAndText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 23,
  },
  iconArchiveArrow: {
    flex: 1,
    marginRight: 7,
  },
  textNearIconArchiveArrow: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  containerDeleteAndText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 23,
  },
  iconDelete: { flex: 1, marginRight: 7 },

  textNearDelete: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  containerIconStarAndText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 23,
  },
  iconStar: {
    flex: 1,
    marginRight: 7,
  },
  textNearIconStar: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  buttonSeeAllUsers: {
    flex: 1,
    marginTop: 32,
    paddingVertical: 13,
    fontSize: 20,
    backgroundColor: "#84BD00",
    textAlign: "center",
    letterSpacing: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "#84BD00",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    width: "90%",
    marginBottom: 100,
    paddingBottom: 15,
  },

  textQuestionAlert: { color: "#333333", fontSize: 24, marginTop: 23 },
  textUnderQuestionAlert: { color: "#333333", fontSize: 16 },
  containerButtonsAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonAlertNo: {
    fontSize: 20,
    backgroundColor: "yellow",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 70,
    paddingVertical: 13,
    overflow: "hidden",
  },
  buttonAlertYes: {
    fontSize: 20,
    paddingHorizontal: 70,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "#84BD00",
    overflow: "hidden",
    paddingVertical: 13,
  },
  logo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    bottom: 0,
  },
});
