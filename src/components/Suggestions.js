import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, FlatList, View, Image } from 'react-native'

export const Suggestions = ({}) => {
  const [suggestionsArray, setSuggestionsArray] = useState([
    {
      id: '1',
      photo:
        'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Katthem',
      city: 'Götebrg',
      description: 'Städning, matning och en massa kel!'
    },
    {
      id: '1',
      photo:
        'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Studiehjälp',
      city: 'Malmö',
      description: 'Hjälper elever med läxorna'
    }
  ])
  return (
    <View>
      <Text style={styles.topH1}>Förslag</Text>
      <Text style={styles.topH2}>
        Vet du inte vad du ska göra? Behöver du lite inspiration? Nemas
        problemas, här kommer lite förslag på aktiviteter som finns att göra.
      </Text>
      <FlatList
        numColumns={2}
        data={suggestionsArray}
        keyExtractor={(item) => item.title}
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
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  topH1: {
    //second in MyActivities
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20
  },
  topH2: {
    //second in MyActivities
    fontSize: 14,
    marginHorizontal: 20
  },
  tinyLogo: {
    //second in MyActivities
    width: 100,
    height: 100
  },
  myActivitiesContainer: {
    //second in MyActivities
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20
  }
})
