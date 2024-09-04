import React from "react";
import { StyleSheet, Text, View } from "react-native";
import typography from "../../assets/theme/typography";

const today = new Date();

const formattedDate = (date: Date | string): string => {
  const formattedDate = typeof date === "string" ? new Date(date) : date;

  if (formattedDate instanceof Date && !isNaN(formattedDate.getTime())) {
    const diff = formattedDate.getDate() - today.getDate();
    switch (diff) {
      case -1:
        return "Igår";
      case 0:
        return "Idag";
      default:
        return `${formattedDate.getDate().toString().padStart(2, "0")}.${(formattedDate.getMonth() + 1).toString().padStart(2, "0")}.${formattedDate.getFullYear()}`;
    }
  } else {
    return "";
  }
};

type Props = {
  date: Date | string;
};

export const ChatCardDate = ({ date }: Props) => {
  return (
    <View style={styles.container}>
      <Text testID="chat-card-date" style={styles.textDate}>
        {date && formattedDate(date)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  textDate: {
    ...typography.b2,
  },
});
