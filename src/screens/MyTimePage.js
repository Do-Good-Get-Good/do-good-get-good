import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import MyActivityAsAList from "../components/MyActivityAsAList";

import Menu from "../components/Menu";

export const MyTimePage = () => {
  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <MyActivityAsAList></MyActivityAsAList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
