import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { PostEmoji, User } from "../../utility/types";

type Props = {
  emojis: PostEmoji[];
  loggedInUserId: User["id"];
  showAll?: boolean;
};

export const EmojiList = ({ emojis, loggedInUserId, showAll }: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState<PostEmoji | null>(null);

  const handleEmojiPress = (emoji: PostEmoji) => {
    setSelectedEmoji(emoji);
  };

  const gettingEmojiDetails = () => {
    const emojiDetails = emojis
      .filter((emoji) => emoji.userID !== loggedInUserId)
      .map((emoji) => {
        return `${emoji.emojiName}  ${emoji.userFirstName} ${emoji.userLastName}`;
      })
      .join("\n");

    return (
      <Modal
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
  const nonUserEmojis = emojis.filter(
    (emoji) => emoji.userID !== loggedInUserId
  );
  const displayedEmojis = showAll ? nonUserEmojis : nonUserEmojis.slice(0, 2);
  const remainingCount = nonUserEmojis.length - displayedEmojis.length;

  return (
    <View style={styles.container}>
      {displayedEmojis.map((emoji, index) => (
        <TouchableOpacity
          key={index}
          style={styles.emojiContainer}
          onPress={() => handleEmojiPress(emoji)}
        >
          <Text style={styles.emoji}>{emoji.emojiName}</Text>
        </TouchableOpacity>
      ))}
      {!showAll && remainingCount > 0 && (
        <Text style={styles.remainingCount}>+{remainingCount}</Text>
      )}
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
    marginTop: "60%",
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 20,
    marginLeft: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.disabled,
  },
  modalText: {
    ...typography.b2,
  },
  remainingCount: {
    fontSize: 18,
  },
});
