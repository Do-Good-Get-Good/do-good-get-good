import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { Icon } from "@rneui/base";
import { User } from "../utility/types";
import { useOnSelectUser } from "../hooks/superAdmin/useOnSelectUser";
import { useSuperAdminFunction } from "../context/SuperAdminContext";

import { SuperAdminStack } from "../utility/routeEnums";
import { GoBackButton } from "./Buttons/GoBackButton";

import { SearchBarComponent } from "./SearchBarComponent";
import { YesNoRadioButtons } from "./Buttons/YesNoRadioButtons";
import { useGetAllUsersThatExistInTheSystem } from "../hooks/superAdmin/useGetAllUsersThatExistInTheSystem";
import userLevelStore from "../store/userLevel";

type Props = {
  navigation: any;
};
export function ListOfAllUsers({ navigation }: Props) {
  const superAdminContext = useSuperAdminFunction();
  const [selectedOption, setSelectedOption] = useState<boolean>(true);
  const { userLevel } = userLevelStore;
  const { getAllUsersByStatus } = useGetAllUsersThatExistInTheSystem(userLevel);
  const allUsersInSystem = superAdminContext?.allUsersInSystem ?? [];
  const { onSelectUser } = useOnSelectUser();
  const [searchArray, setSearchArray] = useState<User[]>([]);

  useEffect(() => {
    setSearchArray(allUsersInSystem ?? []);
  }, [allUsersInSystem]);

  function onPressUser(selectedUser: User) {
    onSelectUser(selectedUser);
    navigation.navigate(SuperAdminStack.RolesAndConnection);
  }

  const onGetInActiveUsers = async () => {
    setSelectedOption(false);
    let isUnactiveUsersFetched =
      allUsersInSystem?.find((user) => !user.statusActive) !== undefined;
    !isUnactiveUsersFetched &&
      (await getAllUsersByStatus(false, allUsersInSystem));
  };

  return (
    <View style={styles.screenContainer}>
      <GoBackButton
        style={{ marginVertical: 5 }}
        onPress={() => navigation.goBack()}
      />
      <SearchBarComponent
        arrayToSearch={allUsersInSystem ?? []}
        keys={["firstName", "lastName"]}
        onSearch={setSearchArray}
      />
      <YesNoRadioButtons
        isActive={selectedOption}
        onYes={setSelectedOption}
        onNo={onGetInActiveUsers}
      />
      {searchArray.map(
        (user, index) =>
          selectedOption === user.statusActive && (
            <TouchableOpacity
              style={styles.contrainer}
              key={user.id + index}
              onPress={() => onPressUser(user)}
            >
              <Text style={styles.firstAndLastNameText}>
                {user.firstName + " " + user.lastName}
              </Text>

              <Icon
                color={colors.dark}
                name="pencil-outline"
                type="material-community"
                size={25}
              />
            </TouchableOpacity>
          ),
      )}
    </View>
  );
}

export default ListOfAllUsers;

const styles = StyleSheet.create({
  screenContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  contrainer: {
    backgroundColor: colors.background,

    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  firstAndLastNameText: {
    ...typography.b2,
  },
});
