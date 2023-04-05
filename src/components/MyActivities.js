import React, { useState } from "react";

import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import { Icon } from "@rneui/base";
import CalendarView from "./CalendarView";
import { setTheRightPhoto } from "../lib/images";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { Format } from "../lib/enums/imageFormat";

export const MyActivities = ({ activities, registeredTime }) => {
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState({});

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
              source={setTheRightPhoto(myActivity.photo, Format.square)}
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
        registeredTime={registeredTime}
      />
    </>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    marginTop: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    borderRadius: 2,
  },
  photoAndText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 5,
    height: 100,
    width: 100,
  },
  textTitleCityTime: {
    color: colors.dark,
  },
  textTitle: {
    ...typography.cardTitle,
    color: colors.dark,
    marginTop: -3,
  },
  mapIconAndCityText(myActivity) {
    return {
      flexDirection: "row",
      paddingTop: myActivity.title.length > 16 ? 5 : 25,
      alignItems: "center",
    };
  },
  textCity: {
    ...typography.b1,
    marginLeft: 10,
    color: colors.dark,
  },
  textTime: {
    ...typography.b1,
    marginLeft: 10,
    color: colors.dark,
  },
  läggTid: {
    fontSize: typography.button.lg.fontSize,
    color: colors.dark,
    fontWeight: "500",
  },
  iconsAndTextTimeContainer: {
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  },
  shedowForButton: {
    borderRadius: 5,
    marginVertical: 10,
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
