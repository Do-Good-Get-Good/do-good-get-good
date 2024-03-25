import React, {useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { Icon } from "@rneui/base";
import { User } from "../utility/types";
import { useOnSelectUser } from "../hooks/superAdmin/useOnSelectUser";
import { useSuperAdminFunction } from "../context/SuperAdminContext";
import { SearchBarComponent } from "./SearchBarComponent";
import { YesNoRadioButtons } from "./YesNoRadioButtons";
import { useGetAllUsersThatExistInTheSystem } from "../hooks/superAdmin/useGetAllUsersThatExistInTheSystem";
import userLevelStore from "../store/userLevel";

type Props = {
  navigation: any;
};
export function ListOfAllUsers({ navigation }: Props) {
  const superAdminContext = useSuperAdminFunction();
  const [selectedOption, setSelectedOption] = useState<boolean >(true);
  const { userLevel } = userLevelStore;
  const {getAllUsersByStatus}  =useGetAllUsersThatExistInTheSystem(userLevel);
  const allUsersInSystem = superAdminContext?.allUsersInSystem ?? [];
  const { onSelectUser } = useOnSelectUser();
  const [searchArray, setSearchArray] = useState<User[]>([]);

  useEffect(()=>{
    setSearchArray( allUsersInSystem ?? [])
  },[allUsersInSystem])

  function onPressUser(selectedUser: User) {
    onSelectUser(selectedUser);
    navigation.navigate("RolesAndConnection");
  }

  const onGetInActiveUsers = async()=>{
    setSelectedOption(false)
    let isUnactiveUsersFetched =   allUsersInSystem?.find((user )=> !user.statusActive  ) !== undefined
    !isUnactiveUsersFetched && await getAllUsersByStatus(false, allUsersInSystem)
    
  }
 
  return (
    <View style={styles.screenContainer}>
      <SearchBarComponent
        style={{ marginBottom: 25 }}
        arrayToSearch={allUsersInSystem ?? []}
        keys={["firstName", "lastName"]}
        onSearch={setSearchArray}
      />
       <YesNoRadioButtons  isActive={selectedOption} onYes={setSelectedOption} onNo={onGetInActiveUsers}/>
      {searchArray   
      .map((user, index) => selectedOption === user.statusActive && (
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
