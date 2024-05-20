import React, { useState } from "react";
import {
  View,StyleSheet,Text, TouchableOpacity, Modal, TouchableWithoutFeedback
} from "react-native";
import { PostEmoji, User} from "../../utility/types";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";

type Props={
  emojis:PostEmoji[],
  loggedInUserId:User['id']
}

export const EmojiList = ({emojis,loggedInUserId}:Props) => {
  

    const [selectedEmoji, setSelectedEmoji] = useState<PostEmoji | null>(null);

    const handleEmojiPress = (emoji: PostEmoji) => {
      setSelectedEmoji(emoji);
    };

    const gettingEmojiDetails = () => {
    
        const emojiDetails = emojis.filter(emoji => emoji.userID !== loggedInUserId).map((emoji) =>{
            return `${emoji.emojiName}  ${emoji.userFirstName} ${emoji.userLastName}`;
          })
          .join("\n");
    
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={selectedEmoji !== null}
            onRequestClose={() => setSelectedEmoji(null)}
          >
           <TouchableWithoutFeedback onPress={() => setSelectedEmoji(null)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>{emojiDetails}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        );
      };

  return (
    <View style={styles.container}>
     {emojis.map((emoji, index) => (
       <TouchableOpacity
        key={index}
        style={styles.emojiContainer}
        onPress={() => handleEmojiPress(emoji)}>
      { emoji.userID !== loggedInUserId && <Text style={styles.emoji}>{emoji.emojiName}</Text>}
       </TouchableOpacity>
    ))}
    {gettingEmojiDetails()}
   </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      emojiContainer: {
        flexDirection: "row",
      },
      emoji: {
        fontSize: 20,
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalContent: {
        backgroundColor:colors.background,
        padding: 20,
        borderRadius: 5,
      },
      modalText: {
        ...typography.b2,
      }
});
