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
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={activityArray}
        // stickyHeaderIndices={[0]}
        keyExtractor={(item) => item.idActivityList}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text
              style={{
                fontWeight: item.activityStatus ? 'bold' : 'normal',
                flex: 1
              }}
            >
              {' '}
              {item.title}
            </Text>
            <Text style={styles.text}> {item.date}</Text>
            <Text style={styles.text}>{item.time} tim</Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontWeight: item.activityStatus ? 'bold' : 'normal',
                  textDecorationLine: item.activityStatus ? 'underline' : null,
                  flex: 1
                }}
              >
                Ändra
              </Text>
            </TouchableOpacity>
            {/* <Text style={checkActivityStatus()}>Ändra</Text> */}
          </View>
        )}
      />
      <TouchableOpacity>
        <Text style={styles.textVissaAll}>Visa allt</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 8
  },
  text: {
    flex: 1
  },
  textVissaAll: {
    flex: 1,
    width: 100,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontWeight: 'bold'
  }
})
