import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Dialog } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";

import { format, set } from "date-fns";
import { Icon } from "react-native-elements";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { useChangeUserInfoFunction } from "../context/ChangeUserInfoContext";
import { useAdminHomePageFunction } from "../context/AdminHomePageContext";

const MyUsers = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);
  const [myUsers, setMyUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const sortOptions = ["A - Ö", "Inaktiva"];
  const [sortBy, setSortBy] = useState("A - Ö");
  const [loadingData, setLoadingData] = useState(true);
  const [myUsersLoading, setMyUsersLoading] = useState(true);

  let userData = useAdminHomePageFunction().userData;
  const confirmedTimeEntries = useAdminHomePageFunction().confirmedTimeEntries;
  const setReloadOneUserData = useAdminHomePageFunction().setReloadOneUserData;
  const reloadOneUserData = useAdminHomePageFunction().reloadOneUserData;
  const newUser = useAdminHomePageFunction().newUser;
  const setNewUser = useAdminHomePageFunction().setNewUser;

  const changeUserInfoContext = useChangeUserInfoFunction();

  useEffect(() => {
    if (!reloadOneUserData) {
      fetchUserTimeEntries();
    }
  }, [userData]);

  useEffect(() => {
    if (newUser != null) {
      setLoadingData(true);
      let userInfo = {
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        timeEntries: [],
        isOpen: false,
        statusActive: newUser.status_active,
        userID: newUser.id,
      };
      setAllUsers((prev) => [...prev, userInfo]);
      setNewUser(null);
    }
  }, [newUser]);

  useEffect(() => {
    if (confirmedTimeEntries.length != 0) {
      let oldArray = allUsers;
      for (let j = 0; j < confirmedTimeEntries.length; j++) {
        var index = oldArray.findIndex(
          (x) => x.userID === confirmedTimeEntries[j][0].user_id
        );
        if (index != -1) {
          oldArray[index].timeEntries = confirmedTimeEntries[j];
        }
      }

      setAllUsers(oldArray);
      setLoadingData(true);

      setReloadOneUserData(false);
    }
  }, [confirmedTimeEntries]);

  useEffect(() => {
    if (
      changeUserInfoContext.reloadAfterUserNameChanged &&
      changeUserInfoContext.newChangesInUserInfo.userID != 0
    ) {
      let oldArray = allUsers;

      var index = oldArray.findIndex(
        (x) => x.userID === changeUserInfoContext.newChangesInUserInfo.userID
      );
      if (index != -1) {
        oldArray[index].firstName =
          changeUserInfoContext.newChangesInUserInfo.userFirstName;
        oldArray[index].lastName =
          changeUserInfoContext.newChangesInUserInfo.userLastName;
        oldArray[index].statusActive =
          changeUserInfoContext.newChangesInUserInfo.statusActive;
      }
      setAllUsers(oldArray);
      setLoadingData(true);
      changeUserInfoContext.setReloadAfterUserNameChanged(false);
    }
  }, [changeUserInfoContext.reloadAfterUserNameChanged]);

  const fetchUserTimeEntries = async () => {
    if (userData.length != 0 && userData != null && allUsers.length === 0) {
      for (let i = 0; i < userData.length; i++) {
        try {
          await firestore()
            .collection("timeentries")
            .where("user_id", "==", userData[i].id)
            .where("status_confirmed", "==", true)
            .orderBy("date", "desc")
            .limit(5)
            .get()
            .then((response) => {
              let userInfo = {
                firstName: userData[i].first_name,
                lastName: userData[i].last_name,
                timeEntries: response.docs.map((doc) => doc.data()),
                isOpen: false,
                statusActive: userData[i].status_active,
                userID: userData[i].id,
              };

              setAllUsers((prev) => [...prev, userInfo]);
              setLoadingData(true);
            })
            .catch((error) => console.log("MyUsers ", error));
        } catch (error) {
          console.log("MyUsers ", error);
        }
      }

      setMyUsersLoading(false);
      setLoadingData(false);
    }
  };

  const openSelectedUser = (pressedUser) => {
    let pressedUserFullName =
      pressedUser.firstName + " " + pressedUser.lastName;
    const newUsersArr = myUsers.map((user) => {
      let fullName = user.firstName + " " + user.lastName;
      return {
        ...user,
        isOpen: fullName === pressedUserFullName ? !user.isOpen : user.isOpen,
      };
    });
    setMyUsers(newUsersArr);
  };

  const sortUsers = (sortOption) => {
    if (sortOption === "A - Ö") {
      setMyUsers(
        activeUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))
      );
    }

    if (sortOption === "Inaktiva") {
      setMyUsers(
        inactiveUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))
      );
    }
  };

  useEffect(() => {
    if (loadingData) {
      let arrayWithActiveUsers = allUsers.filter((user) => {
        if (user.statusActive) {
          return user;
        }
      });
      setActiveUsers(arrayWithActiveUsers);

      let arrayWithInactiveUsers = allUsers.filter((user) => {
        if (!user.statusActive) {
          return user;
        }
      });
      setInactiveUsers(arrayWithInactiveUsers);
      setLoadingData(false);
    }
  }, [allUsers, loadingData]);

  useEffect(() => {
    sortUsers(sortBy);
  }, [activeUsers, inactiveUsers]);

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

        {expanded === true ? (
          <View style={styles.dropdown}>
            {sortOptions.map((option, index) => (
              <TouchableNativeFeedback
                testID={`insideSmallDropdown ${index}`}
                key={index}
                onPress={() => {
                  setSortBy(option);

                  sortUsers(option);
                  setExpanded(false);
                }}
              >
                <View style={styles.dropdownItem}>
                  <Text testID={`insideSmallDropdownText ${index}`}>
                    {option}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        ) : null}
      </View>

      <View testID="contentViewId" style={styles.content}>
        {myUsersLoading && (
          <Dialog.Loading loadingProps={{ color: "#84BD00" }}></Dialog.Loading>
        )}
        {allUsers.length != 0 && (
          <>
            {myUsers.length != 0 ? (
              <>
                {myUsers.map((user, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      testID={`userDropdown ${index}`}
                      style={styles.listItemContainerStyle}
                      onPress={() => {
                        openSelectedUser(user);
                      }}
                    >
                      <View style={styles.listItemStyle}>
                        <Text
                          testID={`user ${index} name`}
                          style={styles.listItemNameStyle}
                        >
                          {user.firstName + " " + user.lastName}
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
                      <View>
                        {user.timeEntries.map((timeEntry, index) => (
                          <View key={index}>
                            {timeEntry !== "NO DATA" ? (
                              <View
                                key={index}
                                style={styles.listItemContentStyle}
                              >
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
                                    {format(
                                      timeEntry.date.toDate(),
                                      "yyyy-MM-dd"
                                    )}
                                  </Text>
                                </View>
                                <View style={styles.listItemContentHourView}>
                                  <Text
                                    testID={`user timeEntry ${index} title`}
                                    style={styles.listItemContentHourStyle}
                                  >
                                    {timeEntry.time} tim
                                  </Text>
                                </View>
                              </View>
                            ) : null}
                          </View>
                        ))}
                        <View style={styles.editUserIconView}>
                          <Icon
                            name="pencil-outline"
                            type="material-community"
                            size={25}
                            containerStyle={styles.editUserIcon}
                            onPress={() =>
                              navigation.navigate("CreateOrChangeUser", {
                                createNewUser: false,
                                userName: user.firstName,
                                userSurname: user.lastName,
                                statusActive: user.statusActive,
                                userID: user.userID,
                              })
                            }
                          />
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </>
            ) : (
              <Text style={styles.noInactiveUsers}>
                Du har inga inaktiva användare
              </Text>
            )}
          </>
        )}
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
