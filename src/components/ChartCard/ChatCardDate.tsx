import React from "react";
import {
  View,StyleSheet,Text,Image
} from "react-native";
import typography from "../../assets/theme/typography";

export const ChatCardDate = () => {
    const currentDate = new Date();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = (date: Date): string => {
        const diff = date.getDate() - currentDate.getDate();
        if (diff === -1) {
          return 'Yesterday';
        } else if (diff === 0) {
          return 'Today';
        } else if (diff === 1) {
          return 'Tomorrow';
        } else {
          const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          return date.toLocaleDateString(undefined, options);
        }
    };   
  return (
    <View>
      <Text style={styles.textDate}>{formattedDate(currentDate)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    textDate:{
        ...typography.b2
    }
});
