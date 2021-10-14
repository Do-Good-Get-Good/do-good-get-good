import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";

import auth from "@react-native-firebase/auth";
import UserContext from "../context/UserContext";
import { MyActivityAsAList } from "../components/MyActivityAsAList";
import Menu from "../components/Menu";

export const MyTimePage = ({ navigation }) => {
  const loggedInUser = useContext(UserContext);

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <Button title="back" onPress={() => navigation.goBack()}></Button>
        <MyActivityAsAList></MyActivityAsAList>
      </ScrollView>
    </SafeAreaView>
  );
};
