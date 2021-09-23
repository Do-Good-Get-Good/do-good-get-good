import React, { useState, useEffect, useContext } from 'react'
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  Button,
  SectionList,
  TouchableOpacity
} from 'react-native'
import firestore, { firebase } from '@react-native-firebase/firestore'
import UserContext from '../context/UserContext'
//  import React, { useEffect } from 'react'
//   import firestore from '@react-native-firebase/firestore'

export const MyActivities = ({ userID }) => {
  const loggedInUser = useContext(UserContext)
  const [eventsArray, setEventsArray] = useState([])
  const [myEvent, setMyEvent] = useState([])
  const [eventId, setEventId] = useState('wCEULSkEOBfxaTK9YkHIx9XHk3T2')
  console.log(loggedInUser.uid)
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

  useEffect(() => {
    const subscriber = firestore()
      .collection('test')
      // .doc('jaLkP8M4jzWV9rc8EFsHZHcym2k1')
      .doc(loggedInUser.uid)
      .onSnapshot((documentSnapshot) => {
        console.log('User data: ', documentSnapshot.data())
        setMyEvent({
          eventID: documentSnapshot.data().id_my_activity,
          time: documentSnapshot.data().time,
          title: documentSnapshot.data().title,
          photo: documentSnapshot.data().photo,
          city: documentSnapshot.data().city
        })
      })
    // Stop listening for updates when no longer required
    return () => subscriber()
  }, [loggedInUser])

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
  }, [loggedInUser])

  console.log('MY EVENT', myEvent)
  console.log('MY EVENT', myEvent.city)

  return (
    <View>
      {/* <Text>{myEvent.title}</Text>
      <Text>{myEvent.city}</Text> */}
      <Text style={styles.topH1}>Mina aktiviteter</Text>
      <Text style={styles.topH2}>
        Har du gjort något bra för någon annan på sistone? Glöm inte att lägg in
        tiden.
      </Text>
      {/* <FlatList
        data={myEvent}
        numColumns={2}
        keyExtractor={(item) => item.eventID}
        renderItem={({ item }) => (
          <View style={styles.myActivitiesContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.photo
              }}
            />
            <View style={styles.textTitleCityTime}>
              <Text> {item.title}</Text>
              <Text> {item.city}</Text>
              <Text> {item.time} tim</Text>
            </View>

            <Button color="green" title="Lägg in tid"></Button>
          </View>
        )}
      /> */}
      <View style={styles.myActivitiesContainer2}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: myEvent.photo
          }}
        />
        <View style={styles.textTitleCityTime}>
          <Text> {myEvent.title}</Text>
          <Text> {myEvent.city}</Text>
          <Text> {myEvent.time} tim</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.läggTid}>Lägg in tid</Text>
        </TouchableOpacity>
        {/* <Button color="green" title="Lägg in tid"></Button> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topH1: {
    flex: 1,
    fontSize: 25,
    marginHorizontal: 20
  },
  topH2: {
    flex: 1,
    marginHorizontal: 20
  },
  tinyLogo: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    width: 150,
    height: 150
  },
  textTitleCityTime: {
    flex: 1,
    alignItems: 'center',
    fontSize: 50
  },
  // sectionsList: {
  //   flexDirection: 'row'

  // alignItems: 'flex-start',
  // justifyContent: 'flex-start',
  // flexWrap: 'wrap'
  // },
  myActivitiesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: 'white',
    flexWrap: 'wrap'
  },

  textAndButtonInActivities: {
    flex: 1,
    flexDirection: 'column'
    // justifyContent: 'flex-start'
  },
  myActivitiesContainer2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    marginRight: 242,
    backgroundColor: 'white',
    flexWrap: 'wrap'
  },
  läggTid: {
    flex: 1,
    width: 150,
    // marginLeft: 5,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontWeight: 'bold',
    backgroundColor: '#84BD00',
    textAlign: 'center'
  }
})

{
}

// <SectionList
//   data={myActivitiesArray}
//   keyExtractor={(item) => item.idMyActivity}
//   renderItem={({ item }) => (
//     <View style={styles.myActivitiesContainer}>
//       <Image
//         style={styles.tinyLogo}
//         source={{
//           uri: item.photo
//         }}
//       />
//       <View style={styles.textAndButtonInActivities}>
//         <Text> {item.title}</Text>
//         <Text> {item.city}</Text>
//         <Text>{item.time} tim</Text>
//         <Button
//           style={styles.textAndButtonInActivities}
//           color="green"
//           title="Lägg in tid"
//         ></Button>
//       </View>
//     </View>
//   )}
// />

// const [myActivitiesArray, setMyActivitiesArray] = useState([
//   {
//     idMyActivity: '1',
//     photo:
//       'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     title: 'Volunteer',
//     city: 'Götebrg',
//     time: '3.5'
//   },
//   {
//     idMyActivity: '2',
//     photo:
//       'https://images.pexels.com/photos/7475421/pexels-photo-7475421.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     title: 'Volunteer',
//     city: 'Götebrg',
//     time: '2.5'
//   },
//   {
//     idMyActivity: '3',
//     photo:
//       'https://images.pexels.com/photos/66639/pexels-photo-66639.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     title: 'Soppkök',
//     city: 'Götebrg',
//     time: '1.5'
//   },
//   {
//     idMyActivity: '4',
//     photo:
//       'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     title: 'Volunteer',
//     city: 'Götebrg',
//     time: '3.5'
//   },
//   {
//     idMyActivity: '5',
//     photo:
//       'https://images.pexels.com/photos/7475421/pexels-photo-7475421.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
//     title: 'Volunteer',
//     city: 'Götebrg',
//     time: '2.5'
//   }
// ])
