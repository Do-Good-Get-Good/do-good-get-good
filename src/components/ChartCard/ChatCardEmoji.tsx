import React, { useState } from "react";
import {
    Modal,
  StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import EmojiSelector from 'react-native-emoji-selector';
import { EmojiList } from "./EmojiList";
import { UserPost } from "../../utility/types";
import { SmileIcon } from "../../assets/icons/SmileIcon";
import { useUserPostsActions } from "../../screens/Chat/useUserPostsActions";


type Props ={
  emoji: UserPost['emoji'];
}


export const ChatCardEmoji = ({emoji }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    // const { addPost} = useUserPostsActions();
  
    const emojis= [
      { emojiName: "😄", userID: "user1",userFirstName:'Erik',userLastName:"Andersson" },
      { emojiName: "😍", userID: "user2" ,userFirstName:'Jerom',userLastName:"Karlsson" },
      { emojiName: "👍", userID: "user3",userFirstName:'Jerom',userLastName:"Karlsson" },
      { emojiName: "😂", userID: "user4",userFirstName:'Sara',userLastName:"Karlsson" },
      { emojiName: "😍", userID: "user4",userFirstName:'Peter',userLastName:"Hans" }, 
      { emojiName: "👍", userID: "user3",userFirstName:'Jerom',userLastName:"Karlsson" },
      { emojiName: "😂", userID: "user4",userFirstName:'Sara',userLastName:"Karlsson" },
      { emojiName: "😍", userID: "user4",userFirstName:'Peter',userLastName:"Hans" }    
    ];

    const onSelectedEmojiPress = () => {
      if (!selectedEmoji) {
        setModalVisible(true);
      } else {
        setSelectedEmoji('');
      }
    };
  
    const onEmojiSelect = (emojiName: string) => {
      setSelectedEmoji(emojiName);
      setModalVisible(false);
      console.log(emojiName)
      // addPost(emoji?.push(emojiName))
     
    }; 
    return (
    <View style={styles.container}>
       <TouchableOpacity onPress={onSelectedEmojiPress}>
        {selectedEmoji ? (
          <Text style={styles.emojiSize}>{selectedEmoji}</Text>
        ) : (
          <SmileIcon onPress={onSelectedEmojiPress} />
        )}
      </TouchableOpacity>
    <View style={{ width: 20 }} />
            <EmojiList emojis={emojis} />
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
        marginHorizontal:10,
        marginVertical:10,
        flexWrap: 'wrap'
    },
    emojiSize:{
        fontSize:28
    },
    emoji:{
        flex:1,
    }
});
