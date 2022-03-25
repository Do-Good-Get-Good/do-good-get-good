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
import CalendarView from "./CalendarView";
import Images from "../Images";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export const MyActivities = ({ myActivities, myAccumulatedTime }) => {
  const [activityObject, setActivityObject] = useState([]);
  const [timeObject, setTimeObject] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState({});
  const [myActivitiesArray, setMyActivitiesArray] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setActivityObject(myActivities);
    setTimeObject(myAccumulatedTime);
  }, [myActivities, myAccumulatedTime]);

  useEffect(() => {
    let activitiAndTimeArray = [];
    if (activityObject.length > myActivitiesArray.length) {
      for (let i = 0; i < activityObject.length; i++) {
        for (let j = 0; j < timeObject.length; j++) {
          if (activityObject[i].id === timeObject[j].activityID) {
            const setAllInformation = {
              title: activityObject[i].title,
              city: activityObject[i].city,
              time: timeObject[j].accumulatedTime,
              id: activityObject[i].id,
              photo: activityObject[i].photo,
            };
            activitiAndTimeArray.push(setAllInformation);
            setMyActivitiesArray(activitiAndTimeArray);
          }
        }
      }
    }
  }, [activityObject]);

  function setTheRightPhoto(activityObjectPhoto) {
    for (let index = 0; index < Images.length; index++) {
      if (activityObjectPhoto === Images[index].name) {
        return Images[index].image;
      }
    }
  }

  return (
    <View>
      <View style={styles.activityContainer}>
        {myActivitiesArray.map((myActivity, index) => (
          <View
            index={index}
            key={index}
            style={styles.insideActivityContainer}
          >
            <View style={styles.photoAndText}>
              <View style={styles.textTitleCityTime}>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {myActivity.title}
                </Text>

                <View
                  testID="viewId"
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingTop: myActivity.title.length > 16 ? 0 : 25,
                  }}
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
            >
              <View style={styles.shedowForButton}>
                <Text style={styles.läggTid}>Logga tid</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <CalendarView
        visible={visible}
        toggleVisibility={toggleOverlay}
        activity={activity}
        adminID={myAccumulatedTime[0].adminID}
        isEditing={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    marginTop: 20,
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
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: typography.button.lg.fontSize,
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.dark,
    fontWeight: "500",
  },
  iconsAndTextTimeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
  },
  shedowForButton: {
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
