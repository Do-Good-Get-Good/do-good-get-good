import React from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import {UserPost} from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";
import typography from "../../assets/theme/typography";

type Props = {
  message: UserPost
  handleAddComment: () => void;
  onDelete: () => void;
  isCurrentUser: boolean;
};

export const MessageCard = ({
  message,
  handleAddComment,
  onDelete,
  isCurrentUser,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        isCurrentUser && { alignItems: "flex-end" },
      ]}
    >
      <ChatCardDate date={message.date} />
      <TouchableOpacity style={[styles.cardContainer]}>
        <View style={styles.contentContainer}>
          <View style={styles.nameAndMessageContainer}>
            <Text style={styles.userName}>
              {`${message.userFirstName} ${message.userLastName}`}
            </Text>
            <Text style={styles.messageText}>{message.description}</Text>
          </View>
          {isCurrentUser && <ChatCardEditMenu onDeletePress={onDelete} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
      },
    
      cardContainer: {
        ...shadows.cardShadow,
        width: "80%",
        backgroundColor: colors.background,
        borderRadius: 5,
      },
    
      contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      nameAndMessageContainer: {
        // flex: 1,
      },
    
      userName: {
        ...typography.b2,
        fontWeight: "bold",
      },
    
      messageText: {
       ...typography.b2
      }
});
