import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import BottomLogo from "../../components/BottomLogo";
import { GoBackButton } from "../../components/Buttons/GoBackButton";
import Menu from "../../components/Menu";
import { getImageForActivity } from "../../lib/images";
import { Activity } from "../../utility/types";
import { iconsAndText } from "./iconsAndText";

type Params = {
  activityInfo: Activity;
};

type Props = {
  route: any;
  navigation: any;
};
// This screen is temporary solution for showing details about activity when user
// press on activity suggestion. We use to use for this ActivityCard screen. Activity
// card screen needs total refactoring together with conext it use.

export const ActivityCardDetails = ({ route }: Props) => {
  const { activityInfo }: Params = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <View style={styles.titleAndBackButton}>
        <GoBackButton style={{ paddingRight: 10 }} text={false} />
        <Text style={styles.textTitle}>{activityInfo.title}</Text>
      </View>
      <ScrollView style={{ marginHorizontal: 16 }}>
        <Image
          testID="photo"
          style={styles.image}
          source={getImageForActivity(
            activityInfo.photo,
            activityInfo.imageUrl
          )}
        />
        {iconsAndText(activityInfo).map((iconAntext, i) => (
          <View key={i} style={styles.iconAndText}>
            {iconAntext.icon}
            <Text style={styles.textNearIcon}>{iconAntext.text}</Text>
          </View>
        ))}
        <BottomLogo style={{ justifyContent: "flex-end" }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleAndBackButton: {
    flexDirection: "row",

    paddingBottom: 10,
    marginHorizontal: 10,
  },

  textTitle: {
    ...typography.h3,
    color: colors.dark,
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 250,
  },
  textNearIcon: {
    flex: 1,
    ...typography.b1,
    marginLeft: 5,
    color: colors.dark,
  },
  iconAndText: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 6,
    color: colors.dark,
  },
});
