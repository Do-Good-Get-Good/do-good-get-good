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
import auth from "@react-native-firebase/auth";
import { format } from "date-fns";
import { Icon } from "react-native-elements";
import { useCreateUserFunction } from "../context/CreateUserContext";

const MyUsers = ({ navigation }) => {
  const createUserContext = useCreateUserFunction();
  const [expanded, setExpanded] = useState(false);
  const [myUsers, setMyUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const sortOptions = ["A - Ö", "Inaktiva"];
  const [sortBy, setSortBy] = useState("A - Ö");
  const [loadingData, setLoadingData] = useState(true);
  const [reloadAfterChanges, setReloadAfterChanges] = useState(false);

  useEffect(() => {
    const fetchUserData = () => {
      firestore()
        .collection("Users")
        .where("admin_id", "==", auth().currentUser.uid)
        .get()
        .then((data) => {
          setUserData(
            data.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        })
        .catch((error) => console.log(error));
    };
    setLoadingData(true);
    fetchUserData();

    return () => {
      setMyUsers([]);
    };
  }, []);

  useEffect(() => {
    fetchUserTimeEntries();
    if (reloadAfterChanges === true) {
      setReloadAfterChanges(false);
    }
  }, [userData, reloadAfterChanges]);

  useEffect(() => {
    if (createUserContext.getChangedUserInfoTo === true) {
      setReloadAfterChanges(true);
      createUserContext.setChangedUserInfoTo(false);
    }
  }, [createUserContext.getChangedUserInfoTo]);

  const fetchUserTimeEntries = async () => {
    if (userData.length != 0) {
      let tempArr = [];
      for (let i = 0; i < userData.length; i++) {
        let userTimeEntryData;

        try {
          let response = await firestore()
            .collection("timeentries")
            .where("user_id", "==", userData[i].id)
            .where("status_confirmed", "==", true)
            .orderBy("date", "desc")
            .limit(5)
            .get();

          userTimeEntryData = response.docs.map((doc) => doc.data());
        } catch (error) {
          console.log(error);
        }

        if (userTimeEntryData.length != 0) {
          let userInfo = {
            firstName: userData[i].first_name,
            lastName: userData[i].last_name,
            timeEntries: userTimeEntryData,
            isOpen: false,
            statusActive: userData[i].status_active,
            userID: userData[i].id,
          };
          tempArr.push(userInfo);
        }
      }
      setAllUsers(tempArr);
      console.log(tempArr);

      // Creates a new filtered array with all active users and sorts them alphabetically
      let activeUsers = tempArr.filter((user) => {
        if (user.statusActive) {
          return user;
        }
      });

      setMyUsers(
        activeUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))
      );
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
    // Sorts myUsers array alphabetically
    if (sortOption === "A - Ö") {
      let activeUsers = allUsers.filter((user) => {
        if (user.statusActive) {
          return user;
        }
      });

      setMyUsers(
        activeUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))
      );
    }
    // filter myUsers array to only show inactive users
    if (sortOption === "Inaktiva") {
      let inactiveUsers = allUsers.filter((user) => {
        if (!user.statusActive) {
          return user;
        }
      });
      setMyUsers(
        inactiveUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))
      );
    }
  };

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
        {loadingData && (
          <Dialog.Loading loadingProps={{ color: "#84BD00" }}></Dialog.Loading>
        )}
        {!loadingData && (
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
                    <Text style={styles.listItemNameStyle}>
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
                          <View key={index} style={styles.listItemContentStyle}>
                            <View style={styles.listItemContentNameView}>
                              <Text style={styles.listItemContentNameStyle}>
                                {timeEntry.activity_title}
                              </Text>
                            </View>
                            <View style={styles.listItemContentDateView}>
                              <Text style={styles.listItemContentDateStyle}>
                                {format(timeEntry.date.toDate(), "yyyy-MM-dd")}
                              </Text>
                            </View>
                            <View style={styles.listItemContentHourView}>
                              <Text style={styles.listItemContentHourStyle}>
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
                            personalInfoID: user.idPersonalInfo[0],
                            useEmail: "",
                          })
                        }
                      />
                    </View>
                  </View>
                )}
              </View>
            ))}
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
});
