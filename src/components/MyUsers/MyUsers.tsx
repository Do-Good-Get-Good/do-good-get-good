import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Sort } from "../../lib/enums/sort";
import { User } from "../../utility/types";
import { filterByStatusAndSortAlphabetically } from "./utility";
import { DropDownTextAndIcon } from "../DropDowns/DropDownTextAndIcon/DropDownTextAndIcon";
import { SortBy } from "../DropDowns/SortBy";
import { NoUsersText } from "./NoUsersText";
import { MyUserAndFiveAprovedTimeEntries } from "../DropDowns/MyUserAndFiveAprovedTimeEntries";

type Props = {
  users: User[];
};

export const MyUsers = ({ users }: Props) => {
  const [sortBy, setSortBy] = useState(Sort.Alphabetically);

  const usersSortBy = useCallback(() => {
    return sortBy === Sort.Inactive
      ? filterByStatusAndSortAlphabetically(users, false)
      : filterByStatusAndSortAlphabetically(users, true);
  }, [sortBy, users]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mina användare</Text>
        <DropDownTextAndIcon
          testID={"sort-by"}
          title={sortBy}
          isOnOutsidePress={true}
          componentInsideDropDown={<SortBy setSortBy={setSortBy} />}
        />
      </View>

      {usersSortBy().map((user) => (
        <DropDownTextAndIcon
          testID={`${user.id}-my-users`}
          key={`${user.id}-my-users-drop-down`}
          title={`${user.firstName} ${user.lastName}`}
          isUnderlineOnPress={true}
          componentInsideDropDown={
            <MyUserAndFiveAprovedTimeEntries user={user} />
          }
        />
      ))}
      <NoUsersText users={usersSortBy()} sortBy={sortBy} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  headerText: {
    width: "55%",
    fontSize: 22,
  },
});
