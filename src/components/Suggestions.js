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

import { useSuggestionFunction } from "../context/SuggestionContext";

export const Suggestions = ({
  navigation,
  search,
  adminGallery,
  chooseActive,
  inactiveActivities,
}) => {
  const rout = useRoute();
  const userSuggestionsContext = useSuggestionFunction();
  const [showArray, setShowArray] = useState([]);
  useEffect(() => {
    if (rout.name === "HomePage") {
      setShowArray(userSuggestionsContext.popularActivities);
    } else if (
      rout.name === "AdminActivityGallery" &&
      search.length === 0 &&
      chooseActive === false
    ) {
      setShowArray(adminGallery);
    } else if (
      rout.name === "AdminActivityGallery" &&
      search.length === 0 &&
      chooseActive === true
    ) {
      setShowArray(inactiveActivities);
    } else {
      console.log("Nothing to show in AdminGallery");
    }
  }, [userSuggestionsContext, adminGallery, rout, search, chooseActive]);

  function setTheRightPhoto(activityObjectPhoto) {
    for (let index = 0; index < Images.length; index++) {
      if (activityObjectPhoto === Images[index].name) {
        return Images[index].image;
      }
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AdminActivityGallery")}
      >
        <Text>click just ti try admin AdminActivityGallery</Text>
      </TouchableOpacity>

      <Text style={styles.topH1}>Förslag & inspiration</Text>

      <View style={styles.activityContainer}>
        {showArray.map((suggestion, index) => (
          <TouchableOpacity index={index} key={index}>
            <View style={styles.insideActivityContainer}>
              <View style={styles.photoAndText}>
                <View style={styles.textTitleCityDescriptipn}>
                  <Text numberOfLines={2} style={styles.textTitle}>
                    {suggestion.title}
                  </Text>

                  <View style={styles.iconsAndTextCityContainer}>
                    {/* <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginTop: 6,
                      paddingTop: suggestion.title.length > 16 ? 0 : 25,
                    }}
                  > */}
                    <Icon
                      type="material-community"
                      name="map-marker-outline"
                      color="#333333"
                      size={25}
                    />

                    {/* <Text
                      style={{
                        flex: 1,

                        // marginTop: 20,
                        fontSize: 18,
                        paddingTop: 5,
                        marginLeft: 12,
                        paddingTop: suggestion.title.length > 16 ? 0 : 25,
                      }}
                    >
                      {suggestion.city}
                    </Text> */}
                    <Text style={styles.textCity}>{suggestion.city}</Text>
                  </View>

                  <View style={styles.iconsAndTextTimeContainer}>
                    <Icon
                      type="material-community"
                      name="information-outline"
                      color="#333333"
                      size={25}
                    />
                    <Text numberOfLines={2} style={styles.textDescription}>
                      {suggestion.description}
                    </Text>
                  </View>
                </View>
                <Image
                  style={styles.image}
                  source={setTheRightPhoto(suggestion.photo)}
                />
              </View>

              <TouchableOpacity>
                <Text style={styles.textLäsMer}>Läs mer</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          // </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topH1: {
    flex: 1,
    fontSize: 25,
    color: "#333333",
    marginTop: 10,
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
    backgroundColor: "white",
    flexWrap: "wrap",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "white",
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
    color: "#333333",
  },

  textTitle: {
    flex: 2,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  textCity: {
    flex: 1,
    fontSize: 18,
    paddingTop: 5,
    marginLeft: 12,
  },

  textDescription: {
    flex: 1,
    fontSize: 18,
    paddingTop: 3,
    marginLeft: 12,
  },

  textLäsMer: {
    flex: 1,
    textDecorationLine: "underline",
    marginVertical: 10,
    marginHorizontal: 10,
    marginLeft: 200,
    color: "#333333",
    fontSize: 16,
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
