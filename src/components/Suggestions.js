import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import Images from "../Images";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { useSuggestionFunction } from "../context/SuggestionContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

export function Suggestions({ navigation, adminGallery, inactiveActivities }) {
  const rout = useRoute();
  const userSuggestionsContext = useSuggestionFunction();
  const useCreateActivityContext = useCreateActivityFunction();
  const activityCardContext = useActivityCardContext();

  const adminGalleryContext = useAdminGalleryFunction();
  const [showArray, setShowArray] = useState([]);

  const [showActiveArray, setShowActiveArray] = useState(true);

  useEffect(() => {
    setShowActiveArray(adminGalleryContext.activeOrInactiveActivity);
  }, [adminGalleryContext.activeOrInactiveActivity]);

  useEffect(() => {
    if (rout.name === "HomePage") {
      setShowArray(userSuggestionsContext.popularActivities);
    } else if (
      rout.name === "AdminActivityGallery" &&
      showActiveArray === false
    ) {
      setShowArray(inactiveActivities);
    } else if (
      rout.name === "AdminActivityGallery" &&
      showActiveArray === true
    ) {
      setShowArray(adminGallery);
    } else {
      console.log("Nothing to show in AdminGallery");
    }
  }, [
    userSuggestionsContext,
    adminGallery,
    rout,
    inactiveActivities,
    showActiveArray,
  ]);

  function setTheRightPhoto(activityObjectPhoto) {
    for (let index = 0; index < Images.length; index++) {
      if (activityObjectPhoto === Images[index].name) {
        return Images[index].image;
      }
    }
  }

  function lookDetails(activety, statusActive, statusPopular) {
    rout.name === "HomePage"
      ? navigation.navigate("ActivityCard", {
          admin: false,
          activityInfo: activety,
          active: statusActive,
          tgPopular: statusPopular,
        })
      : navigation.navigate("ActivityCard", {
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
        setShowArray(newArray);
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
        setShowArray(newArray);
        activityCardContext.changePopularStatusInAdminGallery(false);
        useCreateActivityContext.setUpdateGallery(false);
      };
      replaceObjectIfpopularStatusChanged();
    }
  }, [useCreateActivityContext.updateGallery]);

  return (
    <View>
      <View>
        {(useCreateActivityContext.searchWordHasNoMatch ||
          adminGalleryContext.searchWordHasNoMatch) && (
          <Text style={styles.testNoMatchInSearBar}>Inga resultat</Text>
        )}
      </View>

      <View style={styles.activityContainer}>
        {showArray.length > 0 &&
          showArray.map((suggestion, index) => (
            <TouchableOpacity
              testID="lookDetails"
              onPress={() =>
                lookDetails(suggestion, suggestion.active, suggestion.popular)
              }
              index={index}
              key={index}
            >
              <View style={styles.insideActivityContainer}>
                <View style={styles.photoAndText}>
                  <View style={styles.textTitleCityDescriptipn}>
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

                    <View style={styles.iconsAndTextTimeContainer}>
                      <Icon
                        type="material-community"
                        name="information-outline"
                        color={colors.dark}
                        size={25}
                      />
                      <Text numberOfLines={2} style={styles.textDescription}>
                        {suggestion.description}
                      </Text>
                    </View>
                  </View>
                  <Image
                    testID="photo"
                    style={styles.image}
                    source={setTheRightPhoto(suggestion.photo)}
                  />
                </View>

                <TouchableOpacity
                  testID="lookDetails2"
                  onPress={() =>
                    lookDetails(
                      suggestion,
                      suggestion.active,
                      suggestion.popular
                    )
                  }
                >
                  <Text style={styles.textLäsMer}>Läs mer</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}
export default Suggestions;

const styles = StyleSheet.create({
  topH1: {
    ...typography.title,
    flex: 1,
    color: colors.dark,
    marginTop: 10,
  },

  testNoMatchInSearBar: {
    ...typography.title,
    textAlign: "center",
    marginTop: 20,
    color: colors.disabled,
  },

  activityContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
  },
  insideActivityContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 7,
    backgroundColor: colors.background,
    flexWrap: "wrap",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.background,
    ...Platform.select({
      ios: {
        shadowOffset: {
          hight: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    flex: 1,
    height: 100,
    resizeMode: "contain",
    alignItems: "center",
    marginRight: 12,
    marginTop: 10,
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
    marginTop: 11,
    color: colors.dark,
  },

  textTitle: {
    flex: 2,
    ...typography.title,
    color: colors.dark,
  },
  textCity: {
    flex: 1,
    ...typography.b1,
    paddingTop: 5,
    marginLeft: 12,
  },

  textDescription: {
    flex: 1,
    ...typography.b1,
    paddingTop: 3,
    marginLeft: 12,
  },

  textLäsMer: {
    flex: 1,
    textDecorationLine: "underline",
    marginVertical: 10,
    marginHorizontal: 10,
    marginLeft: 200,
    color: colors.dark,
    ...typography.b2,
    textAlign: "right",
  },

  iconsAndTextTimeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
  },
  iconsAndTextCityContainer: {
    marginTop: 25,
    flex: 1,
    flexDirection: "row",
  },
});
