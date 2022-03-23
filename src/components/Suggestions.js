import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [existNewChanges, setExistNewChanges] = useState(false);
  const [showActiveArray, setShowActiveArray] = useState(true);
  const titleRef = useRef();

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
    setExistNewChanges(true);
  }, [useCreateActivityContext.changedActivity.active]);

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

  ///////////////////////////////////

  const [size, setSize] = useState(null);

  // const onLayout = useCallback((event) => {
  //   const { width, height } = event.nativeEvent.layout;
  //   setSize({ width, height });
  // }, []);
  // console.log("size   ", size);

  // const [amountOfLinesTitle, setAmountOfLinesTitle] = useState({
  //   amount: 0,
  //   text: [],
  // });
  const [amountOfLinesTitle, setAmountOfLinesTitle] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);

  const callBackAmount = useCallback(() => {}, []);

  const onTextLayout = useCallback((e) => {
    console.log("CA amountOfLinesTitle ", amountOfLinesTitle);
    setAmountOfLinesTitle(e.nativeEvent.lines.length);
    //setAmountOfLinesTitle((prev) => [...prev, e.nativeEvent.lines.length]);
    // setAmountOfLinesTitle({
    //   amount: e.nativeEvent.lines.length,
    //   text: e.nativeEvent.lines,
    // });
  }, []);

  // amountOfLinesTitle === 2 &&

  // const titleStyle = useCallback(() => {
  //   console.log("IN CALL BACK  amountOfLinesTitle.text   ", amountOfLinesTitle);
  //   return {
  //     marginTop: amountOfLinesTitle.text.width > 215 ? 0 : 25,
  //   };
  // }, [amountOfLinesTitle]);

  // console.log(" amountOfLinesTitle.text   ", amountOfLinesTitle);
  // console.log("______________________________________");

  //console.log("titleRef    ", titleRef.current.style);

  /////////////////////////////

  return (
    <View>
      <View style={styles.activityContainer}>
        {showArray.length > 0 &&
          showArray.map((suggestion, index) => (
            <TouchableOpacity
              //onLayout={onLayout}
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
                    <Text
                      onTextLayout={onTextLayout}
                      // onLayout={onLayout}
                      // onTextLayout={({ nativeEvent: { lines } }) =>
                      //   setAmountOfLinesTitle(lines.length)
                      // }
                      numberOfLines={2}
                      style={styles.textTitle}
                    >
                      {suggestion.title}
                    </Text>

                    <View
                      style={{
                        // marginTop: suggestion.title.length > 16 ? 0 : 25,
                        //...titleStyle(),
                        // marginTop: amountOfLinesTitle > 1 ? 0 : 25,
                        ...styles.iconsAndTextCityContainer,
                      }}
                    >
                      <Icon
                        type="material-community"
                        name="map-marker-outline"
                        color={colors.dark}
                        size={25}
                      />

                      <Text
                        //ref={titleRef}
                        style={styles.textCity}
                      >
                        {suggestion.city}
                      </Text>
                    </View>

                    <View style={styles.iconsAndTextTimeContainer}>
                      <Icon
                        type="material-community"
                        name="information-outline"
                        color={colors.dark}
                        size={25}
                      />
                      <Text
                        numberOfLines={2}
                        style={{
                          // marginBottom:
                          //   suggestion.description.length > 16 ? 19 : 38,
                          ...styles.textDescription,
                        }}
                      >
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
    flex: 1,
    ...typography.title,
    color: colors.dark,
    backgroundColor: "pink",
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
    flex: 1,
    flexDirection: "row",
  },
});
