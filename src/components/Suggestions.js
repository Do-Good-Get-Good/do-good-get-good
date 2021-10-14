import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'

import { useSuggestionFunction } from '../context/SuggestionContext'
// import { useAdminGalleryFunction } from '../context/AdminGalleryContext'
// import { RadioButton } from '../components/RadioButton'

export const Suggestions = ({ navigation, search }) => {
  const rout = useRoute()
  // const adminGalleryContext = useAdminGalleryFunction()
  const userSuggestionsContext = useSuggestionFunction()
  const [searchingWord, setSearchingWord] = useState('')
  const [searchArray, setSearchArray] = useState([])
  const [showArray, setShowArray] = useState([])

  const [userSaggestions, setUserSaggestions] = useState([])
  const [adminActivities, setAdminActivities] = useState([])

  useEffect(() => {
    if (rout.name === 'HomePage') {
      setUserSaggestions(userSuggestionsContext.popularActivities)
      setSuggestionsOrAdminGallery()
    }
    // else if (rout.name === 'AdminActivityGallery ') {
    //   setAdminActivities(adminGalleryContext.active)
    //   setSearchingWord(search)
    //   serchForRightObject()
    // } else {
    //   console.log('No rout')
    // }
    setSuggestionsOrAdminGallery()
  }, [search, searchArray, showArray, rout.name])

  console.log(' userSaggestions', userSaggestions)

  function serchForRightObject() {
    if (rout.name === 'AdminActivityGallery' && searchingWord != 0) {
      const searchingThrough = adminActivities.filter(
        (object) =>
          object.title === searchingWord || object.city === searchingWord
      )
      console.log('searchingThrough', searchingThrough)
      return setSearchArray(searchingThrough)
    }
  }

  function setSuggestionsOrAdminGallery() {
    serchForRightObject()

    if (rout.name === 'HomePage') {
      setShowArray(userSaggestions)
    }
    // else if (
    //   rout.name === 'AdminActivityGallery' &&
    //   searchArray.length === 0
    // ) {
    //   setAdminActivities(adminGalleryContext.active)
    //   setShowArray(adminActivities)
    // } else {
    //   setShowArray(searchArray)
    // }
    return showArray
  }

  return (
    <View>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('AdminActivityGallery')}
      >
        <Text>click just ti try admin AdminActivityGallery</Text>
      </TouchableOpacity>
      {rout.name === 'AdminActivityGallery' ? (
        <RadioButton />
      ) : ( */}
      <Text style={styles.topH1}>Förslag & inspiration</Text>
      {/* )} */}

      <View style={styles.activityContainer}>
        {showArray.map((suggestion, index) => (
          <TouchableOpacity index={index} key={index}>
            <View style={styles.insideActivityContainer}>
              <View style={styles.photoAndText}>
                <View style={styles.textTitleCityDescriptipn}>
                  <Text style={styles.textTitle}>{suggestion.title}</Text>

                  <View style={styles.iconsAndTextCityContainer}>
                    <Icon
                      type="material-community"
                      name="map-marker-outline"
                      size={25}
                    />
                    <Text style={styles.textCity}>{suggestion.city}</Text>
                  </View>

                  <View style={styles.iconsAndTextTimeContainer}>
                    <Icon
                      type="material-community"
                      name="information-outline"
                      size={25}
                    />
                    <Text numberOfLines={2} style={styles.textDescription}>
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
