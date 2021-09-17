import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, FlatList, View, Image, Button } from 'react-native'

export const MyActivityAsAList = ({}) => {
  const [activityArray, setActivityArray] = useState([
    { title: 'Soppkök', date: '2021-08-10', time: 0.5, activityStatus: true },
    { title: 'Cat house', date: '2021-08-20', time: 2.5, activityStatus: true },
    { title: 'Soppkök', date: '2021-08-15', time: 4.5, activityStatus: false }
  ])

  //   const styleToChangeButton = {
  // color: activityArray.activityStatus ? 'pink' : 'black'
  //     function n() { for(i = 0; i < activityArray.length; i++){
  //         fontWeight: activityArray.activityStatus ? 'bold' : 'normal'
  //     }}

  //   }
  function checkActivityStatus() {
    for (let i = 0; i < activityArray.length; i++) {
      const styleToChangeButton = {
        // fontWeight: activityArray[i].activityStatus ? 'bold' : 'normal'
      }
      console.log(activityArray[i].activityStatus)
      return styleToChangeButton
    }
  }
  //         fontWeight: activityArray.activityStatus ? 'bold' : 'normal'
  //     }}

  useEffect(() => {})

  return (
    <View>
      <FlatList
        data={activityArray}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text> {item.title}</Text>
            <Text> {item.date}</Text>
            <Text>{item.time} tim</Text>
            {/* <Button onPress={console.log('hi')}></Button> */}
            <Text style={checkActivityStatus()}>Ändra</Text>
          </View>
        )}
      />

      <Text>Visa allt</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonToChange: {}

  //   buttonToChange:
  //     activityArray.status === true
  //       ? {
  //           fontWeight: 'bold'
  //         }
  //       : {
  //           fontWeight: 'normal'
  //         }
})
