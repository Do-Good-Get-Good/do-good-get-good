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
import { Icon } from "@rneui/base";
import { useSuperAdminFunction } from "../context/SuperAdminContext";
import { User } from "../utilily/types";
import { useOnSelectUser } from "../hooks/super-admin/useOnSelectUser";
type Props = {
  navigation: any;
};

export function ListOfAllUsers({ navigation }: Props) {
  const superAdminContext = useSuperAdminFunction();
  const allUsersInSystem = superAdminContext?.allUsersInSystem;
  const { onSelectUser } = useOnSelectUser();

  function onPressUser(selectedUser: User) {
    onSelectUser(selectedUser);

    navigation.navigate("RolesAndConnection");
  }

  return (
    <View style={{ marginTop: 16 }}>
      {allUsersInSystem &&
        allUsersInSystem.map((user, index) => (
          <View key={user.id + index} style={styles.contrainer}>
            <Text style={styles.firstAndLastNameText}>
              {user.firstName + " " + user.lastName}
            </Text>
            <TouchableOpacity onPress={() => onPressUser(user)}>
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

// const [arrayOfAllUsersInSystem, setArrayOfAllUsersInSystem] = useState([]);

// useEffect(() => {

//     setArrayOfAllUsersInSystem(superAdminContext.allUsersInSystem);
//     // superAdminContext.setGetAllUsers(false);

// }, [superAdminContext.allUsersInSystem]);

// function findNameOfUserAdmin(adminId) {
//   let adminName = "";
//   let index = arrayOfAllUsersInSystem.findIndex((x) => x.id === adminId);

//   if (index != -1) {
//     adminName =
//       arrayOfAllUsersInSystem[index].firstName +
//       " " +
//       arrayOfAllUsersInSystem[index].lastName;
//   }
//   return adminName;
// }

// function findAllUsersConnectedToTheAdmin(userId) {
//   let usersArray = [];
//   let adminName = findNameOfUserAdmin(userId);

//   for (let index = 0; index < arrayOfAllUsersInSystem.length; index++) {
//     if (arrayOfAllUsersInSystem[index].adminID === userId) {
//       usersArray.push(arrayOfAllUsersInSystem[index]);
//     }
//   }

//   return usersArray;
// }
