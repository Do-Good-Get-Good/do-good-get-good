import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { useNetInfo } from "@react-native-community/netinfo";
import {
  confirmTimeEntry,
  incrementTotalConfirmedHoursForUser,
  incrementYearlyTotalHoursForUser,
  updateUsersActivitiesAndAccumulatedTime,
} from "../firebase-functions/update";
import useTimeEntriesForAdmin from "../hooks/useTimeEntriesForAdmin";

import adminStore from "../store/adminStore";

import { Observer } from "mobx-react-lite";
import { autorun } from "mobx";

const ConfirmActivities = () => {
  let userData = adminStore.allUsers;

  const { myUsers, setMyUsers } = useTimeEntriesForAdmin(userData);

  const [checkAll, setCheckAll] = useState(false);
  const [checked, setChecked] = useState(false);
  const inetInfo = useNetInfo();

  useEffect(() => {
    return autorun(() => {
      if (adminStore.updatedUser) {
        const updatedUser = adminStore.updatedUserInfo;
        let newArr = myUsers.map((user) => {
          if (user.userID !== updatedUser.userID) return user;
          return {
            ...user,
            fullName: `${updatedUser.userFirstName} ${updatedUser.userLastName}`,
          };
        });
        setMyUsers(newArr);
      }
    });
  }, [adminStore.updatedUser]);

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
      let userIds = [];
      selectedUsers.map((selectedUser, i) => {
        userIds.push(selectedUser.userID);
        confirmTimeEntry(selectedUser.timeEntryId);
        addTotalConfirmedHours(selectedUser);
        if (i === selectedUsers.length - 1) {
          setChecked(false);
        }
      });
      adminStore.updateUserTimeEntries(userIds);
    }
  };

  const addAccumulatedTime = (selectedUser) => {
    let timeArray;
    userData.map((user) => {
      if (user.userID === selectedUser.userID) {
        timeArray = user.activitiesAndAccumulatedTime;
        const objNum = timeArray.findIndex(
          (obj) => obj.activity_id === selectedUser.activityID
        );
        timeArray[objNum].accumulated_time += selectedUser.timeEntryHours;
      }
    });
    return timeArray;
  };

  const addTotalConfirmedHours = (user) => {
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let accumulatedTime = addAccumulatedTime(user);

    let timeEntryMonth = new Date(user.timeEntryDate).getMonth();
    let timeEntryYear = new Date(user.timeEntryDate).getFullYear();

    if (currentMonth === timeEntryMonth && currentYear === timeEntryYear) {
      incrementTotalConfirmedHoursForUser(user.userID, user.timeEntryHours);
      incrementYearlyTotalHoursForUser(user.userID, user.timeEntryHours);
      updateUsersActivitiesAndAccumulatedTime(user.userID, accumulatedTime);
    } else if (
      currentMonth !== timeEntryMonth &&
      currentYear === timeEntryYear
    ) {
      incrementYearlyTotalHoursForUser(user.userID, user.timeEntryHours);
      updateUsersActivitiesAndAccumulatedTime(user.userID, accumulatedTime);
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
        <Observer>
          {() => (
            <>
              {myUsers.length !== 0 &&
                myUsers.map((user, index) => (
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
                ))}
              {myUsers.length === 0 && (
                <View style={styles.viewAllConfirmed}>
                  <Text style={{ ...typography.b2 }}>
                    Du har godkänt alla konsulters tider, kolla igen senare!!
                  </Text>
                </View>
              )}
            </>
          )}
        </Observer>
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
