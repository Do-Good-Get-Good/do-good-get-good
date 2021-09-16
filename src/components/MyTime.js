import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, FlatList, SafeAreaView, View } from 'react-native'

export const MyTime = ({}) => {
  const today = new Date()

  const [timeForYear, setTimeForYear] = useState(13.5)
  const [timeForCurrentMonth, setTimeForCurrentMonth] = useState(6.0)
  const [paidTime, setPaidTime] = useState(3.0)

  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(
    today.toLocaleString('default', { month: 'long' })
  )
  //   useState(today.toDateString())

  //   useState(
  //     String(today.getMonth() + 1).padStart(2, '0')
  //   )
  console.log(currentYear)
  console.log(currentMonth)
  return (
    <SafeAreaView>
      <View style={styles.containerForAll}>
        <Text style={styles.topTime}>Mina utförda timmar</Text>
        <View style={styles.containerYearAndMonth}>
          <View style={styles.yearContainer}>
            <Text style={styles.textYear}>{timeForYear}</Text>
            <Text>
              för
              {currentYear}
            </Text>
          </View>
          <View style={styles.monthContainer}>
            <Text style={styles.textMonth}>{timeForCurrentMonth}</Text>
            <Text>
              för
              {currentMonth}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.paidContainer}>Mina betalda timmar:</Text>
          <Text style={styles.textPaid}>{paidTime}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerForAll: {
    justifyContent: 'space-evenly'
  },

  topTime: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 80
  },

  containerYearAndMonth: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    marginHorizontal: 50
  },

  yearContainer: {
    flexDirection: 'column',
    marginVertical: 10
    // backgroundColor: '#FFFFFF'
  },
  textYear: {
    fontSize: 30,
    textAlign: 'center'
    // backgroundColor: '#FFFFFF'
  },
  monthContainer: {
    flexDirection: 'column',
    marginVertical: 10
    // backgroundColor: '#FFFFFF'
    // textAlign: 'center'
  },
  textMonth: {
    fontSize: 30,
    textAlign: 'center'
  },
  paidContainer: {
    flexDirection: 'column',

    textAlign: 'center'
    // backgroundColor: '#FFFFFF'
  },

  textPaid: {
    fontSize: 30,
    textAlign: 'center'
    // backgroundColor: '#FFFFFF'
  }
})
