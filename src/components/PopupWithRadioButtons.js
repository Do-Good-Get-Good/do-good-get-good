import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { ScrollView } from "react-native-gesture-handler";
import { useSuperAdminFunction } from "../context/SuperAdminContext";

export function PopupWithRadioButtons({ titleText, showPopup }) {
  const [radioButtonPressed, setRadioButtonPressed] = useState(true);
  const superAdminContext = useSuperAdminFunction();
  const [connectedAdminID, setConnectedAdminID] = useState({
    adminName: "",
    adminId: "",
  });
  const [allAdminsAnsSuperAdmin, setAllAdminsAnsSuperAdmin] = useState(
    superAdminContext.allAdminsAnsSuperAdmins
  );

  useEffect(() => {
    setConnectedAdminID({
      adminName: superAdminContext.makeChangesForSelectedUser.adminName,
      adminId: superAdminContext.makeChangesForSelectedUser.user.admin_id,
    });
  }, [superAdminContext.makeChangesForSelectedUser.user.admin_id]);

  useEffect(() => {
    setAllAdminsAnsSuperAdmin(superAdminContext.allAdminsAnsSuperAdmins);
  }, [superAdminContext.allAdminsAnsSuperAdmins]);

  ///if ok then it should be sent to context to firebase

  function changeConnectedAdmin() {
    let userObject = superAdminContext.makeChangesForSelectedUser;
    if (
      connectedAdminID.adminId !=
        superAdminContext.makeChangesForSelectedUser.user.doc_id &&
      connectedAdminID.adminId != ""
    ) {
      userObject.adminName = connectedAdminID.adminName;
      userObject.user.admin_id = connectedAdminID.adminId;

      // chooseNewAdmin(userObject);

      superAdminContext.setMakeChangesForSelectedUserFromPopup(userObject);
      showPopup(false);
    }
  }

  console.log("connectedAdminID,  ", connectedAdminID);
  return (
    <View>
      <ScrollView>
        <Text style={styles.textTitle}>{titleText}</Text>
        <View style={{ backgroundColor: colors.background }}>
          {allAdminsAnsSuperAdmin.map((user, index) => (
            <View style={styles.containerTextAndRadioButtins} key={user.doc_id}>
              <Text>{user.first_name + " " + user.last_name}</Text>
              <TouchableOpacity
                onPress={() =>
                  setConnectedAdminID({
                    adminName: user.first_name + " " + user.last_name,
                    adminId: user.doc_id,
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
                      user.doc_id === connectedAdminID.adminId
                        ? colors.primary
                        : colors.background,
                    borderColor: colors.dark,
                    borderWidth: 1,
                  }}
                >
                  {user.doc_id === connectedAdminID.adminId ? (
                    <View style={styles.smallCircul}></View>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => changeConnectedAdmin()}
        style={styles.okButton}
      >
        <Text>Ok</Text>
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
    ...typography.lg,
    fontWeight: "500",
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 17,
  },
});
