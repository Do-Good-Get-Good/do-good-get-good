import React, { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { FAB, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const FloatingActionButton = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      {isOpen ? (
        <View style={styles.menuItems}>
          <TouchableOpacity
            testID="createActivity.button"
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate("CreateActivity", {
                creatingNewUser: false,
                activityExist: false,
              });
              setIsOpen(false);
            }}
          >
            <Text>Lägg till aktivitet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="CreateOrChangeUser.button"
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate("CreateOrChangeUser", {
                createNewUser: true,
              });
            }}
          >
            <Text>Lägg till användare</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <FAB
        icon={
          <Icon type="material-community" name={isOpen ? "close" : "plus"} />
        }
        testID="open.button"
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
    zIndex: 1,
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
