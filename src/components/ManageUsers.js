import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import { CheckBox, Overlay, Icon } from "react-native-elements";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { useAdminHomePageFunction } from "../context/AdminHomePageContext";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

const ManageUsers = ({ visible, closeModal, currentActivityId }) => {
  const [myUsers, setMyUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const userData = useAdminHomePageFunction().userData;

  useEffect(() => {
    if (visible) {
      fetchAllMyUsers();
      fetchAllOtherUsers();
    }
  }, [visible]);

  const fetchAllMyUsers = async () => {
    let users = userData.map((user) => {
      let activitesArray = user.activities_and_accumulated_time;

      let userInfo = {
        userID: user.id,
        fullName: `${user.first_name} ${user.last_name}`,
        checked: false,
      };
      for (let i = 0; i < activitesArray.length; i++) {
        if (activitesArray[i].activity_id === currentActivityId) {
          userInfo.checked = true;
        }
      }
      return userInfo;
    });
    setMyUsers(users);
  };

  const fetchAllOtherUsers = async () => {
    let otherUsersRes = await firestore()
      .collection("Users")
      .where("admin_id", "!=", auth().currentUser.uid)
      .where(
        "connected_activities",
        "array-contains",
        currentActivityId.toString()
      )
      .get();

    if (!otherUsersRes.empty) {
      let users = otherUsersRes.docs.map((doc) => {
        let userInfo = {
          fullName: `${doc.data().first_name} ${doc.data().last_name}`,
        };
        return userInfo;
      });
      setOtherUsers(users);
    }
  };

  const updateUser = (pressedUser) => {
    if (!pressedUser.checked) {
      connectNewActivityToUser(pressedUser);
    } else {
      removeActivityFromUser(pressedUser);
    }
  };

  const connectNewActivityToUser = async (pressedUser) => {
    let userToUpdate = firestore().collection("Users").doc(pressedUser.userID);

    let newActivity = {
      accumulated_time: 0,
      activity_id: currentActivityId,
    };

    await userToUpdate
      .update({
        activities_and_accumulated_time:
          firestore.FieldValue.arrayUnion(newActivity),
      })
      .then(() => {
        setMyUsers(checkOrUncheckUser(myUsers, pressedUser));
      });
  };

  const removeActivityFromUser = async (pressedUser) => {
    let userActivites = await firestore()
      .collection("Users")
      .doc(pressedUser.userID)
      .get();
    let activitiesAndAccumulatedTimeArr =
      userActivites.data().activities_and_accumulated_time;
    let userToUpdate = firestore().collection("Users").doc(pressedUser.userID);

    let newActivitiesAndAccumulatedTimeArr =
      activitiesAndAccumulatedTimeArr.filter((activity) => {
        if (activity.activity_id != currentActivityId) {
          return activity;
        }
      });
    await userToUpdate
      .update({
        activities_and_accumulated_time: newActivitiesAndAccumulatedTimeArr,
      })
      .then(() => {
        setMyUsers(checkOrUncheckUser(myUsers, pressedUser));
      });
  };

  const checkOrUncheckUser = (userArr, pressedUser) => {
    let newUserArr = userArr.map((user) => {
      if (pressedUser.fullName === user.fullName) {
        return {
          ...user,
          checked: !pressedUser.checked,
        };
      }
      return user;
    });
    return newUserArr;
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
      <Text style={styles.modalHeader}>Lägg till eller ta bort:</Text>
      <ScrollView style={styles.contentScrollView}>
        <Text style={styles.contentScrollViewHeader1}>Mina användare</Text>
        {myUsers.map((user, index) => (
          <View style={styles.userView} key={index}>
            <Text style={styles.userViewText}>{user.fullName}</Text>
            <CheckBox
              checked={user.checked}
              onPress={() => updateUser(user)}
              containerStyle={styles.checkBoxContainerStyle}
              checkedColor={colors.primary}
            />
          </View>
        ))}
        <Text style={styles.contentScrollViewHeader2}>Andra användare</Text>
        {otherUsers.map((user, index) => (
          <View style={styles.userView} key={index}>
            <Text style={styles.userViewText}>{user.fullName}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableNativeFeedback>
        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Spara</Text>
        </View>
      </TouchableNativeFeedback>
    </Overlay>
  );
};

export default ManageUsers;

const styles = StyleSheet.create({
  overlayStyle: {
    backgroundColor: colors.light,
    width: "90%",
    height: "70%",
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
    padding: 16,
    borderRadius: 2,
  },
  contentScrollViewHeader1: {
    fontWeight: "bold",
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
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
  userViewText: { ...typography.b2 },
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
