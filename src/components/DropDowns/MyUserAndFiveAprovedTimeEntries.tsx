import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pencil } from "../../assets/icons/Pencil";
import { TimeEntry, User } from "../../utility/types";
import { useNavigation } from "@react-navigation/native";
import { AdminStack } from "../../utility/routeEnums";
import { ChangeUserRouteProps } from "../../utility/typesRouteProps";
import { InfoRow } from "./InfoRow";
import TimeStatistics from "../TimeStatistics";

type Props = {
  user: User;
};

const adaptUserToTimeStatistics = (user: User) => [
  {
    paidTime: user.totalHoursYear,
    currentForMonth: user.totalHoursMonth,
  },
];

export const MyUserAndFiveAprovedTimeEntries = ({ user }: Props) => {
  const navigation = useNavigation<{
    navigate: (nav: AdminStack, props: ChangeUserRouteProps) => void;
  }>();

  const onChangeUser = () => {
    navigation.navigate(AdminStack.ChangeUser, {
      user,
    });
  };

  return (
    <View style={{ minHeight: 240, justifyContent: "space-between" }}>
      <TimeStatistics timeObject={adaptUserToTimeStatistics(user)} />
      {user.timeEntries &&
        user.timeEntries.map((entry) => (
          <View key={entry.id}>
            <InfoRow
              style={styles.infoRowSContainer}
              mainTitle={entry.activityTitle}
              time={entry.time}
              date={entry.date}
            />
          </View>
        ))}

      <Pencil style={styles.editUserIconView} onPress={() => onChangeUser()} />
    </View>
  );
};
const styles = StyleSheet.create({
  listItemContentStyle: {
    marginTop: -10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  infoRowSContainer: { backgroundColor: "#FFFFFF", marginLeft: 2 },
  editUserIconView: {
    bottom: 0,
    alignItems: "flex-end",
    marginRight: 10,
  },
});
