import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'
import { RadioButton } from '../components/RadioButton'
// import { useSuggestionFunction } from '../context/SuggestionContext'
// import { Button } from 'react-native-elements/dist/buttons/Button'

export const Suggestions = ({ navigation, search }) => {
  const rout = useRoute()
  const [searchingWord, setSearchingWord] = useState('')
  const [searchArray, setSearchArray] = useState([])
  const [showArray, setShowArray] = useState([])
  // const { suggestionsFromFirebaseActive } = useSuggestionFunction()
  // const [suggestionArray, setSuggestionArray] = useState([])
  const [suggestionsFromFirebase, setSuggestionsFromFirebase] = useState([
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
      title: 'Studiehjälp kjkkjjkljljoijinlojokojinbhbjhbjbojiuj ',
      city: 'Malmö',
      description: 'Hjälper elever med läxorna'
    }
  ])

  useEffect(() => {
    // setSuggestionArray(suggestionsFromFirebase)
    setSearchingWord(search)
    serchForRightObject()
    r()
  }, [search, searchArray, showArray])

  // console.log(
  //   'suggestionContextArray.activeArray',
  //   suggestionContextArray.activeArray
  // )

  // useEffect(() => {
  //   setSearchingWord(search)
  //   serchForRightObject()
  //   r()
  // }, [])

  console.log('searchingWord FIRST', searchingWord)

  function serchForRightObject() {
    if (rout.name === 'AdminActivityGallery' && searchingWord != 0) {
      const searchingThrough = suggestionsFromFirebase.filter(
        (object) =>
          object.title === searchingWord || object.city === searchingWord
      )

      console.log('searchingThrough INSIDE USE EFFECT', searchingThrough)
      return setSearchArray(searchingThrough)
    }
  }

  // useEffect(() => {
  function r() {
    serchForRightObject()
    //Here will be information from user
    if (rout.name === 'LandingPage') {
      setShowArray(suggestionsFromFirebase)
    } else if (
      rout.name === 'AdminActivityGallery' &&
      searchArray.length === 0
    ) {
      setShowArray(suggestionsFromFirebase)
    } else {
      setShowArray(searchArray)
    }
    return showArray
  }
  // }, [])

  // console.log('searchingWord', searchingWord)
  console.log('searchArray', searchArray)
  console.log('showArray', showArray)

  return (
    <View>
      {}
      <TouchableOpacity
        onPress={() => navigation.navigate('AdminActivityGallery')}
      >
        <Text>click just ti try admin AdminActivityGallery</Text>
      </TouchableOpacity>
      {rout.name === 'AdminActivityGallery' ? (
        <RadioButton />
      ) : (
        <Text style={styles.topH1}>Förslag & inspiration</Text>
      )}

      {/* <Text style={styles.topH2}>
        Vet du inte vad du ska göra? Behöver du lite inspiration? Nemas
        problemas, här kommer lite förslag på aktiviteter som finns att göra.
      </Text> */}
      <View style={styles.activityContainer}>
        {/* {suggestionsArray.map((suggestion) => ( */}
        {showArray.map((suggestion) => (
          <TouchableOpacity>
            <View style={styles.insideActivityContainer}>
              <View style={styles.photoAndText}>
                <View style={styles.textTitleCityDescriptipn}>
                  <Text style={styles.textTitle}>{suggestion.title}</Text>

                  <View style={styles.iconsAndTextCityContainer}>
                    <Icon name="place" size={25} />
                    <Text style={styles.textCity}>{suggestion.city}</Text>
                  </View>

                  <View style={styles.iconsAndTextTimeContainer}>
                    <Icon name={'info'} size={25} />
                    <Text style={styles.textDescription}>
                      {suggestion.description}
                    </Text>
                  </View>
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
          </TouchableOpacity>
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

    marginHorizontal: 16,
    marginTop: 10
  },

  activityContainer: {
    flex: 1,
    marginTop: 5,

    marginBottom: 15
  },
  insideActivityContainer: {
    //********************* */
    marginHorizontal: 16,

    flex: 1,
    justifyContent: 'center',
    marginVertical: 7,

    backgroundColor: 'white',
    flexWrap: 'wrap',
    borderRadius: 2,

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

    height: 100,
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

    // marginTop: 20,
    fontSize: 18,
    paddingTop: 5,
    marginLeft: 12
  },

  textDescription: {
    //*************** */
    flex: 1,
    fontSize: 18,

    paddingTop: 3,
    marginLeft: 12
  },

  textLäsMer: {
    //*************** */
    flex: 1,
    textDecorationLine: 'underline',
    marginVertical: 10,
    marginHorizontal: 10,
    marginLeft: 200,

    fontSize: 16,

    textAlign: 'right'
  },

  iconsAndTextTimeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 6
  },
  iconsAndTextCityContainer: {
    marginTop: 25,
    flex: 1,
    flexDirection: 'row'
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
