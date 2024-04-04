import React from "react";
import {
  View,StyleSheet,Text,Image
} from "react-native";
import typography from "../../assets/theme/typography";
const today = new Date();
    
const formattedDate = (date: Date): string => {
  const diff =  date.getDate() - today.getDate();
  switch (diff) {
    case -1:
      return 'Yesterday';
    case 0:
      return 'Today';
    default:
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }
};

type Props ={
  date:Date
}

export const ChatCardDate = ({date}:Props) => {
  return (
    <View>
      <Text style={styles.textDate}>{date &&formattedDate(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    textDate:{
        ...typography.b2
    }
});
