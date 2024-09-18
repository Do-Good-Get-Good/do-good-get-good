import React, { useState } from "react";

import { Icon } from "@rneui/base";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { useActivityImages } from "../context/ActivityImagesContext/ActivityImagesContext";
import { ActivityInfo } from "../screens/HomePage/type";
import CalendarView from "./CalendarView";

export const MyActivities = ({
  activities,
  registeredTime,
}: {
  activities: ActivityInfo[];
  registeredTime: number | undefined;
}) => {
  const { getImageForActivity } = useActivityImages();

  const [visible, setVisible] = useState<boolean>(false);
  const [activity, setActivity] = useState<ActivityInfo>({} as ActivityInfo);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const shouldButtonBeDisabled = (activity: ActivityInfo): boolean =>
    activity.id === "cVkZbjsrXs6YKk3Qli0b" ||
    activity.title === "#jagsomväntarpåaktivitet";

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
              source={getImageForActivity(
                myActivity.photo,
                myActivity.imageUrl
              )}
            />
          </View>

          <TouchableOpacity
            testID="logTimeButton"
            onPress={() => {
              setActivity(myActivity);
              toggleOverlay();
            }}
            activeOpacity={0.5}
            style={styles.buttonStyle(shouldButtonBeDisabled(myActivity))}
            disabled={shouldButtonBeDisabled(myActivity)}
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
        removeFirstStaticTimeEntry={undefined}
        registeredTime={registeredTime}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({
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
    resizeMode: "cover",
  },
  textTitleCityTime: {
    color: colors.dark,
    flex: 1,
  },
  textTitle: {
    ...typography.cardTitle,
    color: colors.dark,
    marginTop: -3,
  },
  mapIconAndCityText(myActivity: ActivityInfo) {
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
  buttonStyle(disabled: boolean) {
    return {
      borderRadius: 5,
      marginVertical: 10,
      paddingVertical: 15,
      paddingHorizontal: 10,
      backgroundColor: disabled ? colors.disabled : colors.primary,
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
    };
  },
});
