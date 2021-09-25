import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'

export const Suggestions = ({}) => {
  const [suggestionsArray, setSuggestionsArray] = useState([
    {
      idSuggestion: '1',
      photo:
        'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Katthem',
      city: 'Götebrg',
      description: 'Städning, matning och en massa kel!'
    },
    {
      idSuggestion: '2',
      photo:
        'https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      title: 'Studiehjälp kgfhgui987uygjhkoiiyug',
      city: 'Malmö',
      description: 'Hjälper elever med läxorna'
    }
  ])
  return (
    <View>
      <Text style={styles.topH1}>Förslag & inspiration</Text>
      {/* <Text style={styles.topH2}>
        Vet du inte vad du ska göra? Behöver du lite inspiration? Nemas
        problemas, här kommer lite förslag på aktiviteter som finns att göra.
      </Text> */}
      <View style={styles.activityContainer}>
        {suggestionsArray.map((suggestion) => (
          <View style={styles.insideActivityContainer}>
            <View style={styles.photoAndText}>
              <View style={styles.textTitleCityDescriptipn}>
                <Text style={styles.textTitle}>{suggestion.title}</Text>
                <Text style={styles.textCity}>
                  <Icon name={'room'} size={25} />
                  {suggestion.city}
                </Text>
                <Text style={styles.textDescription}>
                  <Icon name={'info'} size={25} />
                  {suggestion.description}
                </Text>
              </View>
              <Image
                style={styles.image}
                source={{
                  uri: suggestion.photo
                }}
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.textLäsMer}>Läs mer</Text>
            </TouchableOpacity>
          </View>
          // </View>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  topH1: {
    flex: 1,
    fontSize: 25,
    marginHorizontal: 20,
    marginTop: 10
  },
  // topH2: {
  //   flex: 1,
  //   marginHorizontal: 20
  // },
  activityContainer: {
    flex: 1,
    marginTop: 5

    // marginHorizontal: 20
  },
  insideActivityContainer: {
    //********************* */
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 7,
    backgroundColor: 'white',
    flexWrap: 'wrap',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    ...Platform.select({
      ios: {
        shadowOffset: {
          hight: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5
      },
      android: {
        elevation: 3
      }
    })
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 10,
    borderRadius: 5
  },
  photoAndText: {
    flex: 1,
    flexDirection: 'row'
  },
  textTitleCityDescriptipn: {
    //*************** */
    flex: 2,
    marginRight: 7,
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 11,
    color: '#333333'
  },

  textTitle: {
    //*************** */
    flex: 2,
    fontSize: 20,
    fontWeight: 'bold'
  },
  textCity: {
    //*************** */
    flex: 1,
    marginTop: 20,
    fontSize: 18
  },
  textDescription: {
    //*************** */
    flex: 1,
    fontSize: 18
  },

  textLäsMer: {
    //*************** */
    flex: 1,
    textDecorationLine: 'underline',
    marginVertical: 10,
    marginHorizontal: 10,
    marginLeft: 200,
    // paddingVertical: 15,
    // paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'right'
  }
})
{
  /* <FlatList
        numColumns={2}
        data={suggestionsArray}
        keyExtractor={(item) => item.idSuggestion}
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
      /> */
}
{
  /* <View style={styles.activityContainer}>
        {suggestionsArray.map((suggestion) => (
          <View style={styles.insideActivityContainer}>
            <Text style={styles.textTitle}> {suggestion.title}</Text>
            <Text style={styles.textCity}> {suggestion.city}</Text>
            <Text style={styles.textTime}>{suggestion.description}</Text>
            <Image
              style={styles.image}
              source={{
                uri: suggestion.photo
              }}
            />
          </View>
        ))}
      </View> */
}
