import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground
} from 'react-native'
import { MyActivities } from '../components/MyActivities'
import { MyActivityAsAList } from '../components/MyActivityAsAList'
import { MyTime } from '../components/MyTime'
import { Suggestions } from '../components/Suggestions'

export const LandingPage = ({}) => {
  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        <ImageBackground
          source={require('../img/blueprint-white.png')}
          resizeMode={'cover'}
          style={{
            flex: 1
          }}
        >
          <MyTime></MyTime>
          <MyActivities></MyActivities>
          <MyActivityAsAList></MyActivityAsAList>
          <Suggestions></Suggestions>
        </ImageBackground>
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
