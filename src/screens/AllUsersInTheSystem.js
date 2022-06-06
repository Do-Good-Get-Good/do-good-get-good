import { ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import ListOfAllUsers from "../components/ListOfAllUsers";
import BottomLogo from "../components/BottomLogo";
function AllUsersInTheSystem({ navigation }) {
  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <ListOfAllUsers navigation={navigation} />
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
}
export default AllUsersInTheSystem;
