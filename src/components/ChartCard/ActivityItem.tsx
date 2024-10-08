import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { LocationIcon } from "../../assets/icons/LocationIcon";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { getImageForActivity } from "../../lib/images";
import { Activity } from "../../utility/types";

type Props = {
  activityItem: Activity;
};

export const ActivityItem = ({ activityItem }: Props) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{activityItem.title}</Text>
        <View style={styles.locationContainer}>
          <LocationIcon style={{ paddingTop: 3 }} size={19} />
          <Text style={styles.textCity}>{activityItem.city}</Text>
        </View>
      </View>
      <Image
        source={getImageForActivity(activityItem.photo)}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
  image: {
    maxWidth: 60,
    maxHeight: 60,
    marginStart: 20,
  },
  textTitle: {
    ...typography.cardTitle,
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
