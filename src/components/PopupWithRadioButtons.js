import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { ScrollView } from "react-native-gesture-handler";
import { useSuperAdminFunction } from "../context/SuperAdminContext";

export function PopupWithRadioButtons({
  titleText,
  showPopup,
  arrayWithChangedAdmin,
  listOfRoles,
}) {
  const [radioButtonPressed, setRadioButtonPressed] = useState(true);
  const superAdminContext = useSuperAdminFunction();
  const [connectedAdminID, setConnectedAdminID] = useState({
    adminName: "",
    adminId: "",
  });
  const [allAdminsAnsSuperAdmin, setAllAdminsAnsSuperAdmin] = useState(
    superAdminContext.allAdminsAnsSuperAdmins
  );

  const [selectedUserHasRole, setSelectedUserHasRole] = useState({});

  const [showRole, setShowRole] = useState(false);

  useEffect(() => {
    if (listOfRoles != undefined && listOfRoles.length != 0) {
      setSelectedUserHasRole(superAdminContext.makeChangesForSelectedUser);
      setShowRole(true);
    }
  }, [listOfRoles]);

  function textToShowIfRole(role) {
    var text = "";
    if (role === "user") {
      text = "User";
    } else if (role === "admin") {
      text = "Admin";
    } else if (role === "superadmin") {
      text = "Super admin";
    }
    return text;
  }

  useEffect(() => {
    if (superAdminContext.userIDToConnectAnotherAdmin != "") {
      var indexOfUserWhosedminIDNeedsToBeChange =
        superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin.findIndex(
          (x) => x.user.docId === superAdminContext.userIDToConnectAnotherAdmin
        );
      setConnectedAdminID({
        adminName:
          superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin[
            indexOfUserWhosedminIDNeedsToBeChange
          ].user.adminName,
        adminId:
          superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin[
            indexOfUserWhosedminIDNeedsToBeChange
          ].user.adminId,
      });
    }
  }, [superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin]);

  useEffect(() => {
    setAllAdminsAnsSuperAdmin(superAdminContext.allAdminsAnsSuperAdmins);
  }, [superAdminContext.allAdminsAnsSuperAdmins]);

  ///if ok then it should be sent to context to firebase

  function changeConnectedAdmin() {
    let changeAdminObject = superAdminContext.makeChangesForSelectedUser;

    var indexOfUserWhosedminIDNeedsToBeChange =
      changeAdminObject.arrayOfUsersIfAdmin.findIndex(
        (x) => x.user.docId === superAdminContext.userIDToConnectAnotherAdmin
      );
    changeAdminObject.arrayOfUsersIfAdmin[
      indexOfUserWhosedminIDNeedsToBeChange
    ].user.adminId = connectedAdminID.adminId;

    changeAdminObject.arrayOfUsersIfAdmin[
      indexOfUserWhosedminIDNeedsToBeChange
    ].adminName = connectedAdminID.adminName;

    //superAdminContext.setMakeChangesForSelectedUserFromPopup(changeAdminObject);
    arrayWithChangedAdmin(changeAdminObject.arrayOfUsersIfAdmin);

    showPopup(false);
  }
  const changeRoleOfTheSelectedUser = (userRole) => {
    let temObject = selectedUserHasRole;
    temObject.user.role = userRole;

    setSelectedUserHasRole(temObject);
  };

  function ifChangeRole() {
    return (
      <View style={{ backgroundColor: colors.background }}>
        {listOfRoles.map((role, index) => (
          <View style={styles.containerTextAndRadioButtins} key={index}>
            <Text>{textToShowIfRole(role)}</Text>
            <TouchableOpacity
              onPress={() => changeRoleOfTheSelectedUser(role)}
              style={styles.radioButtons}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  backgroundColor:
                    role === selectedUserHasRole.user.role
                      ? colors.primary
                      : colors.background,
                  borderColor: colors.dark,
                  borderWidth: 1,
                }}
              >
                {role === selectedUserHasRole.user.role ? (
                  <View style={styles.smallCircul}></View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  function ifChangeAdmin() {
    return (
      <View style={{ backgroundColor: colors.background }}>
        {allAdminsAnsSuperAdmin.map((user, index) => (
          <View style={styles.containerTextAndRadioButtins} key={user.docId}>
            <Text>{user.firstName + " " + user.lastName}</Text>
            <TouchableOpacity
              onPress={() =>
                setConnectedAdminID({
                  adminName: user.firstName + " " + user.lastName,
                  adminId: user.docId,
                })
              }
              style={styles.radioButtons}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  backgroundColor:
                    user.docId === connectedAdminID.adminId
                      ? colors.primary
                      : colors.background,
                  borderColor: colors.dark,
                  borderWidth: 1,
                }}
              >
                {user.docId === connectedAdminID.adminId ? (
                  <View style={styles.smallCircul}></View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  console.log("connectedAdminID,  ", connectedAdminID);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.textTitle}>{titleText}</Text>
        {showRole ? ifChangeRole() : ifChangeAdmin()}
      </ScrollView>
      <TouchableOpacity
        // onPress={() => changeConnectedAdmin()}
        style={styles.okButton}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "500", ...typography.lg }}
        >
          Ok
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default PopupWithRadioButtons;

const styles = StyleSheet.create({
  containerTextAndRadioButtins: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 22,
    color: colors.background,
  },
  textTitle: {
    ...typography.title,
    margin: 12,
  },
  smallCircul: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    margin: 4,
    backgroundColor: colors.dark,
  },
  okButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 17,
    marginTop: 30,
  },
});
