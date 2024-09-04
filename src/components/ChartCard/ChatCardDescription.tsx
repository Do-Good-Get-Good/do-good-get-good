import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { UserPost } from "../../utility/types";

type Props = {
  description: UserPost["description"];
};

export const ChatCardDescription = ({ description }: Props) => {
  return (
    <Text testID="chat-card-description" style={styles.textDescription}>
      {description}
    </Text>
  );
};

const styles = StyleSheet.create({
  textDescription: {
    ...typography.b2,
    marginLeft: 10,
    color: colors.dark,
    marginVertical: 10,
  },
});
