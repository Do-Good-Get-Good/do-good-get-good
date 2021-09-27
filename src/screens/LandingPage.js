import React, { useState, useEffect, useContext } from 'react'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Button
} from 'react-native'
import { MyActivities } from '../components/MyActivities'
import { MyActivityAsAList } from '../components/MyActivityAsAList'
import { MyTime } from '../components/MyTime'
import { Suggestions } from '../components/Suggestions'
import auth from '@react-native-firebase/auth'
import UserContext from '../context/UserContext'
import tw from 'tailwind-react-native-classnames'

export const LandingPage = ({ navigation }) => {
  const loggedInUser = useContext(UserContext)

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        <View style={tw`bg-blue-500`}>
          <Text style={tw`text-sm text-center text-white p-1`}>
            Inloggad mail: {loggedInUser.email}
          </Text>
        </View>
        <Button
          color="green"
          title="Logga ut"
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
          }}
        ></Button>
        {/* <MyTime></MyTime> */}
        <MyActivities></MyActivities>
        <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
        <Suggestions></Suggestions>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#F5F5F5'
  },
  myActivities: {
    flex: 1,
    marginTop: 20
  }
})
