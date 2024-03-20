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

import { User } from "../utility/types";
import { useOnSelectUser } from "../hooks/superAdmin/useOnSelectUser";
import { useSuperAdminFunction } from "../context/SuperAdminContext";
import { SearchBarComponent } from "./SearchBarComponent";
import { RadioButton } from "./Buttons/RadioButton";

type Props = {
  navigation: any;
};

export function ListOfAllUsers({ navigation }: Props) {
  const superAdminContext = useSuperAdminFunction();
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);


  const allUsersInSystem = superAdminContext?.allUsersInSystem;
  const { onSelectUser } = useOnSelectUser();
  const [searchArray, setSearchArray] = useState<User[]>(
    allUsersInSystem ?? [],
  );

  function onPressUser(selectedUser: User) {
    onSelectUser(selectedUser);
    navigation.navigate("RolesAndConnection");
  }
  const handleSelectOption = (value: boolean) => {
    setSelectedOption(value);
    console.log(`Selected Option: ${value ? "Active Users" : "In Active"}`);
  };


  return (
    <View style={styles.screenContainer}>
      <SearchBarComponent
        style={{ marginBottom: 25 }}
        arrayToSearch={allUsersInSystem ?? []}
        keys={["firstName", "lastName"]}
        onSearch={setSearchArray}
      />
      <View style={styles.radioButton}>
        <Text> Activa:</Text>
        <RadioButton
          label="Ja"
          onPress={() => handleSelectOption(true)}
          selected={selectedOption === true}
        />
        <RadioButton
          label="Nej"
          onPress={() => handleSelectOption(false)}
          selected={selectedOption === false}
        />
      </View>
      {searchArray.map((user, index) => (
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
  radioButton:{
    flexDirection:'row',

  }
});
