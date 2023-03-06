import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import { Icon } from "@rneui/base";
import Images from "../Images";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

const HomeSuggestions = ({ navigation, suggestions }) => {
  const showArray = sortingByTitle(suggestions);

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
      admin: false,
      activityInfo: activety,
      active: statusActive,
      tgPopular: statusPopular,
    });
  }

  function sortingByTitle(arrayToSort) {
    return arrayToSort.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <View style={styles.activityContainer}>
      {showArray.map((suggestion) => (
        <View key={suggestion.id}>
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
      ))}
    </View>
  );
};
export default HomeSuggestions;

const styles = StyleSheet.create({
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
