import React, { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { FAB, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const FloatingActionButton = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <View style={styles.menuItems}>
          <TouchableOpacity
            style={styles.buttonStyle}
            // onPress={() => navigation.navigate("")}
          >
            <Text>Lägg till aktivitet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            // onPress={() => navigation.navigate("")}
          >
            <Text>lägg till användare</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <FAB
        icon={
          <Icon type="material-community" name={isOpen ? "close" : "plus"} />
        }
        visible
        style={styles.fab}
        placement="right"
        color="#84BD00"
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      />
    </>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  fab: {
    bottom: 0,
  },
  menuItems: {
    position: "absolute",
    bottom: 90,
    right: 16,
  },
  buttonStyle: {
    backgroundColor: "#84BD00",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
