import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon, Overlay } from "react-native-elements";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { useSuperAdminFunction } from "../context/SuperAdminContext";
import PopupWithRadioButtons from "./PopupWithRadioButtons";

export function ConnectedUsersDropDown({}) {
  const superAdminContext = useSuperAdminFunction();
  const [userArray, setUserArray] = useState([]);
  const [showPopupWithRadioButtons, setShowPopupWithRadioButtons] =
    useState(false);

  const clickOnPencilIcon = (user) => {
    superAdminContext.setUserIDToConnectAnotherAdmin(user);
    setShowPopupWithRadioButtons(true);
  };

  useEffect(() => {
    setUserArray(
      superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin
    );
  }, [superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin]);

  const changeSelectedForDropDown = (docId) => {
    let tempArray = userArray.map((user) => {
      return {
        ...user,
        selectedForDropDown:
          user.user.docId === docId
            ? !user.selectedForDropDown
            : user.selectedForDropDown,
      };
    });

    setUserArray(tempArray);
  };

  useEffect(() => {
    if (superAdminContext.buttonToSaveChanhgesPressed) {
      setShowPopupWithRadioButtons(false);
    }
  }, [superAdminContext.buttonToSaveChanhgesPressed]);

  const dropDownOpen = useCallback((selected) => {
    let arrow = "";
    if (selected) {
      arrow = "arrow-drop-up";
    } else {
      arrow = "arrow-drop-down";
    }
    return arrow;
  }, []);

  const whatTextToShow = (user) => {
    return (
      <View key={user.user.docId} style={styles.container}>
        <TouchableOpacity
          style={styles.containerForTextAndIcon}
          onPress={() => changeSelectedForDropDown(user.user.docId)}
        >
          <Text style={styles.userAndAdminNames}>
            {user.user.firstName + " " + user.user.lastName}
          </Text>

          <Icon
            color={colors.secondary}
            name={dropDownOpen(user.selectedForDropDown)}
            size={25}
          />
        </TouchableOpacity>

        {user.selectedForDropDown && (
          <View style={styles.containerAdminName}>
            <Text style={styles.adminText}>Admin:</Text>
            <View style={[styles.containerAdminName, styles.adminNameAndIcon]}>
              <Text style={styles.userAndAdminNames}>{user.adminName}</Text>
              <TouchableOpacity
                onPress={() => clickOnPencilIcon(user.user.docId)}
              >
                <Icon
                  color={colors.secondary}
                  type="material-community"
                  name="pencil-outline"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Overlay
          isVisible={showPopupWithRadioButtons}
          animationType="fade"
          overlayStyle={{
            backgroundColor: colors.light,
            width: "90%",
            height: "35%",
            borderRadius: 5,
          }}
          onBackdropPress={() => setShowPopupWithRadioButtons(false)}
        >
          <PopupWithRadioButtons
            titleText={"Ändra admin"}
            showPopup={(showPopupWithRadioButtons) =>
              setShowPopupWithRadioButtons(showPopupWithRadioButtons)
            }
            arrayWithChangedAdmin={(userArray) => setUserArray(userArray)}
          />
        </Overlay>
      </View>
    );
  };

  return (
    <View>{userArray.map((user, index) => whatTextToShow(user, index))}</View>
  );
}
export default ConnectedUsersDropDown;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    marginTop: 10,
    borderRadius: 3,
  },
  containerForTextAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...typography.b1,
    paddingVertical: 14,
  },
  adminText: {
    fontWeight: "500",
    ...typography.b2,
  },
  containerAdminName: {
    flexDirection: "row",
    marginBottom: 7,
  },
  userAndAdminNames: {
    ...typography.b2,
  },
  adminNameAndIcon: {
    paddingLeft: 10,
    paddingRight: 3,
    justifyContent: "space-between",
    flex: 1,
  },
});
