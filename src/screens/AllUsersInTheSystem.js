import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomLogo from "../components/BottomLogo";
import ListOfAllUsers from "../components/ListOfAllUsers";
import Menu from "../components/Menu";

function AllUsersInTheSystem({ navigation }) {
  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <ListOfAllUsers navigation={navigation} />
        <View style={{ marginTop: 30 }}>
          <BottomLogo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default AllUsersInTheSystem;
