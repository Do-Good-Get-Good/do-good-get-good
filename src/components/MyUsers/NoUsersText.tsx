import { StyleSheet, Text } from "react-native";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { Sort } from "../../lib/enums/sort";
import { User } from "../../utility/types";
const textNoInactiveUsers = "Du har inga inaktiva användare";
const textNoUsersConnected = "Du har inga användare";

type Props = {
  users: User[];
  sortBy: Sort;
};

export const NoUsersText = ({ users, sortBy }: Props) => {
  return (
    <>
      {users.length <= 0 && (
        <Text style={styles.noInactiveUsers}>
          {sortBy === Sort.Inactive
            ? textNoInactiveUsers
            : textNoUsersConnected}
        </Text>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  noInactiveUsers: {
    ...typography.b2,
    textAlign: "center",
    marginTop: 20,
    color: colors.dark,
  },
});
