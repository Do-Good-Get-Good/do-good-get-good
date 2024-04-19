import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import typography from "../../assets/theme/typography";
import { isUndefined } from "lodash";
import { format } from "date-fns";
const today = new Date();

const formattedDate = (date: Date | string): string => {
  const formattedDate = typeof date === "string" ? new Date(date) : date;

  if (
    !isNaN(formattedDate?.getTime()) &&
    !isUndefined(formattedDate?.getTime())
  ) {
    const diff = formattedDate.getDate() - today.getDate();

    switch (diff) {
      case -1:
        return "Yesterday";
      case 0:
        return "Today";
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
    <View>
      <Text testID="chat-card-date" style={styles.textDate}>
        {date && formattedDate(date)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textDate: {
    ...typography.b2,
  },
});
