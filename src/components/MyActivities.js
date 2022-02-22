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

export const MyActivities = ({ myActivities, myAccumulatedTime }) => {
  const [activityObject, setActivityObject] = useState([]);
  const [timeObject, setTimeObject] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [myActivitiesArray, setMyActivitiesArray] = useState([]);
  // const [amountOfLines, setAmountOfLines] = useState(0);

  // const onTextLayout = useCallback((e) => {
  //   setAmountOfLines(e.nativeEvent.lines.length);
  // }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setActivityObject(myActivities);
    setTimeObject(myAccumulatedTime);
    // if (activityObject.length === myActivities.length) {
    //   setIsFinished(true);
    //   console.log("!?!?!??!!??!");
    // }
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
    // }, [isFinished, activityObject.length]);
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
                <Text
                  numberOfLines={2}
                  // onTextLayout={(e) => e.nativeEvent.lines.length}
                  style={styles.textTitle}
                >
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
                    color="#333333"
                    size={25}
                  />
                  <Text style={styles.textCity}>{myActivity.city}</Text>
                </View>

                <View style={styles.iconsAndTextTimeContainer}>
                  <Icon
                    type="material-community"
                    name="clock-time-four-outline"
                    color="#333333"
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
        isEditing={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topH1: {
    flex: 1,
    fontSize: 25,
    marginHorizontal: 20,
  },
  topH2: {
    flex: 1,
    marginHorizontal: 20,
  },
  activityContainer: {
    flex: 1,
    marginTop: 20,
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
    color: "#333333",
  },

  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  textCity: {
    fontSize: 18,
    paddingTop: 5,
    marginLeft: 12,
    color: "#333333",
  },
  textTime: {
    fontSize: 18,
    paddingTop: 3,
    marginLeft: 12,
    color: "#333333",
  },

  iconCity: {},

  läggTid: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "#84BD00",
    borderColor: "#84BD00",
    color: "#333333",
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
