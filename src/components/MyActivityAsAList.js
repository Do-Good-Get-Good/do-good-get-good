import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  Button,
  ListItem,
  TouchableOpacity,
  Pressable
} from 'react-native'
import { Icon } from 'react-native-elements'

export const MyActivityAsAList = ({}) => {
  const [activityArray, setActivityArray] = useState([
    {
      idActivityList: '1',
      title: 'Soppkök',
      date: '2021-08-10',
      time: 0.5,
      activityStatus: true
    },
    {
      idActivityList: '2',
      title: 'Cat house',
      date: '2021-08-20',
      time: 2.5,
      activityStatus: true
    },
    {
      idActivityList: '3',
      title: 'Soppkök',
      date: '2021-08-15',
      time: 4.5,
      activityStatus: false
    },
    {
      idActivityList: '4',
      title: 'Soppkök',
      date: '2021-08-10',
      time: 0.5,
      activityStatus: true
    },
    {
      idActivityList: '5',
      title: 'Cat house',
      date: '2021-08-20',
      time: 2.5,
      activityStatus: true
    },
    {
      idActivityList: '6',
      title: 'Soppkök',
      date: '2021-08-15',
      time: 4.5,
      activityStatus: false
    }
  ])

  //   const styleToChangeButton = {
  // color: activityArray.activityStatus ? 'pink' : 'black'
  //     function n() { for(i = 0; i < activityArray.length; i++){
  //         fontWeight: activityArray.activityStatus ? 'bold' : 'normal'
  //     }}

  //   }

  useEffect(() => {}, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mina aktiviteter</Text>
      {activityArray.map((activity) => (
        <View style={styles.activityIside}>
          <Text
            style={{
              fontWeight: activity.activityStatus ? 'bold' : 'normal',
              color: activity.activityStatus ? '#333333' : 'gray',
              flex: 1,
              fontSize: 16
            }}
          >
            {activity.title}
          </Text>
          <Text
            style={{
              color: activity.activityStatus ? '#333333' : 'gray',
              flex: 1,
              fontSize: 16
            }}
          >
            {activity.date}
          </Text>
          <Text
            style={{
              color: activity.activityStatus ? '#333333' : 'gray',
              flex: 1,
              fontSize: 16
            }}
          >
            {activity.time} tim
          </Text>

          <TouchableOpacity>
            <Text>
              <Icon
                color={activity.activityStatus ? '#333333' : 'gray'}
                name={'create'}
                size={25}
              />
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity>
        <Text style={styles.textVissaAll}>Visa allt</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 8
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10
  },

  textVissaAll: {
    flex: 1,
    width: 158,

    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#84BD00',
    textAlign: 'center',
    // paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    overflow: 'hidden',
    fontSize: 20
  },
  activityIside: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 5
  }
})

// <Text
//             style={{
//               fontWeight: activity.activityStatus ? 'bold' : 'normal',
//               textDecorationLine: activity.activityStatus
//                 ? 'underline'
//                 : null,
//               flex: 1
//             }}
//           >
