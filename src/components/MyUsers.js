import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { ListItem, Dialog } from "react-native-elements";
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
  const [userIDs, setUserIDs] = useState([]);
  const [usersFullName, setUsersFullName] = useState([]);
  const [usersTimeEntries, setUsersTimeEntries] = useState([]);
  const [usersActiveStatus, setUsersActiveStatus] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const sortOptions = ["A - Ö", "Inaktiva"];
  const [sortBy, setSortBy] = useState("A - Ö");
  const [loadingData, setLoadingData] = useState(true);
  const [reloadAfterChanges, setReloadAfterChanges] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await firestore()
          .collection("Users")
          .doc(auth().currentUser.uid)
          .collection("my_users")
          .get();

        var docIDs = response.docs.map((doc) => doc.id);

        setUserIDs(docIDs);
      } catch (error) {
        console.log(error);
      }
    };
    setLoadingData(true);
    fetchUserData();

    return () => {
      setMyUsers([]);
      setUsersFullName([]);
      setUsersTimeEntries([]);
      setIsFinished(false);
    };
  }, []);

  useEffect(() => {
    fetchNamesAndTimeEntries();
    if (reloadAfterChanges === true) {
      setReloadAfterChanges(false);
    }
  }, [userIDs, reloadAfterChanges]);

  useEffect(() => {
    if (createUserContext.getChangedUserInfoTo === true) {
      setReloadAfterChanges(true);
      createUserContext.setChangedUserInfoTo(false);
    }
  }, [createUserContext.getChangedUserInfoTo]);

  useEffect(() => {
    if (isFinished) {
      fetchActivityNames();
    }

    return () => {
      setIsFinished(false);
    };
  }, [isFinished]);

  const fetchNamesAndTimeEntries = async () => {
    if (userIDs.length != 0) {
      let nameArr = [];
      let timeEntryArr = [];
      let userStatusArr = [];
      for (let i = 0; i < userIDs.length; i++) {
        try {
          const nameResponse = await firestore()
            .collection("Users")
            .doc(userIDs[i])
            .collection("personal_information")
            .get();
          let userPersonalInfoID = nameResponse.docs.map((doc) => doc.id);
          let nameData = nameResponse.docs.map((doc) => doc.data());
          let firstName = nameData[0].first_name;
          let lastName = nameData[0].last_name;

          nameArr.push({
            firstName: firstName,
            lastName: lastName,
            personalInfoID: userPersonalInfoID,
          });
        } catch (error) {
          console.log(error);
        }

        try {
          const timeEntryResponse = await firestore()
            .collection("Users")
            .doc(userIDs[i])
            .collection("time_entries")
            .where("status_confirmed", "==", true)
            .orderBy("date", "desc")
            .get();

          let timeEntryData = timeEntryResponse.docs.map((doc) => doc.data());
          if (timeEntryData.length === 0) {
            timeEntryArr.push(["NO DATA"]);
          } else {
            timeEntryArr.push(timeEntryData);
          }
        } catch (error) {
          console.log(error);
        }
        try {
          const userStatusResponse = await firestore()
            .collection("Users")
            .doc(userIDs[i])
            .get();

          let userStatusData = userStatusResponse.data().status_active;
          userStatusArr.push(userStatusData);
        } catch (error) {
          console.log(error);
        }
      }
      if (
        nameArr.length === userIDs.length &&
        timeEntryArr.length === userIDs.length &&
        userStatusArr.length === userIDs.length
      ) {
        setUsersFullName(nameArr);
        setUsersTimeEntries(timeEntryArr);
        setUsersActiveStatus(userStatusArr);
        setIsFinished(true);
      }
    }
  };

  const fetchActivityNames = () => {
    // console.log(usersFullName);
    const getActivityName = async (i, j) => {
      try {
        const response = await firestore()
          .collection("Activities")
          .doc(usersTimeEntries[i][j].activity_id)
          .get();

        linkToUsersTimeEntry(response.data().activity_title, i, j);
      } catch (error) {
        console.log(error);
      }
    };

    for (let i = 0; i < usersTimeEntries.length; i++) {
      for (let j = 0; j < usersTimeEntries[i].length; j++) {
        if (usersTimeEntries[i][0] !== "NO DATA") {
          getActivityName(i, j);
        }
      }
    }
  };

  const linkToUsersTimeEntry = (activity, i, j) => {
    if (usersTimeEntries[i][0] !== "NO DATA") {
      let timeEntry = {
        activityName: activity,
        date: usersTimeEntries[i][j].date,
        time: usersTimeEntries[i][j].time,
      };
      usersTimeEntries[i][j] = timeEntry;
    }
    fillUsersWithInfo();
  };

  const fillUsersWithInfo = () => {
    let tempArr = [];
    for (let i = 0; i < userIDs.length; i++) {
      let userInfo = {
        firstName: usersFullName[i].firstName,
        lastName: usersFullName[i].lastName,
        timeEntries: usersTimeEntries[i],
        isOpen: false,
        statusActive: usersActiveStatus[i],
        userID: userIDs[i],
        idPersonalInfo: usersFullName[i].personalInfoID,
      };
      tempArr.push(userInfo);
    }

    setAllUsers(tempArr);

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
          marginBottom: expanded ? 83 : 10,
        }}
      >
        <Text style={styles.headerText}>Mina användare</Text>

        <TouchableOpacity
          style={styles.sortDropdownStyle}
          onPress={() => setExpanded(!expanded)}
        >
          <View style={styles.styleForDropdown}>
            <Text style={styles.listItemNameStyle}>{sortBy}</Text>
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
                key={index}
                onPress={() => {
                  setSortBy(option);
                  sortUsers(option);
                  setExpanded(false);
                }}
              >
                <View style={styles.dropdownItem}>
                  <Text>{option}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        ) : null}

        {/* <ListItem.Accordion
          containerStyle={styles.sortDropdownContainerStyle}
          style={styles.sortDropdownStyle}
          underlayColor="#F5F5F5"
          activeOpacity={0.65}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>{sortBy}</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => setExpanded(!expanded)}
        ></ListItem.Accordion>
        {expanded ? (
          <View style={styles.dropdown}>
            {sortOptions.map((option, index) => (
              <TouchableNativeFeedback
                key={index}
                onPress={() => {
                  setSortBy(option);
                  sortUsers(option);
                  setExpanded(false);
                }}
              >
                <View style={styles.dropdownItem}>
                  <Text>{option}</Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        ) : null} */}
      </View>

      <View style={styles.content}>
        {loadingData ? (
          <Dialog.Loading loadingProps={{ color: "#84BD00" }}></Dialog.Loading>
        ) : null}
        {!loadingData ? (
          <>
            {myUsers.map((user, index) => (
              <View key={index}>
                <TouchableOpacity
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
                {user.isOpen ? (
                  <View>
                    {user.timeEntries.map((timeEntry, index) => (
                      <View key={index}>
                        {timeEntry !== "NO DATA" ? (
                          <View key={index} style={styles.listItemContentStyle}>
                            <View style={styles.listItemContentNameView}>
                              <Text style={styles.listItemContentNameStyle}>
                                {timeEntry.activityName}
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
                ) : null}
              </View>

              // <ListItem.Accordion
              //   key={index}
              //   containerStyle={styles.listItemContainerStyle}
              //   underlayColor="#F5F5F5"
              //   activeOpacity={0.65}
              //   content={
              //     <>
              //       <View style={styles.listItemStyle}>
              //         <Text style={styles.listItemNameStyle}>
              //           {user.firstName + " " + user.lastName}
              //         </Text>
              //       </View>
              //     </>
              //   }
              //   isExpanded={user.isOpen}
              //   onPress={() => {
              //     openSelectedUser(user);
              //   }}
              // >
              //   {user.timeEntries.map((timeEntry, index) => (
              //     <View key={index}>
              //       {timeEntry !== "NO DATA" ? (
              //         <View key={index} style={styles.listItemContentStyle}>
              //           <View style={styles.listItemContentNameView}>
              //             <Text style={styles.listItemContentNameStyle}>
              //               {timeEntry.activityName}
              //             </Text>
              //           </View>
              //           <View style={styles.listItemContentDateView}>
              //             <Text style={styles.listItemContentDateStyle}>
              //               {format(timeEntry.date.toDate(), "yyyy-MM-dd")}
              //             </Text>
              //           </View>
              //           <View style={styles.listItemContentHourView}>
              //             <Text style={styles.listItemContentHourStyle}>
              //               {timeEntry.time} tim
              //             </Text>
              //           </View>
              //         </View>
              //       ) : null}
              //     </View>
              //   ))}
              //   <View style={styles.editUserIconView}>
              //     <Icon
              //       name="pencil-outline"
              //       type="material-community"
              //       size={25}
              //       containerStyle={styles.editUserIcon}
              //       onPress={() =>
              //         navigation.navigate("CreateOrChangeUser", {
              //           createNewUser: false,
              //           userName: user.firstName,
              //           userSurname: user.lastName,
              //           statusActive: user.statusActive,
              //           userID: user.userID,
              //           personalInfoID: user.idPersonalInfo[0],
              //           useEmail: "",
              //         })
              //       }
              //     />
              //   </View>
              // </ListItem.Accordion>
            ))}
          </>
        ) : null}
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
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 40,
  //   marginBottom: 10,
  // },
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

  // sortDropdownContainerStyle: {
  //   paddingHorizontal: 16,
  //   paddingVertical: 10,
  //   borderRadius: 5,
  //   zIndex: 2,
  // },
  sortDropdownStyle: {
    width: "45%",
    backgroundColor: "#F5F5F5",
  },
  dropdown: {
    width: "45%",
    position: "absolute",
    right: 0,
    top: 45,
    zIndex: 1,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  content: {
    marginBottom: 10,
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
  // lastItemStyle: {
  //   paddingBottom: 100,
  // },
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
