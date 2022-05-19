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

function ListOfAllUsers({ navigation }) {
  const superAdminContext = useSuperAdminFunction();

  function findNameOfUserAdmin(adminId) {
    let adminName = "";

    let index = superAdminContext.allUsersInSystem.findIndex(
      (x) => x.doc_id === adminId
    );

    if (index != -1) {
      adminName =
        superAdminContext.allUsersInSystem[index].first_name +
        " " +
        superAdminContext.allUsersInSystem[index].last_name;
    }
    return adminName;
  }

  function changingUserData(chooseUser) {
    let userAdminName = findNameOfUserAdmin(chooseUser.admin_id);
    console.log("userAdminName  ", userAdminName);
    navigation.navigate("RolesAndConnection", {
      user: chooseUser,
      adminName: userAdminName,
    });
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
