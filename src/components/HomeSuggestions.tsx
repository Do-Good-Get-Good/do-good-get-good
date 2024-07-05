import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import { Icon } from "@rneui/base";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { useActivityImages } from "../context/ActivityImagesContext/ActivityImagesContext";
import { Activity } from "../utility/types";
import { useNavigation } from "@react-navigation/native";
import { UserStack } from "../utility/routeEnums";
import { shadow } from "../styles/shadows";
import { InfoIcon } from "../assets/icons/InfoIcon";
import { LocationIcon } from "../assets/icons/LocationIcon";

type Props = {
  suggestions: Activity[];
};
const HomeSuggestions = ({ suggestions }: Props) => {
  const { getImageForActivity } = useActivityImages();
  const navigation = useNavigation<{
    navigate: (
      nav: UserStack,
      Props: {
        activityInfo: Activity;
      },
    ) => void;
  }>();

  function lookDetails(activity: Activity) {
    Keyboard.dismiss();
    navigation.navigate(UserStack.ActivityCardDetails, {
      activityInfo: activity,
    });
  }

  return (
    <View style={styles.activityContainer}>
      {suggestions.map((suggestion) => (
        <TouchableOpacity
          key={suggestion.id}
          testID="lookDetails"
          style={styles.insideActivityContainer}
          activeOpacity={0.4}
          onPress={() => lookDetails(suggestion)}
        >
          <View style={styles.textTitleCityDescriptipn}>
            <View style={{ flexDirection: "row", marginBottom: 6 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <Text numberOfLines={2} style={styles.textTitle}>
                  {suggestion.title}
                </Text>
                <View style={styles.iconsAndTextCityContainer}>
                  <LocationIcon />
                  <Text style={styles.textCity}>{suggestion.city}</Text>
                </View>
              </View>
              <Image
                testID="photo"
                style={styles.image}
                source={getImageForActivity(
                  suggestion.photo,
                  suggestion.imageUrl,
                )}
              />
            </View>
            <View style={styles.iconsAndTextDescriptionContainer}>
              <InfoIcon />
              <Text numberOfLines={2} style={styles.textDescription}>
                {suggestion.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default HomeSuggestions;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    marginTop: 5,
    alignSelf: "center",
    width: "100%",
  },
  insideActivityContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 7,
    backgroundColor: colors.background,
    flexWrap: "wrap",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.background,
    ...shadow({ shadowRadius: 2, elevation: 2 }),
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    alignItems: "center",
    borderRadius: 5,
  },
  textTitleCityDescriptipn: {
    alignItems: "flex-start",
    color: colors.dark,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  textTitle: {
    ...typography.cardTitle,
    color: colors.dark,
  },
  textCity: {
    flex: 1,
    ...typography.b1,
    paddingTop: 5,
    marginLeft: 12,
  },
  iconsAndTextCityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textDescription: {
    flex: 1,
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    paddingVertical: 1.5,
    marginLeft: 12,
  },
  iconsAndTextDescriptionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 60,
  },
});
