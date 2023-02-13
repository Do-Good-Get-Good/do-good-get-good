import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { CheckBox, Overlay, Icon } from "react-native-elements";

import auth from "@react-native-firebase/auth";

import { useAdminHomePageFunction } from "../context/AdminHomePageContext";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

import {
  connectNewActivityToUser,
  removeActivityFromUser,
} from "../firebase-functions/update";
import { getAllUsersNotConnectedToAdmin } from "../firebase-functions/get";

const ManageUsers = ({ visible, closeModal, currentActivityId }) => {
  const [myUsers, setMyUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const userData = useAdminHomePageFunction().userData;

  useEffect(() => {
    if (visible) {
      fetchAllMyUsers();
      fetchAllOtherUsers();
    }

    return () => {
      setOtherUsers([]);
    };
  }, [visible]);

  const fetchAllMyUsers = () => {
    if (myUsers.length === 0) {
      let users = userData.map((user) => {
        let connectedActivitiesArray = user.connected_activities;

        let userInfo = {
          userID: user.id,
          fullName: `${user.first_name} ${user.last_name}`,
          checked: false,
        };
        for (let i = 0; i < connectedActivitiesArray.length; i++) {
          if (connectedActivitiesArray[i] === currentActivityId) {
            userInfo.checked = true;
          }
        }
        return userInfo;
      });
      setMyUsers(users);
    }
  };

  const fetchAllOtherUsers = async () => {
    try {
      let otherUsers = await getAllUsersNotConnectedToAdmin(
        auth().currentUser.uid,
        currentActivityId.toString()
      );
      setOtherUsers(otherUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUsers = () => {
    myUsers.map((user) => {
      if (user.checked) {
        connectNewActivityToUser(user.userID, currentActivityId.toString());
      } else removeActivityFromUser(user.userID, currentActivityId.toString());
    });
    closeModal();
  };

  const checkOrUncheckUser = (pressedUser) => {
    let newUserArr = myUsers.map((user) => {
      if (pressedUser.fullName === user.fullName) {
        return {
          ...user,
          checked: !pressedUser.checked,
        };
      }
      return user;
    });
    setMyUsers(newUserArr);
  };

  return (
    <Overlay
      visible={visible}
      onBackdropPress={() => closeModal()}
      overlayStyle={styles.overlayStyle}
      backdropStyle={styles.backdropStyle}
      animationType="fade"
    >
      <Pressable style={styles.closeButton} onPress={() => closeModal()}>
        <Icon name="close" size={35} />
      </Pressable>
      <Text testID="test.modalHeader" style={styles.modalHeader}>
        Lägg till eller ta bort:
      </Text>
      <ScrollView style={styles.contentScrollView}>
        <Text
          testID="test.myUsersHeader"
          style={styles.contentScrollViewHeader1}
        >
          Mina användare
        </Text>
        {myUsers.length != 0 ? (
          myUsers.map((user, index) => (
            <View testID="test.userView" style={styles.userView} key={index}>
              <Text
                testID={`test.userFullName${index}`}
                style={styles.userViewText}
              >
                {user.fullName}
              </Text>
              <CheckBox
                checked={user.checked}
                onPress={() => checkOrUncheckUser(user)}
                containerStyle={styles.checkBoxContainerStyle}
                checkedColor={colors.primary}
              />
            </View>
          ))
        ) : (
          <View testID="test.userView" style={styles.userView}>
            <Text style={styles.userViewText}>
              Du har inga användare kopplade till dig
            </Text>
          </View>
        )}
        <Text
          testID="test.otherUsersHeader"
          style={styles.contentScrollViewHeader2}
        >
          Andra användare
        </Text>
        {otherUsers.length > 0 ? (
          otherUsers.map((user, index) => (
            <View
              testID="test.otherUsersView"
              style={
                index != otherUsers.length - 1
                  ? styles.userView
                  : [styles.userView, styles.lastUserView]
              }
              key={index}
            >
              <Text
                testID={`test.otherUserFullName${index}`}
                style={styles.userViewText}
              >
                {user.fullName}
              </Text>
            </View>
          ))
        ) : (
          <View testID="test.otherUsersView" style={styles.noOtherUsersView}>
            <Text testID="test.noOtherUsers" style={styles.userViewText}>
              Inga andra användare är kopplade till den här aktiviteten!
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={() => updateUsers()}>
        <Text style={styles.saveButtonText}>Spara</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default ManageUsers;

const styles = StyleSheet.create({
  overlayStyle: {
    backgroundColor: colors.light,
    width: "90%",
    maxHeight: "75%",
    borderRadius: 5,
    margin: 0,
    padding: 0,
  },
  backdropStyle: {
    backgroundColor: "#000000",
    opacity: 0.5,
  },
  closeButton: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: colors.background,
    borderRadius: 25,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  modalHeader: {
    ...typography.title,
    marginLeft: 22,
    marginTop: 14,
  },
  contentScrollView: {
    backgroundColor: colors.background,
    margin: 22,
    paddingHorizontal: 16,
    borderRadius: 2,
  },
  contentScrollViewHeader1: {
    fontWeight: "bold",
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    marginTop: 14,
    marginBottom: 8,
  },
  contentScrollViewHeader2: {
    fontWeight: "bold",
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    marginTop: 16,
    marginBottom: 8,
  },
  userView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  lastUserView: {
    marginBottom: 22,
  },
  userViewText: {
    ...typography.b2,
  },
  noOtherUsersView: {
    paddingVertical: 5,
    marginBottom: 22,
  },
  checkBoxContainerStyle: {
    padding: 0,
    margin: 0,
    right: -10,
  },
  saveButton: {
    backgroundColor: colors.primary,
    bottom: 0,
    left: 0,
    right: 0,
    height: 54,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    ...typography.button.lg,
  },
});
