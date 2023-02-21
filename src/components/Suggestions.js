import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import { Icon } from "react-native-elements";
import Images from "../Images";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

export function Suggestions({
  navigation,
  adminGallery,
  inactiveActivities,
  choiceFromDropDown,
}) {
  const useCreateActivityContext = useCreateActivityFunction();
  const activityCardContext = useActivityCardContext();
  const adminGalleryContext = useAdminGalleryFunction();

  const [showArray, setShowArray] = useState([]);
  const [showActiveArray, setShowActiveArray] = useState(true);

  useEffect(() => {
    setShowActiveArray(adminGalleryContext.activeOrInactiveActivity);
  }, [adminGalleryContext.activeOrInactiveActivity]);

  useEffect(() => {
    if (showActiveArray === false) {
      setShowArray(sortingByTitle(inactiveActivities));
    } else if (showActiveArray === true) {
      setShowArray(sortingByTitle(adminGallery));
    }
  }, [adminGallery, inactiveActivities, showActiveArray]);

  function setTheRightPhoto(activityObjectPhoto) {
    for (let index = 0; index < Images.length; index++) {
      if (activityObjectPhoto === Images[index].name) {
        return Images[index].image;
      }
    }
  }

  function lookDetails(activety, statusActive, statusPopular) {
    Keyboard.dismiss();
    navigation.navigate("ActivityCard", {
      admin: true,
      activityInfo: activety,
      active: statusActive,
      tgPopular: statusPopular,
    });
  }

  useEffect(() => {
    const deleteObjectFromArray = () => {
      if (
        activityCardContext.oneActivityHasBeenDeleted === true &&
        activityCardContext.idOfTheActivityWhichHasBeenDeleted != ""
      ) {
        let newArray = showArray;
        var index = newArray.findIndex(
          (x) => x.id === activityCardContext.idOfTheActivityWhichHasBeenDeleted
        );
        newArray.splice(index, 1);
        setShowArray(sortingByTitle(newArray));
        activityCardContext.confirmToDeleteActivity(false);
      }
    };
    deleteObjectFromArray();
  }, [activityCardContext.oneActivityHasBeenDeleted]);

  useEffect(() => {
    if (useCreateActivityContext.updateGallery === true) {
      const replaceObjectIfpopularStatusChanged = () => {
        let newArray = showArray;
        var index = newArray.findIndex(
          (x) => x.id === useCreateActivityContext.changedActivity.id
        );
        newArray.splice(index, 1, useCreateActivityContext.changedActivity);
        setShowArray(sortingByTitle(newArray));
        activityCardContext.changePopularStatusInAdminGallery(false);
        useCreateActivityContext.setUpdateGallery(false);
      };
      replaceObjectIfpopularStatusChanged();
    }
  }, [useCreateActivityContext.updateGallery]);

  const showArrayAfterSorting = useCallback(() => {
    let sortArray = [];
    if (choiceFromDropDown === "Favoriter") {
      sortArray = showArray.sort(
        (a, b) => Number(b.popular) - Number(a.popular)
      );
    } else if (choiceFromDropDown === "Namn") {
      sortArray = sortingByTitle(showArray);
    } else if (choiceFromDropDown === "Plats") {
      sortArray = showArray.sort((a, b) => a.city.localeCompare(b.city));
    } else {
      sortArray = null;
    }

    return sortArray;
  }, [choiceFromDropDown, showArray]);

  function sortingByTitle(arrayToSort) {
    return arrayToSort.sort((a, b) => a.title.localeCompare(b.title));
  }

  function viewToShow(suggestion, index, id) {
    return (
      <View index={index} key={id}>
        <TouchableOpacity
          testID="lookDetails"
          onPress={() =>
            lookDetails(suggestion, suggestion.active, suggestion.popular)
          }
          style={styles.insideActivityContainer}
          activeOpacity={0.4}
        >
          <View style={styles.photoAndText}>
            <View style={styles.textTitleCityDescriptipn}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={2} style={styles.textTitle}>
                    {suggestion.title}
                  </Text>

                  <View style={styles.iconsAndTextCityContainer}>
                    <Icon
                      type="material-community"
                      name="map-marker-outline"
                      color={colors.dark}
                      size={25}
                    />

                    <Text style={styles.textCity}>{suggestion.city}</Text>
                  </View>
                </View>
                <Image
                  testID="photo"
                  style={styles.image}
                  source={setTheRightPhoto(suggestion.photo)}
                />
              </View>

              <View style={styles.iconsAndTextDescriptionContainer}>
                <Icon
                  type="material-community"
                  name="information-outline"
                  color={colors.dark}
                  size={25}
                  style={styles.iconDescription}
                />
                <Text numberOfLines={2} style={styles.textDescription}>
                  {suggestion.description}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function whichArrayToShow() {
    let viewArray = [];
    if (showArray.length > 0 && showArrayAfterSorting() === null) {
      viewArray = showArray;
    } else if (showArrayAfterSorting() != null) {
      viewArray = showArrayAfterSorting();
    }
    return (
      <View style={styles.activityContainer}>
        {viewArray.map((suggestion, index) =>
          viewToShow(suggestion, index, suggestion.id + index)
        )}
      </View>
    );
  }

  return (
    <>
      {(useCreateActivityContext.searchWordHasNoMatch ||
        adminGalleryContext.searchWordHasNoMatch) && (
        <Text style={styles.testNoMatchInSearBar}>
          Din sökning gav inga resultat.
        </Text>
      )}
      {whichArrayToShow()}
    </>
  );
}
export default Suggestions;

const styles = StyleSheet.create({
  testNoMatchInSearBar: {
    ...typography.b2,
    textAlign: "center",
    marginVertical: 20,
    color: colors.dark,
  },
  activityContainer: {
    flex: 1,
    marginTop: 5,
    alignSelf: "center",
    width: "99%",
  },
  insideActivityContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 7,
    backgroundColor: colors.background,
    flexWrap: "wrap",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.background,
    ...Platform.select({
      ios: {
        shadowOffset: {
          hight: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  image: {
    flex: 0.5,
    height: 100,
    resizeMode: "contain",
    alignItems: "center",
    marginHorizontal: 1,
    marginTop: 2,
    borderRadius: 5,
  },
  photoAndText: {
    flex: 1,
    flexDirection: "row",
  },
  textTitleCityDescriptipn: {
    flex: 2,
    marginRight: 7,
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 5,
    color: colors.dark,
  },
  textTitle: {
    ...typography.cardTitle,
    paddingTop: 3,
    color: colors.dark,
    height: 65,
  },
  textCity: {
    flex: 1,
    ...typography.b1,
    paddingTop: 5,
    marginLeft: 12,
  },
  iconsAndTextCityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textDescription: {
    flex: 1,
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    paddingVertical: 1.5,
    marginLeft: 12,
  },
  iconsAndTextDescriptionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 60,
  },
});
