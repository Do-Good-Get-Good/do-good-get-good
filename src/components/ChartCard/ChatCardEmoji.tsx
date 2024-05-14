import React, { useEffect, useState } from "react";
import {
    Modal,
  StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import EmojiSelector from 'react-native-emoji-selector';
import { EmojiList } from "./EmojiList";
import { PostEmoji, User, UserPost } from "../../utility/types";
import { SmileIcon } from "../../assets/icons/SmileIcon";
import colors from "../../assets/theme/colors";

const makeEmojiObject =(user: User, emojiName:PostEmoji['emojiName']) => ({ emojiName: emojiName, userID: user.id ,userFirstName: user.firstName,userLastName:user.lastName})

type Props ={
  emoji: UserPost['emoji'];
  loggedInUser: User
  addEmoji: (emoji: PostEmoji)=>void
  deleteEmoji:(emoji: PostEmoji)=>void
}

export const ChatCardEmoji = ({emoji =[] , addEmoji, loggedInUser, deleteEmoji}: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');

    useEffect(() => {
      const index=emoji?.findIndex(
        (e) =>
          e.userID === loggedInUser.id
      );
      setSelectedEmoji (emoji[index]?.emojiName??'')
      
    },[loggedInUser?.id,emoji]);
  
    const onEmojiSelect = async (emojiName: PostEmoji['emojiName']) => {
      addEmoji( makeEmojiObject(loggedInUser,emojiName))
      setSelectedEmoji(emojiName);
      setModalVisible(false); 
    }; 

    const onEmojiDeselect = async (emojiName: PostEmoji['emojiName']) => {
      deleteEmoji(makeEmojiObject(loggedInUser, emojiName));
      setSelectedEmoji(''); 
    };

    return (
    <View style={styles.container}>
            {selectedEmoji ? (
               <TouchableOpacity onPress={() => onEmojiDeselect(selectedEmoji)}>
               <Text style={styles.emojiSize}>{selectedEmoji}</Text>
              </TouchableOpacity>
        ) : (
       <SmileIcon onPress={()=>setModalVisible(true)} />
        )}
    <View style={{ width:12 }} />
            <EmojiList emojis={emoji ??[]} loggedInUserId={loggedInUser.id} />
    <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}   
    >
      <View style={styles.modalContainer}>
          <View style={styles.emojiContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
            </TouchableOpacity>
            <EmojiSelector
              onEmojiSelected={onEmojiSelect}
              columns={8} 
              showTabs={true} 
              placeholder="Search emoji..."
              // showSectionTitles={true}
            />
          </View>  
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
        fontSize:20
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    emojiContainer: {
      maxHeight: '50%', 
      maxWidth: '100%',
      backgroundColor: colors.background
    }  
});
