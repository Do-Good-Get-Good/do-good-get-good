import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  Button,
  SectionList,
  TouchableOpacity,
  Platform,
} from "react-native";

import { Icon } from "react-native-elements";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import CalendarView from "./CalendarView";

export const MyActivities = ({ userID, myActivities, myAccumulatedTime }) => {
  const [activityObject, setActivityObject] = useState([]);
  const [timeObject, setTimeObject] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  // const [titlePadding, setTitlePadding] = useState(true)

  const [amountOfLines, setAmountOfLines] = useState(0);

  const onTextLayout = useCallback((e) => {
    setAmountOfLines(e.nativeEvent.lines.length);
  }, []);
  // const onTextLayout = useCallback((e) => {
  //   setAmountOfLines(e.nativeEvent.lines.length)
  // })

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // console.log(" myActivities just came from context ", myActivities);
  const [myActivitiesArray, setMyActivitiesArray] = useState([]);

  useEffect(() => {
    setActivityObject(myActivities);
    if (myActivities.length === activityObject.length) {
      setIsFinished(true);
    }
  }, []);

  useEffect(() => {
    // setActivityObject(myActivities)
    // getMyActivities()

    const connectActivityAndTime = () => {
      if (
        isFinished === true &&
        activityObject.length > myActivitiesArray.length
      ) {
        for (let i = 0; i < activityObject.length; i++) {
          for (let j = 0; j < myAccumulatedTime.length; j++) {
            if (activityObject[i].id === myAccumulatedTime[j].activityID) {
              const setAllInformation = {
                title: activityObject[i].title,
                city: activityObject[i].city,
                time: myAccumulatedTime[j].accumulatedTime,
                id: activityObject[i].id,
              };
              setMyActivitiesArray((prev) => [...prev, setAllInformation]);
            }
          }
        }
      }
    };
    connectActivityAndTime();
  }, [isFinished]);

  // function getMyActivities() {
  //   setActivityObject(myActivities)
  //   if (myActivities.length === activityObject.length) {
  //     setIsFinished(true)
  //   } else {
  //     setActivityObject(myActivities)
  //   }
  // }

  // console.log('MyActivitiesArray', myActivitiesArray)
  // console.log('activityObject', activityObject, isFinished)
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
                  onTextLayout={onTextLayout}
                  style={styles.textTitle}
                >
                  {myActivity.title}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingTop: myActivity.title.length > 16 ? 0 : 25,
                    // backgroundColor: > 1 ? 'pink' : 'yellow'
                    // paddingTop: myActivity.title.length > 16 ? 0 : 25
                  }}
                >
                  <Icon
                    type="material-community"
                    name="map-marker-outline"
                    size={25}
                  />
                  <Text style={styles.textCity}>{myActivity.city}</Text>
                </View>

                <View style={styles.iconsAndTextTimeContainer}>
                  <Icon
                    type="material-community"
                    name="clock-time-four-outline"
                    size={25}
                  />
                  <Text style={styles.textTime}>{myActivity.time} tim</Text>
                </View>
              </View>
              <Image
                style={styles.image}
                source={{
                  uri: myActivity.photo,
                }}
              />
            </View>

            <TouchableOpacity
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
    // marginHorizontal: 16
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
    resizeMode: "cover",
    alignItems: "center",
    marginRight: 12,
    marginTop: 10,
    borderRadius: 5,
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
  },
  textCity: {
    fontSize: 18,
    paddingTop: 5,
    marginLeft: 12,
  },
  textTime: {
    fontSize: 18,
    paddingTop: 3,
    marginLeft: 12,
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
  },
  iconsAndTextTimeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
  },
  // iconsAndTextCityContainer: {
  // marginTop: 25,
  //   flex: 1,
  //   flexDirection: 'row'
  // },
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
// 6OF5kOKKDo8ZJGAomEHI
// NDXYHkn3hsqZrNVLCx2j
