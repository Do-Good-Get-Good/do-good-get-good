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
import { Overlay } from "@rneui/base/dist/Overlay";


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
    <View testID="chat-card-emoji" style={styles.container}>
            {selectedEmoji ? (
               <TouchableOpacity onPress={() => onEmojiDeselect(selectedEmoji)}>
               <Text style={styles.emojiSize}>{selectedEmoji}</Text>
              </TouchableOpacity>
        ) : (
       <SmileIcon onPress={()=>setModalVisible(true)} />
        )}
    <View style={{ width:12 }} />
            <EmojiList emojis={emoji ??[]} loggedInUserId={loggedInUser.id} />
     <Overlay
      isVisible={modalVisible}
      transparent={true}
      animationType='slide'
      onBackdropPress={() => setModalVisible(false)}
      overlayStyle={{ 
     backgroundColor: colors.background, maxHeight: '70%'
     
      }}
    ><View style={{ height: '90%',alignSelf:'flex-end', bottom:0}}>
            <EmojiSelector   
              onEmojiSelected={onEmojiSelect}
              columns={8} 
              showTabs={true} 
              placeholder="Search emoji..."
            /></View> 
    </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginHorizontal:10,
        marginVertical:10,  
        flexWrap: 'wrap'    
    },
    emojiSize:{
        fontSize:20
    },
});
