import React, { useState } from "react";
import {
    Modal,
  StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import EmojiSelector from 'react-native-emoji-selector';



export const ChatCardEmoji = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [defaultEmoji, setDefaultEmoji] = useState('😊');
    
    const handleEmojiSelect = (emoji:string) => {

      // if (selectedEmoji === emoji) {
      //   setSelectedEmoji('');
      // } else {
      //   setSelectedEmoji(emoji);
      // }
      // setModalVisible(false);
       setSelectedEmoji(emoji);
        setModalVisible(false);
      }; 
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
       <Text style={styles.emojiSize}>{selectedEmoji || defaultEmoji}</Text> 
    </TouchableOpacity>
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.emoji}>
        <EmojiSelector onEmojiSelected={handleEmojiSelect} />
      </View>
    </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    emojiSize:{
        fontSize:40
    },
    emoji:{
        flex:1,
        // backgroundColor:colors.background
    }
});
