import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import PopupWithRadioButtons from "./PopupWithRadioButtons";

export function ConnectedUsersDropDown({
  usersConnectedToTheAdmin,
  adminName,
}) {
  const [userArray, setUserArray] = useState(usersConnectedToTheAdmin);
  const [showPopupWithRadioButtons, setShowPopupWithRadioButtons] =
    useState(true);

  //console.log("userArray   ", userArray);

  const allAdmins = () => {
    let adminArray = [];
    for (let i = 0; i < userArray.length; i++) {
      if (
        userArray[i].user.role === "admin" ||
        userArray[i].user.role === "superadmin"
      ) {
        adminArray.push(userArray[i].user);
      }
    }
    return adminArray;
  };

  const clickOnPencilIcon = (user) => {
    setShowPopupWithRadioButtons(true);
  };

  function changeSelectedForDropDown(index) {
    let tempArray = userArray;
    let selected = tempArray[index].selectedForDropDown;
    tempArray[index].selectedForDropDown = !selected;
    setUserArray(tempArray);
  }

  const dropDownOpen = useCallback((selected) => {
    // console.log("selected  ", selected);
    let arrow = "";
    if (selected) {
      arrow = "arrow-drop-up";
    } else {
      arrow = "arrow-drop-down";
    }
    return arrow;
  }, []);

  const whatTextToShow = (user, index) => {
    return (
      <View key={user.user.doc_id} style={styles.container}>
        <TouchableOpacity
          style={styles.containerForTextAndIcon}
          onPress={() => changeSelectedForDropDown(index)}
        >
          <Text style={styles.userAndAdminNames}>
            {user.user.first_name + " " + user.user.last_name}
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
              <Text style={styles.userAndAdminNames}>{adminName}</Text>
              <TouchableOpacity onPress={() => clickOnPencilIcon()}>
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
            height: "30%",
            borderRadius: 5,
          }}
          onBackdropPress={() => setShowPopupWithRadioButtons(false)}
        >
          <PopupWithRadioButtons
            titleText={"Ändra admin"}
            arrayList={allAdmins()}
          />
          <TouchableOpacity style={styles.okButton}>
            <Text>Ok</Text>
          </TouchableOpacity>
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
  okButton: {
    ...typography.lg,
    fontWeight: "500",
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 17,
  },
});
