import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../../assets/theme/colors";
import { User, UserPost } from "../../utility/types";

type Props = {
  addPost: (post: UserPost) => void;
  loggedInUser: User;
};

const creatMessageObject = (user: User, message: string): UserPost => {
  let obj = {
    id: "",
    userID: user.id,
    userFirstName: user.firstName,
    userLastName: user.lastName,
    date: new Date().toISOString(),
    description: message,
    comments: [],
  };
  return obj;
};

export const ChatInputField = ({ addPost, loggedInUser }: Props) => {
  const [message, setMessage] = useState<string>("");

  const onAddChatMessage = () => {
    message.trim() !== "" && addPost(creatMessageObject(loggedInUser, message));
    setMessage("");
  };

  return (
    <TextInput
      style={styles.inputField}
      placeholder={"Skriv ett meddelande"}
      value={message}
      onChangeText={(text) => setMessage(text)}
      onSubmitEditing={onAddChatMessage}
    />
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    padding: 6,
    marginHorizontal: 20,
    backgroundColor: colors.background,
    borderColor: colors.dark,
    color: colors.dark,
    marginBottom: 50,
  },
});
