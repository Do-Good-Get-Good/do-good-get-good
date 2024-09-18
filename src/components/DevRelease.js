import React from "react";
import { Text, View } from "react-native";

const DevRelease = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignSelf: "center",
        position: "absolute",
        height: 65,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "red",
          letterSpacing: 1,
        }}
      >
        UTVECKLARLÄGE
      </Text>
    </View>
  );
};

export default DevRelease;
