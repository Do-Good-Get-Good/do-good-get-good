import React, { useState } from "react";
import {
    Modal,
  StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import EmojiSelector from 'react-native-emoji-selector';

import { EmojiList } from "./EmojiList";



export const ChatCardEmoji = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [defaultEmoji, setDefaultEmoji] = useState('😊');

    const emojis= [
      { emojiName: "😄", userID: "user1" },
      { emojiName: "😍", userID: "user2" },
      { emojiName: "👍", userID: "user3" },
      { emojiName: "😂", userID: "user2" },
      { emojiName: "❤️", userID: "user3" },
      { emojiName: "🔥", userID: "user1" },
      
    ];
    const users = [
      {
        id: "user1",
        activitiesAndAccumulatedTime: [],
        connectedActivities: [],
        firstName: "Erik",
        lastName: "Andersson",
        statusActive: true,
      },
      {
        id: "user2",
        activitiesAndAccumulatedTime: [],
        connectedActivities: [],
        firstName: "Jerom",
        lastName: "Karlsson",
        statusActive: false,
      },
      {
        id: "user3",
        activitiesAndAccumulatedTime: [],
        connectedActivities: [],
        firstName: "dsd",
        lastName: "Karlssodscsn",
        statusActive: false,
      },
    ];
    
    const onSelctedEmojiPress = () => {
      if (!selectedEmoji) {
          setModalVisible(true);
      } else {
          setSelectedEmoji('');
      }
  };

  const onEmojiSelect = (emojiName:string) => {
      setSelectedEmoji(emojiName);
      setModalVisible(false);
  }; 
  return (

    <View style={styles.container}>
    <TouchableOpacity onPress={onSelctedEmojiPress}>
        <Text style={styles.emojiSize}>{selectedEmoji || defaultEmoji}</Text> 
    </TouchableOpacity>
    <EmojiList emojis={emojis} users={users} />
    {/* <EmojiList emojis={emojis} /> */}
    <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
    >
        <View style={styles.emoji}>
            <EmojiSelector onEmojiSelected={onEmojiSelect} />
        </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        // flexWrap: 'wrap'
    },
    emojiSize:{
        fontSize:30
    },
    emoji:{
        flex:1,
    }
});
