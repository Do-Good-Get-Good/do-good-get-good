import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { Icon } from "react-native-elements";
import { useSuperAdminFunction } from "../context/SuperAdminContext";

function ListOfAllUsers() {
  const superAdminContext = useSuperAdminFunction();

  function changingUserData(user) {
    console.log("user  ", user);
  }

  return (
    <View style={{ marginTop: 16 }}>
      {superAdminContext.allUsersInSystem.map((user, index) => (
        <View key={user.doc_id} style={styles.contrainer}>
          <Text style={styles.firstAndLastNameText}>
            {user.first_name + " " + user.last_name}
          </Text>
          <TouchableOpacity onPress={() => changingUserData(user)}>
            <Icon
              color={colors.dark}
              name="pencil-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export default ListOfAllUsers;

const styles = StyleSheet.create({
  contrainer: {
    backgroundColor: colors.background,
    marginHorizontal: 16,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  firstAndLastNameText: {
    ...typography.b2,
  },
});
