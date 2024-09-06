import { isToday, isYesterday } from "date-fns";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import typography from "../../assets/theme/typography";

const formattedDate = (date: Date | string): string => {
  const inputDate = typeof date === "string" ? new Date(date) : date;

  if (inputDate instanceof Date && !isNaN(inputDate.getTime())) {
    if (isYesterday(inputDate)) {
      return "Igår";
    }
    if (isToday(inputDate)) {
      return "Idag";
    }

    return Intl.DateTimeFormat("sv-SE").format(inputDate);
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
