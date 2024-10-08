import { useNavigation } from "@react-navigation/native";
import { FAB, Icon } from "@rneui/base";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

const FloatingActionButton = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      {isOpen && (
        <>
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View style={StyleSheet.absoluteFill}></View>
          </TouchableWithoutFeedback>
          <View style={styles.menuItems}>
            <TouchableOpacity
              testID="createActivity.button"
              style={styles.buttonStyle}
              onPress={() => {
                setIsOpen(false);
                navigation.navigate("CreateActivity");
              }}
            >
              <Text style={styles.buttonText}>Lägg till aktivitet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="CreateUser.button"
              style={styles.buttonStyle}
              onPress={() => {
                setIsOpen(false);
                navigation.navigate("CreateUser");
              }}
            >
              <Text style={styles.buttonText}>Lägg till användare</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <FAB
        icon={
          <Icon type="material-community" name={isOpen ? "close" : "plus"} />
        }
        testID="open.button"
        visible
        style={styles.fab}
        placement="right"
        color={colors.primary}
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
    ...Platform.select({
      ios: {
        bottom: 18,
      },
      android: {
        bottom: 0,
      },
    }),
    zIndex: 1,
  },
  menuItems: {
    position: "absolute",
    ...Platform.select({
      ios: {
        bottom: 100,
      },
      android: {
        bottom: 80,
      },
    }),
    right: 16,
  },
  buttonStyle: {
    backgroundColor: colors.primary,
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
    zIndex: 1,
  },
  buttonText: {
    fontFamily: typography.button.sm.fontFamily,
    fontSize: typography.button.sm.fontSize,
  },
});
