import React, { useContext } from 'react'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Button
} from 'react-native'
import { MyActivities } from '../components/MyActivities'
import { MyActivityAsAList } from '../components/MyActivityAsAList'
import { MyTime } from '../components/MyTime'
import { Suggestions } from '../components/Suggestions'
import UserContext from '../context/UserContext'
import tw from 'tailwind-react-native-classnames'
import { StatusBar } from 'expo-status-bar'
import UserMenu from '../components/UserMenu'

export const LandingPage = ({ navigation }) => {
  const loggedInUser = useContext(UserContext)

  return (
    <SafeAreaView style={styles.view}>
      <StatusBar style="auto" />
      <ScrollView>
        <UserMenu />
        <View style={tw`bg-blue-500`}>
          <Text style={tw`text-sm text-center text-white p-1`}>
            Inloggad mail: {loggedInUser.email}
          </Text>
        </View>

        {/* <MyTime></MyTime> */}
        <MyActivities></MyActivities>
        <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
        <Suggestions navigation={navigation}></Suggestions>
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
