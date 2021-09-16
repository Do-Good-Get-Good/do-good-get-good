import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  Button,
  ScrollView
} from 'react-native'

export const MyActivities = ({}) => {
  const [myActivitiesArray, setMyActivitiesArray] = useState([
    {
      id: '1',
      photo:
        'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Volunteer',
      city: 'Götebrg',
      time: 3.5
    },
    {
      id: '2',
      photo:
        'https://images.pexels.com/photos/7475421/pexels-photo-7475421.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Volunteer',
      city: 'Götebrg',
      time: 2.5
    },
    {
      id: '3',
      photo:
        'https://images.pexels.com/photos/66639/pexels-photo-66639.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Soppkök',
      city: 'Götebrg',
      time: 1.5
    },
    {
      id: '4',
      photo:
        'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Volunteer',
      city: 'Götebrg',
      time: 3.5
    },
    {
      id: '5',
      photo:
        'https://images.pexels.com/photos/7475421/pexels-photo-7475421.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Volunteer',
      city: 'Götebrg',
      time: 2.5
    }
  ])

  return (
    <View>
      <Text style={styles.topH1}>Mina aktiviteter</Text>
      <Text style={styles.topH2}>
        Har du gjort något bra för någon annan på sistone? Glöm inte att lägg in
        tiden.
      </Text>

      <FlatList
        numColumns={2}
        data={myActivitiesArray}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.myActivitiesContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.photo
              }}
            />
            <View style={styles.textAndButtonInActivities}>
              <Text> {item.title}</Text>
              <Text> {item.city}</Text>
              <Text>{item.time} tim</Text>
              <Button color="green" title="Lägg in tid"></Button>
            </View>
          </View>
        )}
      />
      {/* <ScrollView style={styles.myActivitiesContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: myActivitiesArray.photo
          }}
        />
        <Text> {myActivitiesArray.title}</Text>
        <Text> {myActivitiesArray.city}</Text>
        <Text>{myActivitiesArray.time} tim</Text>
        <Button title="Lägg in tid" color="green"></Button>
      </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  topH1: {
    fontSize: 25,
    marginHorizontal: 20
  },
  topH2: { marginHorizontal: 20 },
  tinyLogo: {
    width: 100,
    height: 100
  },
  myActivitiesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 20
  },

  textAndButtonInActivities: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
})

{
  /* <FlatList
        data={myActivitiesArray}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.myActivitiesContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.photo
              }}
            />
            <Text> {item.title}</Text>
            <Text> {item.city}</Text>
            <Text>{item.time} tim</Text>
            <Button title="Lägg in tid"></Button>
          </View>
        )}
      /> */
}
