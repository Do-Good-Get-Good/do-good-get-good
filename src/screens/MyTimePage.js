import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MyActivityAsAList from "../components/MyActivityAsAList";
import Menu from "../components/Menu";

export const MyTimePage = () => {
  const [makeScrolle, setMakeScrolle] = useState(false);
  //console.log("makeScrolle ", makeScrolle);

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView
        scrollEventThrottle={400}
        onScroll={() => console.log("scroll")}
        onScrollBeginDrag={() => console.log("begin")}
        onScrollEndDrag={() => console.log("end")}
        // onScroll={(e) => {
        //   let paddingToBottom = 10;
        //   paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        //   if (
        //     e.nativeEvent.contentOffset.y >=
        //     e.nativeEvent.contentSize.height - paddingToBottom
        //   ) {
        //     setMakeScrolle(true);
        //   }
        // }}
      >
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
