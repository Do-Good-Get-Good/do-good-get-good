import React, { useState } from "react";

import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import { Icon } from "react-native-elements";
import CalendarView from "./CalendarView";
import Images from "../Images";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export const MyActivities = ({ activities }) => {
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState({});

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  function setTheRightPhoto(activityObjectPhoto) {
    for (let index = 0; index < Images.length; index++) {
      if (activityObjectPhoto === Images[index].name) {
        return Images[index].image;
      }
    }
  }

  return (
    <>
      {activities.map((myActivity, index) => (
        <View key={index} style={styles.activityContainer}>
          <View style={styles.photoAndText}>
            <View style={styles.textTitleCityTime}>
              <Text numberOfLines={2} style={styles.textTitle}>
                {myActivity.title}
              </Text>

              <View
                testID="viewId"
                style={styles.mapIconAndCityText(myActivity)}
              >
                <Icon
                  type="material-community"
                  name="map-marker-outline"
                  color={colors.dark}
                  size={25}
                />
                <Text style={styles.textCity}>{myActivity.city}</Text>
              </View>

              <View style={styles.iconsAndTextTimeContainer}>
                <Icon
                  type="material-community"
                  name="clock-time-four-outline"
                  color={colors.dark}
                  size={25}
                />
                <Text style={styles.textTime}>{myActivity.time} tim</Text>
              </View>
            </View>
            <Image
              testID="imageId"
              style={styles.image}
              source={setTheRightPhoto(myActivity.photo)}
            />
          </View>

          <TouchableOpacity
            testID="logTimeButton"
            onPress={() => {
              setActivity(myActivity);
              toggleOverlay();
            }}
            activeOpacity={0.5}
            style={styles.shedowForButton}
          >
            <Text style={styles.läggTid}>Logga tid</Text>
          </TouchableOpacity>
        </View>
      ))}
      <CalendarView
        visible={visible}
        toggleVisibility={toggleOverlay}
        activity={activity}
        adminID={activities[0].adminId}
        isEditing={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colors.background,
    borderRadius: 2,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    marginRight: 12,
    marginTop: 10,
    borderRadius: 5,
    height: 98,
  },
  photoAndText: {
    flex: 1,
    flexDirection: "row",
  },
  textTitleCityTime: {
    flex: 2,
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 11,
    color: colors.dark,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark,
  },
  mapIconAndCityText(myActivity) {
    return {
      flex: 1,
      flexDirection: "row",
      paddingTop: myActivity.title.length > 16 ? 5 : 25,
      alignItems: "center",
    };
  },
  textCity: {
    ...typography.b1,
    paddingTop: 5,
    marginLeft: 12,
    color: colors.dark,
  },
  textTime: {
    ...typography.b1,
    paddingTop: 3,
    marginLeft: 12,
    color: colors.dark,
  },
  läggTid: {
    fontSize: typography.button.lg.fontSize,
    color: colors.dark,
    fontWeight: "500",
  },
  iconsAndTextTimeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  },
  shedowForButton: {
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
