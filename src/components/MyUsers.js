import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { format } from "date-fns";
import { Icon, Dialog } from "react-native-elements";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import TimeStatistics from "./TimeStatistics";

import adminStore from "../store/adminStore";

import { Observer } from "mobx-react-lite";
import firestore from "@react-native-firebase/firestore";
import { Sort } from "../lib/enums/sort";

const MyUsers = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);
  const sortOptions = [Sort.Alphabetically, Sort.Inactive];
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const sortUsers = (sortOption) => {
    switch (sortOption) {
      case Sort.Alphabetically:
        adminStore.filterUsersByActiveStatus(true);
        break;
      case Sort.Inactive:
        adminStore.filterUsersByActiveStatus(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let unsubscribeArr = [];
    const subscribeToUserTimeObjects = async () => {
      adminStore.allUsers.map((user) => {
        let unsubscribe = firestore()
          .collection("Users")
          .doc(user.userID)
          .onSnapshot((snapshot) => {
            let userId = snapshot.id;
            let timeObject = {
              paidTime: snapshot.data().total_hours_year,
              currentForMonth: snapshot.data().total_hours_month,
            };
            // Push to adminStore
            adminStore.updateUserTimeObject(userId, timeObject);
          });
        unsubscribeArr.push(unsubscribe);
      });
    };

    subscribeToUserTimeObjects();

    return () => {
      unsubscribeArr.map((unsub) => unsub());
    };
  }, []);

  useEffect(() => {
    sortUsers(sortBy);
  }, [sortBy]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mina användare</Text>
        <TouchableOpacity
          testID="smallDropdown"
          style={styles.sortDropdownStyle}
          onPress={() => setExpanded(!expanded)}
        >
          <View style={styles.styleForDropdown}>
            <Text testID="dropdownText" style={styles.listItemNameStyle}>
              {sortBy}
            </Text>
            <Icon
              color="#5B6770"
              style={styles.sortIcon}
              name={expanded === true ? "arrow-drop-up" : "arrow-drop-down"}
              size={30}
            />
          </View>
        </TouchableOpacity>
        {expanded && (
          <View style={styles.dropdown}>
            {sortOptions.map((option, index) => (
              <TouchableOpacity
                testID={`insideSmallDropdown ${index}`}
                key={index}
                onPress={() => {
                  setSortBy(option);
                  setExpanded(false);
                }}
              >
                <View style={styles.dropdownItem}>
                  <Text testID={`insideSmallDropdownText ${index}`}>
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View testID="contentViewId" style={styles.content}>
        <Observer>
          {() => (
            <>
              {adminStore.loading && (
                <Dialog.Loading
                  loadingProps={{ color: "#84BD00" }}
                ></Dialog.Loading>
              )}
              {adminStore.users.map((user, index) => (
                <View key={index}>
                  <TouchableOpacity
                    testID={`userDropdown ${index}`}
                    style={styles.listItemContainerStyle}
                    onPress={() => {
                      adminStore.openSelectedUser(user);
                    }}
                  >
                    <View style={styles.listItemStyle}>
                      <Text
                        testID={`user ${index} name`}
                        style={[
                          styles.listItemNameStyle,
                          {
                            textDecorationLine: user.isOpen
                              ? "underline"
                              : "none",
                          },
                        ]}
                      >
                        {`${user.firstName} ${user.lastName}`}
                      </Text>
                      <Icon
                        color="#5B6770"
                        style={styles.sortIcon}
                        name={
                          user.isOpen === true
                            ? "arrow-drop-up"
                            : "arrow-drop-down"
                        }
                        size={30}
                      />
                    </View>
                  </TouchableOpacity>
                  {user.isOpen && (
                    <>
                      <TimeStatistics timeObject={[user.timeObject]} />
                      {user.timeEntries.map((timeEntry, index) => (
                        <View key={index}>
                          <View key={index} style={styles.listItemContentStyle}>
                            <View style={styles.listItemContentNameView}>
                              <Text
                                testID={`user timeEntry ${index} title`}
                                style={styles.listItemContentNameStyle}
                              >
                                {timeEntry.activity_title}
                              </Text>
                            </View>
                            <View style={styles.listItemContentDateView}>
                              <Text
                                testID={`user timeEntry ${index} date`}
                                style={styles.listItemContentDateStyle}
                              >
                                {format(timeEntry.date.toDate(), "yyyy-MM-dd")}
                              </Text>
                            </View>
                            <View style={styles.listItemContentHourView}>
                              <Text
                                testID={`user timeEntry ${index} time`}
                                style={styles.listItemContentHourStyle}
                              >
                                {`${timeEntry.time} tim`}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}
                      <View style={styles.editUserIconView}>
                        <TouchableOpacity
                          testID="editIcon"
                          onPress={() =>
                            navigation.navigate("ChangeUser", {
                              userName: user.firstName,
                              userSurname: user.lastName,
                              statusActive: user.statusActive,
                              userID: user.userID,
                              sortBy,
                            })
                          }
                        >
                          <Icon
                            name="pencil-outline"
                            type="material-community"
                            size={25}
                            containerStyle={styles.editUserIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              ))}
              {adminStore.users.length === 0 && (
                <Text style={styles.noInactiveUsers}>
                  Du har inga inaktiva användare
                </Text>
              )}
            </>
          )}
        </Observer>
      </View>
    </View>
  );
};

export default MyUsers;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  headerText: {
    width: "55%",
    fontSize: 22,
  },

  styleForDropdown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  sortDropdownStyle: {
    width: "45%",
    backgroundColor: "#F5F5F5",
  },
  dropdown: {
    width: "45%",
    position: "absolute",
    right: 0,
    top: 45,
    backgroundColor: "#FFFFFF",
    elevation: 5,

    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 1 },
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  content: {
    marginBottom: 10,
    zIndex: -1,
  },
  listItemContainerStyle: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  listItemStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  listItemNameStyle: {
    fontSize: 18,
  },
  listItemContentStyle: {
    marginTop: -10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  listItemContentNameView: { flex: 1 },
  listItemContentDateView: { flex: 1 },
  listItemContentHourView: { flex: 1 },
  listItemContentNameStyle: { fontWeight: "bold" },
  listItemContentDateStyle: { textAlign: "center" },
  listItemContentHourStyle: { textAlign: "center" },
  editUserIconView: {
    alignItems: "flex-end",
    backgroundColor: "white",
    position: "relative",
    bottom: 10,
    width: "100%",
    paddingTop: 75,
  },
  editUserIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  noInactiveUsers: {
    ...typography.b2,
    textAlign: "center",
    marginTop: 20,
    color: colors.dark,
  },
});
