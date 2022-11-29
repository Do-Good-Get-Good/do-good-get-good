import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { format } from "date-fns";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { useAdminHomePageFunction } from "../context/AdminHomePageContext";
import { useChangeUserInfoFunction } from "../context/ChangeUserInfoContext";
import { useNetInfo } from "@react-native-community/netinfo";
import {
  confirmTimeEntry,
  incrementTotalConfirmedHoursForUser,
  incrementYearlyTotalHoursForUser,
  updateUsersActivitiesAndAccumulatedTime,
} from "../customFirebaseHooks/updateFunctions";
import { streamTimeEntriesForAdmin } from "../customFirebaseHooks/snapshotFunction";

const ConfirmActivities = () => {
  const [checkAll, setCheckAll] = useState(false);
  const [checked, setChecked] = useState(false);
  const [myUsers, setMyUsers] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  let userData = useAdminHomePageFunction().userData;
  const setUsersId = useAdminHomePageFunction().setUsersId;
  const setReloadOneUserData = useAdminHomePageFunction().setReloadOneUserData;
  const changeUserInfoContext = useChangeUserInfoFunction();
  const inetInfo = useNetInfo();

  useEffect(() => {
    return streamTimeEntriesForAdmin(auth().currentUser.uid).onSnapshot(
      (snapshot) => {
        setSnapshot(null);
        setCheckAll(false);
        setChecked(false);
        setSnapshot(snapshot);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    if (snapshot != null && userData.length != 0) {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          addTimeEntry(change);
        }
        if (change.type === "modified") {
          updateTimeEntry(change);
        }
        if (change.type === "removed") {
          removeTimeEntry(change);
        }
      });
    }
  }, [userData, snapshot]);

  useEffect(() => {
    if (
      changeUserInfoContext.reloadAfterUserNameChanged &&
      changeUserInfoContext.newChangesInUserInfo.userID != 0
    ) {
      let oldArray = myUsers;
      var index = oldArray.findIndex(
        (x) => x.userID === changeUserInfoContext.newChangesInUserInfo.userID
      );
      if (index != -1) {
        oldArray[index].fullName =
          changeUserInfoContext.newChangesInUserInfo.userFirstName +
          " " +
          changeUserInfoContext.newChangesInUserInfo.userLastName;
      }
      setMyUsers(oldArray);
    }
  }, [changeUserInfoContext.reloadAfterUserNameChanged]);

  const addTimeEntry = async (change) => {
    let fullName;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === change.doc.data().user_id) {
        fullName = `${userData[i].first_name} ${userData[i].last_name}`;
      }
    }

    var cheackIfThisTimeEntriesAlreadyExist = myUsers.findIndex(
      (x) => x.timeEntryId === change.doc.id
    );
    if (cheackIfThisTimeEntriesAlreadyExist === -1) {
      const timeEntryData = {
        userID: change.doc.data().user_id,
        fullName: fullName,
        activityID: change.doc.data().activity_id,
        activityName: change.doc.data().activity_title,
        timeEntryDate: format(change.doc.data().date.toDate(), "yyyy-MM-dd"),
        timeEntryHours: change.doc.data().time,
        timeEntryId: change.doc.id,
        checked: false,
        isOpen: false,
      };

      setMyUsers((prev) => [...prev, timeEntryData]);
    }
  };

  const updateTimeEntry = (change) => {
    let modifiedMyUsersArray = myUsers.map((user) => {
      if (user.timeEntryId === change.doc.id) {
        return {
          ...user,
          timeEntryDate: format(change.doc.data().date.toDate(), "yyyy-MM-dd"),
          timeEntryHours: change.doc.data().time,
        };
      } else {
        return user;
      }
    });
    setMyUsers(modifiedMyUsersArray);
  };

  const removeTimeEntry = (change) => {
    let newUserTimeEntryArray = myUsers.filter((timeEntry) => {
      if (timeEntry.timeEntryId != change.doc.id) {
        return timeEntry;
      }
    });
    setMyUsers(newUserTimeEntryArray);
  };

  // Check/uncheck the selected users checkbox
  const markSelected = (selectedUser) => {
    const newUsersArr = myUsers.map((user) => {
      return {
        ...user,
        checked:
          user.timeEntryId === selectedUser.timeEntryId
            ? !user.checked
            : user.checked,
      };
    });
    setMyUsers(newUsersArr);
    if (
      newUsersArr.filter((user) => user.checked === true).length ===
      myUsers.length
    ) {
      setCheckAll(true);
      setChecked(true);
    } else {
      setCheckAll(false);
      setChecked(false);
    }
  };

  // Check/uncheck all users checkbox
  const selectAll = (checked) => {
    if (checked) {
      setCheckAll(true);
      setChecked(true);
      let newUsersArr = myUsers.map((user) => ({
        ...user,
        checked: true,
      }));
      setMyUsers(newUsersArr);
    } else {
      setCheckAll(false);
      setChecked(false);
      let newUsersArr = myUsers.map((user) => ({
        ...user,
        checked: false,
      }));
      setMyUsers(newUsersArr);
    }
  };

  const openSelectedUser = (pressedUser) => {
    const newUsersArr = myUsers.map((user) => {
      return {
        ...user,
        isOpen:
          user.timeEntryId === pressedUser.timeEntryId
            ? !user.isOpen
            : user.isOpen,
      };
    });
    setMyUsers(newUsersArr);
  };

  const confirmSelectedActivities = () => {
    // Filters out all selected users and saves them to a new array
    if (inetInfo.isConnected) {
      let selectedUsers = myUsers.filter((user) => {
        if (user.checked) {
          return user;
        }
      });

      // For every user in 'selectedUsers' call 'confirmActivity'
      let timeEntryIdsToSendToMyUsers = [];
      for (let i = 0; i < selectedUsers.length; i++) {
        timeEntryIdsToSendToMyUsers.push(selectedUsers[i].userID);
        confirmTimeEntry(selectedUsers[i].timeEntryId);
        addTotalConfirmedHours(selectedUsers[i]);
        if (i === selectedUsers.length - 1) {
          setChecked(false);
        }
      }
      setUsersId(timeEntryIdsToSendToMyUsers);
      setReloadOneUserData(true);
    }
  };

  const addAccumulatedTime = (user) => {
    let timeArray = [];

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === user.userID) {
        timeArray = userData[i].activities_and_accumulated_time;
        const objNum = timeArray.findIndex(
          (obj) => obj.activity_id === user.activityID
        );

        timeArray[objNum].accumulated_time += user.timeEntryHours;
      }
    }
    return timeArray;
  };

  const addTotalConfirmedHours = (user) => {
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let accumulatedTime = addAccumulatedTime(user);

    if (
      currentMonth === new Date(user.timeEntryDate).getMonth() &&
      currentYear === new Date(user.timeEntryDate).getFullYear()
    ) {
      incrementTotalConfirmedHoursForUser(user.userID, user.timeEntryHours);
      incrementYearlyTotalHoursForUser(user.userID, user.timeEntryHours);
      updateUsersActivitiesAndAccumulatedTime(user.userID, accumulatedTime);
    } else if (
      currentMonth != new Date(user.timeEntryDate).getMonth() &&
      currentYear === new Date(user.timeEntryDate).getFullYear()
    ) {
      try {
        firestore()
          .collection("Users")
          .doc(user.userID)
          .update({
            total_hours_year: firestore.FieldValue.increment(
              user.timeEntryHours
            ),
            activities_and_accumulated_time: accumulatedTime,
          })
          .catch((error) => {
            console.log("errorMessage ", error);
          });
      } catch (error) {
        console.log("errorMessage ", error);
      }
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Att godkänna</Text>
        <CheckBox
          title="Markera alla"
          iconRight
          disabled={myUsers.length === 0}
          containerStyle={styles.checkBoxStyle}
          checked={checked}
          checkedColor={colors.primary}
          onPress={() => {
            selectAll(!checkAll);
          }}
          textStyle={styles.headerTextSmall}
        />
      </View>
      <View style={styles.content}>
        {myUsers.length > 0
          ? myUsers.map((user, index) => (
              <View key={index} testID="confirmActivities.timeEntryView">
                <TouchableOpacity
                  style={styles.listItemStyle}
                  onPress={() => {
                    openSelectedUser(user);
                  }}
                >
                  <View style={styles.viewForListItemName}>
                    <Text style={styles.listItemNameStyle}>
                      {user.fullName}
                    </Text>
                  </View>
                  <View style={styles.viewForIconAndCheckbox}>
                    <Icon
                      style={styles.icon}
                      color={colors.secondary}
                      name={
                        user.isOpen === true
                          ? "arrow-drop-up"
                          : "arrow-drop-down"
                      }
                      size={30}
                    />
                    <CheckBox
                      iconRight
                      containerStyle={styles.listItemCheckBoxStyle}
                      checked={user.checked}
                      checkedColor={colors.primary}
                      onPress={() => {
                        markSelected(user);
                      }}
                    />
                  </View>
                </TouchableOpacity>
                {user.isOpen && (
                  <View style={styles.listItemContentStyle}>
                    <View style={styles.listItemContentNameView}>
                      <Text style={styles.listItemContentNameStyle}>
                        {user.activityName}
                      </Text>
                    </View>
                    <View style={styles.listItemContentDateView}>
                      <Text style={styles.listItemContentDateStyle}>
                        {user.timeEntryDate}
                      </Text>
                    </View>
                    <View style={styles.listItemContentHourView}>
                      <Text style={styles.listItemContentHourStyle}>
                        {user.timeEntryHours}h
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))
          : myUsers.length < 1 && (
              <View style={styles.viewAllConfirmed}>
                <Text style={{ ...typography.b2 }}>
                  Du har godkänt alla konsulters tider, kolla igen senare!!
                </Text>
              </View>
            )}
      </View>
      <TouchableNativeFeedback
        onPress={() => confirmSelectedActivities()}
        disabled={
          myUsers.filter((user) => user.checked === true).length > 0
            ? false
            : true
        }
      >
        <View
          style={
            myUsers.filter((user) => user.checked === true).length > 0
              ? styles.confirmButton
              : [styles.confirmButton, { backgroundColor: colors.disabled }]
          }
        >
          <Text
            style={
              myUsers.filter((user) => user.checked === true).length > 0
                ? styles.confirmButtonText
                : [styles.confirmButtonText, { opacity: 0.4 }]
            }
          >
            Godkänn
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ConfirmActivities;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 10,
    paddingVertical: 6,
  },
  headerText: { ...typography.title },
  headerTextSmall: { ...typography.b2, fontWeight: "400" },
  checkBoxStyle: {
    borderWidth: 0,
    paddingHorizontal: 0,
    padding: 0,
    right: -2,
    bottom: 1,
    backgroundColor: colors.light,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
  },
  listItemStyle: {
    backgroundColor: colors.background,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  listItemNameStyle: {
    fontWeight: "700",
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
    flex: 1,
  },
  listItemCheckBoxStyle: {
    padding: 0,
    margin: 0,
    marginRight: -2,
  },
  listItemContentStyle: {
    backgroundColor: colors.light,
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 5,
  },
  listItemContentNameView: {
    flex: 1,
  },
  listItemContentDateView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemContentHourView: { flex: 1 },
  listItemContentNameStyle: {
    fontWeight: "700",
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
    paddingRight: 10,
    paddingBottom: 10,
  },
  listItemContentDateStyle: {
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
    paddingBottom: 10,
  },
  listItemContentHourStyle: {
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
  },
  confirmButton: {
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  confirmButtonText: {
    alignSelf: "center",
    fontFamily: typography.button.lg.fontFamily,
    fontSize: typography.button.lg.fontSize,
    fontWeight: "500",
    color: colors.dark,
  },
  viewForIconAndCheckbox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewForListItemName: {
    flex: 1.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewAllConfirmed: {
    alignItems: "center",
    justifyContent: "center",
  },
});
