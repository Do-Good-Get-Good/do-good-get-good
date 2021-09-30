import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  Button,
  SectionList,
  TouchableOpacity,
} from "react-native";
import firestore, { firebase } from "@react-native-firebase/firestore";
import UserContext from "../context/UserContext";
import { Icon } from "react-native-elements";
import CalendarView from "./CalendarView";
//  import React, { useEffect } from 'react'
//   import firestore from '@react-native-firebase/firestore'

export const MyActivities = ({ userID }) => {
  const ref = firestore().collection("test");
  const loggedInUser = useContext(UserContext);
  const [eventsArray, setEventsArray] = useState([]);
  const [myEvent, setMyEvent] = useState([]);
  // const [test1, setTest1] = useState([]);
  // console.log(loggedInUser.uid);

  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState({});
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [myActivitiesArray, setMyActivitiesArray] = useState([
    {
      idMyActivity: "1",
      photo:
        "https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "Volunteer",
      city: "Götebrg",
      time: "3.5",
    },
    {
      idMyActivity: "2",
      photo:
        "https://images.pexels.com/photos/7475421/pexels-photo-7475421.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "Volunteer",
      city: "Götebrg",
      time: "2.5",
    },
    {
      idMyActivity: "3",
      photo:
        "https://images.pexels.com/photos/66639/pexels-photo-66639.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "Soppkök",
      city: "Götebrg",
      time: "1.5",
    },
    {
      idMyActivity: "4",
      photo:
        "https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "Volunteer",
      city: "Götebrg",
      time: "3.5",
    },
    {
      idMyActivity: "5",
      photo:
        "https://images.pexels.com/photos/7475421/pexels-photo-7475421.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "Volunteer",
      city: "Götebrg",
      time: "2.5",
    },
  ]);

  ///////////WENT GOOD
  // const getDataEvents = async () => {
  //   try {
  //     const allEvents = await firestore()
  //       .collection('Event')
  //       .doc('WzR1IfOfI8Q39fGUgtDU')
  //       .get()
  //     setEventsArray(allEvents)

  //     console.log(eventsArray)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  //******************************************** */
  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('test')
  //     // .doc('jaLkP8M4jzWV9rc8EFsHZHcym2k1')
  //     .doc(loggedInUser.uid)
  //     .collection('testCollection')
  //     .doc('DNXT76Kxpfg3LllRTTN2').child('activity')
  //     .onSnapshot((documentSnapshot) => {
  //       console.log('FIRST: ', documentSnapshot.data().rel)
  // setMyEvent({
  //   eventID: documentSnapshot.data().id_my_activity,
  //   time: documentSnapshot.data().time,
  //   title: documentSnapshot.data().title,
  //   photo: documentSnapshot.data().photo,
  //   city: documentSnapshot.data().city
  // })
  //   setMyEvent(documentSnapshot.data())
  // })
  // Stop listening for updates when no longer required
  //   return () => subscriber()
  // }, [loggedInUser])
  //******************************************** */
  //******************************************** */
  // useEffect(() => {
  //   const su = firestore()
  //     .collection('test')
  //     .doc(loggedInUser.uid)
  //     .collection('testCollection')
  //     .get()
  //     .then((querySnapshot) => {
  //       console.log('Total users: ', querySnapshot.size)

  //       querySnapshot.forEach((documentSnapshot) => {
  //         console.log('User ID: ', documentSnapshot.id, documentSnapshot.data())
  //         setTest1(documentSnapshot.data())
  //       })
  //     })

  // return () => su()
  // }, [])
  //******************************************** */

  // const getDataEvents = async () => {
  //   try {
  //     const event = firestore().collection('Event').doc(loggedInUser.uid).get()
  //     console.log(event)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  useEffect(() => {
    // getDataEvents()
  }, [loggedInUser]);

  // console.log('MY EVENT', myEvent)
  // console.log('MY EVENT', myEvent.city)
  // console.log("TEST TEST TEST", test1);
  // console.log("REL REL REL", test1.length);

  return (
    <View>
      {/* <Text>{myEvent.title}</Text>
      <Text>{myEvent.city}</Text> */}
      {/* <Text style={styles.topH1}>Mina aktiviteter</Text>
      <Text style={styles.topH2}>
        Har du gjort något bra för någon annan på sistone? Glöm inte att lägg in
        tiden.
      </Text> */}

      <View style={styles.activityContainer}>
        {myActivitiesArray.map((myActivity) => (
          <View style={styles.insideActivityContainer}>
            <View style={styles.photoAndText}>
              <View style={styles.textTitleCityTime}>
                <Text style={styles.textTitle}>{myActivity.title}</Text>
                <Text style={styles.textCity}>
                  <Icon name={"room"} size={25} />
                  {myActivity.city}
                </Text>
                <Text style={styles.textTime}>
                  <Icon name={"access-time"} size={25} /> {myActivity.time} tim
                </Text>
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
              <Text style={styles.läggTid}>Logga tid</Text>
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
    borderRadius: 5,
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
    marginTop: 27,
    fontSize: 18,
  },
  textTime: {
    fontSize: 18,
  },

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
});
