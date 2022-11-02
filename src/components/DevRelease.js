import { Text, View } from "react-native";
import React from "react";

const DevRelease = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
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
