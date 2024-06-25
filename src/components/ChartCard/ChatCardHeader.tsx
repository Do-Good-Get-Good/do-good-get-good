import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { UserPost } from "../../utility/types";
import { getImageForActivity } from "../../lib/images";
import { LocationIcon } from "../../assets/icons/LocationIcon";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";

type Props = {
  post: UserPost;
};

export const ChatCardHeader = ({ post }: Props) => {
  return (
    <View testID="chat-card-header" style={styles.detailsContainer}>
      <Image
        testID="chat-card-header-image"
        source={getImageForActivity(post?.activityImage ?? "")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{post.activityTitle}</Text>
        <Text style={styles.textUserDetails}>
          {post.userFirstName} {post.userLastName}
        </Text>
        <View style={styles.locationContainer}>
          <LocationIcon style={{ paddingTop: 3 }} size={19} />
          <Text style={styles.textCity}>{post.activityCity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    maxWidth: 60,
    maxHeight: 60,
    marginRight: 10,
  },
  textContainer: {
    flex: 0.9,
    marginTop: 5,
  },
  textTitle: {
    ...typography.cardTitle,
    marginLeft: 5,
    color: colors.dark,
  },
  textUserDetails: {
    ...typography.b1,
    marginLeft: 5,
    color: colors.dark,
  },
  textCity: {
    ...typography.b2,
    color: colors.dark,
  },
  locationContainer: {
    flexDirection: "row",
  },
});
