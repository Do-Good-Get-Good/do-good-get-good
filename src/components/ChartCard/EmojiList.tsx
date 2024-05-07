import React, { useState } from "react";
import {
  View,StyleSheet,Text, TouchableOpacity, Modal, TouchableWithoutFeedback
} from "react-native";
import { PostEmoji, User } from "../../utility/types";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";

type Props={
      emojis:PostEmoji[]
}

export const EmojiList = ({emojis}:Props) => {

    const [selectedEmoji, setSelectedEmoji] = useState<PostEmoji | null>(null);

    const handleEmojiPress = (emoji: PostEmoji) => {
      setSelectedEmoji(emoji);
    };

    const gettingEmojiDetails = () => {
    
        const emojiDetails = emojis
          .map((emoji) =>{
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
      {emojis.slice(0, 2).map((emoji, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.emojiContainer}
            onPress={() => handleEmojiPress(emoji)}
          >
            <Text style={styles.emoji}>{emoji.emojiName}</Text>
          </TouchableOpacity>
        );
      })}
      {emojis.length > 2 && (
        <TouchableOpacity onPress={()=>{console.log("Remaining emojis")}}>
        <Text style={styles.remainingCount}>
          +{emojis.length - 2}
        </Text>
        </TouchableOpacity>
      )}
      {gettingEmojiDetails()}
    </View>

    // <View style={styles.container}>
    //   {emojis.map((emoji, index) => {
    //     return (
    //       <TouchableOpacity
    //         key={index}
    //         style={styles.emojiContainer}
    //         onPress={() => handleEmojiPress(emoji)}>
    //         <Text style={styles.emoji}>{emoji.emojiName}</Text>
    //       </TouchableOpacity>
    //     );
    //   })}
    //   {gettingEmojiDetails()}
    // </View>
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
        fontSize: 26,
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
        fontWeight:'bold'
      },remainingCount: {
        ...typography.title
      }
});
