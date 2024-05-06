import React, { useState } from "react";
import {
  View,StyleSheet,Text,Image, Dimensions, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback
} from "react-native";
import { PostEmoji, User } from "../../utility/types";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";

type Props={
    emojis:PostEmoji[],
    users: User[];
}

export const EmojiList = ({emojis,users}:Props) => {

    const [selectedEmoji, setSelectedEmoji] = useState<PostEmoji | null>(null);

    const handleEmojiPress = (emoji: PostEmoji) => {
      setSelectedEmoji(emoji);
    };

    const gettingEmojiDetails = () => {
        if (!selectedEmoji) return null;
    
        const emojiDetails = emojis
          .map((emoji) => {
            const user = users.find((user) => user.id === emoji.userID);
            if (user) {
              return `${emoji.emojiName}  ${user.firstName} ${user.lastName}`;
            } else {
              return emoji.emojiName;
            }
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
      {emojis.map((emoji, index) => {
        const user = users.find((user) => user.id === emoji.userID);
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
        fontSize: 28,
        marginRight: 5,
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
      }
});
