import { Overlay } from "@rneui/base";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { UserStack } from "../../utility/routeEnums";
import { Activity, Post, User, UserPost } from "../../utility/types";
import { ActivityItem } from "./ActivityItem";

const createPropsObject = (activity: Activity, user: User): UserPost => {
  let obj = {
    id: "",
    userID: user.id,
    userFirstName: user.firstName,
    userLastName: user.lastName,
    activityID: activity.id,
    activityCity: activity.city,
    activityTitle: activity.title,
    activityImage: activity.imageUrl ?? activity.photo,
    changed: false,
    date: new Date().toISOString(),
    description: "",
    emoji: [],
    imageURL: "",
    comments: [],
    type: Post.post,
  };
  return obj;
};

type Props = {
  activities: Activity[];
  visible: boolean;
  onActivityPress: (post: UserPost) => void;
  onBackdropPress: () => void;
  user: User;
  navigation: any;
};

export const ActivityListOverLay = ({
  activities = [],
  onActivityPress,
  visible,
  user,
  onBackdropPress,
  navigation,
}: Props) => {
  const handleNoActivityPress = () => {
    navigation.navigate(UserStack.AddOrEditPost, {
      post: {
        userFirstName: user.firstName,
        userLastName: user.lastName,
        description: "",
        userID: user.id,
        activityID: null,
      },
      toEdit: false,
    });
    onBackdropPress();
  };

  return (
    <Overlay
      onBackdropPress={onBackdropPress}
      isVisible={visible}
      animationType="fade"
      overlayStyle={styles.overlayStyle}
    >
      <View>
        <ScrollView style={styles.contentScrollView}>
          <Text style={styles.header}>
            Vilken aktivitet vill du berätta om?
          </Text>
          <TouchableOpacity
            onPress={handleNoActivityPress}
            style={styles.noActivityContainer}
          >
            <Text style={styles.noActivityText}>Fritt inlägg</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Välj från dina aktiviteter.</Text>
          {activities.map((activity, index) => (
            <TouchableOpacity
              onPress={() => onActivityPress(createPropsObject(activity, user))}
              style={styles.itemContainer}
              key={index}
            >
              <ActivityItem activityItem={activity} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    backgroundColor: colors.background,
  },
  contentScrollView: {
    backgroundColor: colors.light,
    margin: 18,
    paddingHorizontal: 16,
    borderRadius: 2,
  },
  header: {
    ...typography.cardTitle,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  overlayStyle: {
    backgroundColor: colors.light,
    width: "90%",
    maxHeight: "60%",
  },
  noActivityContainer: {
    marginBottom: 10,
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  noActivityText: {
    ...typography.b2,
    color: colors.dark,
  },
});
