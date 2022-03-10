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

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import BottomLogo from "../components/BottomLogo";

export function ActivityCard({ route, navigation }) {
  const activityCardContext = useActivityCardContext();
  const createActivityContext = useCreateActivityFunction();

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
      createActivityContext.activityHasChangedID({
        activityInfo: activityInfo,

        popular: activityInfo.popular,
        statusActive: false,
      });
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
      createActivityContext.activityHasChangedID({
        activityInfo: activityInfo,

        popular: activityInfo.popular,
        statusActive: true,
      });
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
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={visible}
        onBackdropPress={() => setVisible(!visible)}
      >
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
      id: activityInfo.id,
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
      createActivityContext.activityHasChangedID({
        activityInfo: activityInfo,
        popular: false,
        statusActive: activityInfo.active,
      });
    } else if (popular === false) {
      setPopular(true);
      activityCardContext.changePopular(true);
      activityCardContext.idActivity(activityInfo.id);
      createActivityContext.activityHasChangedID({
        activityInfo: activityInfo,
        popular: true,
        statusActive: activityInfo.active,
      });
    } else {
      console.log("Something went wrong with status popular");
    }
  }

  function deleteActivity() {
    return (
      <View style={styles.containerDeleteAndText}>
        <Icon
          style={styles.iconDelete}
          color={colors.dark}
          name="delete-outline"
          type="material-community"
          size={25}
        />

        <TouchableOpacity
          testID="alertToDeleteActivity"
          onPress={() => alertToDeleteActivity()}
        >
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
              color={colors.dark}
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
              color={colors.dark}
              name="archive-arrow-down-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID="alertToArchiveActivity"
            onPress={() => alertToArchiveActivity()}
          >
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
              color={colors.dark}
              name="star"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID="toNotFavorite"
            onPress={() => changePopularStatus()}
          >
            <Text style={styles.textNearIconStar}>
              Ta bort från TG-favoriter
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.containerIconStarAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconStar}
              color={colors.dark}
              name="star-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID="toFavorite"
            onPress={() => changePopularStatus()}
          >
            <Text style={styles.textNearIconStar}>
              Lägg till som TG-favorit
            </Text>
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
              color={colors.dark}
              name="pencil-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChangeActivity", {
                activity: activityInfo,
                tgPopular: popular,
              })
            }
          >
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
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, marginBottom: 20 }}>
          <View style={styles.containerArrowAndText}>
            <TouchableOpacity
              testID="buttonGoBack"
              onPress={() => navigation.goBack()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Icon name="arrow-back" color={colors.dark} size={25} />
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
              color={colors.dark}
              size={25}
            />
            <Text style={styles.textCity}>{activity.city}</Text>
          </View>
          <View style={styles.iconsAndTextTimeContainer}>
            <Icon
              type="material-community"
              name="information-outline"
              color={colors.dark}
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
          {alertForArchivingAndDelete()}
        </View>
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ActivityCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingHorizontal: 16,
  },
  containerArrowAndText: {
    flexDirection: "row",
    marginLeft: -5,
    marginTop: 30,
  },
  textNearArrow: {
    fontFamily: typography.button.sm.fontFamily,
    fontSize: typography.button.sm.fontSize,
    fontWeight: "700",
    textDecorationLine: "underline",
    color: colors.dark,
    marginLeft: 8,
  },
  textTitle: {
    ...typography.h2,
    color: colors.dark,
    marginTop: 32,
  },
  image: {
    resizeMode: "contain",
    marginTop: 22,
    height: 98,
    width: 107,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  textCity: {
    flex: 1,
    ...typography.b1,
    marginLeft: 5,
    color: colors.dark,
  },
  containerIconAndCity: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    color: colors.dark,
  },
  textDescription: {
    flex: 1,
    ...typography.b2,
    marginLeft: 5,
    color: colors.dark,
  },
  iconsAndTextTimeContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 6,
    color: colors.dark,
  },
  containerPancilAndText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  textNearPencil: {
    color: colors.dark,
    ...typography.button.sm,
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  iconPencil: {
    marginRight: 7,
  },
  containerIconArchiveArrowAndText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 23,
  },
  iconArchiveArrow: {
    marginRight: 7,
  },
  textNearIconArchiveArrow: {
    color: colors.dark,
    ...typography.button.sm,
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  containerDeleteAndText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 23,
  },
  iconDelete: {
    marginRight: 7,
  },
  textNearDelete: {
    color: colors.dark,
    ...typography.button.sm,
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  containerIconStarAndText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 23,
  },
  iconStar: {
    marginRight: 7,
  },
  textNearIconStar: {
    color: colors.dark,
    ...typography.button.sm,
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  buttonSeeAllUsers: {
    marginTop: 32,
    ...typography.button.lg,
    fontWeight: "500",
    paddingVertical: 16,
    backgroundColor: colors.primary,
    textAlign: "center",
    letterSpacing: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: colors.light,
    borderRadius: 5,
    width: "90%",
    paddingBottom: 15,
  },
  textQuestionAlert: {
    color: colors.dark,
    fontSize: 24,
    marginTop: 23,
  },
  textUnderQuestionAlert: {
    color: "#333333",
    fontSize: 16,
  },
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
});
