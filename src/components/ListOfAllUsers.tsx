import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { useSuperAdminFunction } from "../context/SuperAdminContext";
import { useUserLevel } from "../context/useUserLevel";
import { useGetAllUsersThatExistInTheSystem } from "../hooks/superAdmin/useGetAllUsersThatExistInTheSystem";
import { useOnSelectUser } from "../hooks/superAdmin/useOnSelectUser";
import { SuperAdminStack } from "../utility/routeEnums";
import { User } from "../utility/types";
import { GoBackButton } from "./Buttons/GoBackButton";
import { YesNoRadioButtons } from "./Buttons/YesNoRadioButtons";
import { Spinner } from "./Loading";
import { SearchBarComponent } from "./SearchBarComponent";

type Props = {
  navigation: any;
};
export function ListOfAllUsers({ navigation }: Props) {
  const superAdminContext = useSuperAdminFunction();
  const [selectedOption, setSelectedOption] = useState<boolean>(true);
  const { userLevel } = useUserLevel();
  const { getAllUsersByStatus } = useGetAllUsersThatExistInTheSystem(userLevel);
  const allUsersInSystem = superAdminContext?.allUsersInSystem ?? [];
  const { onSelectUser, getUserEmail } = useOnSelectUser();
  const [searchArray, setSearchArray] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setSearchArray(allUsersInSystem ?? []);
  }, [allUsersInSystem]);

  const onPressUser = async (selectedUser: User) => {
    setLoading(true);
    const email = await getUserEmail(selectedUser.id);
    onSelectUser({ ...selectedUser, email: email });
    navigation.navigate(SuperAdminStack.RolesAndConnection);
    setLoading(false);
  };

  const onGetInActiveUsers = async () => {
    setSelectedOption(false);
    let isUnactiveUsersFetched =
      allUsersInSystem?.find((user) => !user.statusActive) !== undefined;
    !isUnactiveUsersFetched &&
      (await getAllUsersByStatus(false, allUsersInSystem));
  };

  return (
    <View style={styles.screenContainer}>
      <GoBackButton style={{ marginVertical: 5 }} />
      <SearchBarComponent
        arrayToSearch={allUsersInSystem ?? []}
        keys={["firstName", "lastName"]}
        onSearch={setSearchArray}
      />
      <Spinner loading={loading} />
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
          )
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
