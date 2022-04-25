import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MyActivityAsAList from "../components/MyActivityAsAList";
import { useActivityFunction } from "../context/ActivityContext";
import Menu from "../components/Menu";

export const MyTimePage = () => {
  const [makeScrolle, setMakeScrolle] = useState(false);
  const activityContext = useActivityFunction();
  //console.log("makeScrolle ", makeScrolle);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => activityContext.setScrollToGetMoreTimeEntries(true)}
        >
          <Text>button</Text>
        </TouchableOpacity>
        <MyActivityAsAList></MyActivityAsAList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
