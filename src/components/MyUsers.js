import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { ListItem } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { format } from "date-fns";
import { Icon } from "react-native-elements";

const MyUsers = () => {
  const [expanded, setExpanded] = useState(false);
  const [myUsers, setMyUsers] = useState([]);
  const [userIDs, setUserIDs] = useState([]);
  const [usersFullName, setUsersFullName] = useState([]);
  const [usersTimeEntries, setUsersTimeEntries] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const sortOptions = ["A - Ö", "Inaktiva"];
  const [sortBy, setSortBy] = useState("A - Ö");

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
        console.log(docIDs);
      } catch (error) {
        console.log(error);
      }
    };
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
  }, [userIDs]);

  useEffect(() => {
    if (isFinished) {
      fetchActivityNames();
      fillUsersWithInfo();
    }

    return () => {
      setIsFinished(false);
    };
  }, [isFinished]);

  const fetchNamesAndTimeEntries = async () => {
    if (userIDs.length != 0) {
      let nameArr = [];
      let timeEntryArr = [];
      for (let i = 0; i < userIDs.length; i++) {
        try {
          const nameResponse = await firestore()
            .collection("Users")
            .doc(userIDs[i])
            .collection("personal_information")
            .get();

          let nameData = nameResponse.docs.map((doc) => doc.data());
          let fullName = nameData[0].first_name + " " + nameData[0].last_name;
          nameArr.push(fullName);
        } catch (error) {
          console.log(error);
        }
        try {
          const timeEntryResponse = await firestore()
            .collection("Users")
            .doc(userIDs[i])
            .collection("time_entries")
            .orderBy("date", "desc")
            .where("status_confirmed", "==", false)
            .get();

          let timeEntryData = timeEntryResponse.docs.map((doc) => doc.data());
          timeEntryArr.push(timeEntryData);
        } catch (error) {
          console.log(error);
        }
      }
      if (
        nameArr.length === userIDs.length &&
        timeEntryArr.length === userIDs.length
      ) {
        setUsersFullName(nameArr);
        setUsersTimeEntries(timeEntryArr);
        setIsFinished(true);
      }
    }
  };

  const fetchActivityNames = () => {
    console.log(usersFullName);
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

    for (let i = 0; i < userIDs.length; i++) {
      for (let j = 0; j < usersTimeEntries[i].length; j++) {
        getActivityName(i, j);
      }
    }
  };

  const linkToUsersTimeEntry = (activity, i, j) => {
    let timeEntry = {
      activityName: activity,
      date: usersTimeEntries[i][j].date,
      time: usersTimeEntries[i][j].time,
    };
    usersTimeEntries[i][j] = timeEntry;
  };

  const fillUsersWithInfo = () => {
    let tempArr = [];
    for (let i = 0; i < userIDs.length; i++) {
      var registeredHoursSum = 0;
      for (let j = 0; j < usersTimeEntries[i].length; j++) {
        registeredHoursSum += usersTimeEntries[i][j].time;
      }
      let userInfo = {
        fullName: usersFullName[i],
        latestTimeEntryDate: format(
          usersTimeEntries[i][0].date.toDate(),
          "yyyy-MM-dd"
        ),
        totalRegisteredHours: registeredHoursSum,
        timeEntries: usersTimeEntries[i],
        checked: false,
        isOpen: false,
      };
      tempArr.push(userInfo);
    }
    setMyUsers(tempArr);
  };

  const openSelectedUser = (pressedUser) => {
    const newUsersArr = myUsers.map((user) => {
      return {
        ...user,
        isOpen:
          user.fullName === pressedUser.fullName ? !user.isOpen : user.isOpen,
      };
    });
    setMyUsers(newUsersArr);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mina användare</Text>
        <ListItem.Accordion
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
      </View>

      <View style={styles.content}>
        {myUsers.map((user, index) => (
          <ListItem.Accordion
            key={index}
            containerStyle={styles.listItemContainerStyle}
            underlayColor="#F5F5F5"
            activeOpacity={0.65}
            content={
              <>
                <View style={styles.listItemStyle}>
                  <Text style={styles.listItemNameStyle}>{user.fullName}</Text>
                </View>
              </>
            }
            isExpanded={user.isOpen}
            onPress={() => {
              openSelectedUser(user);
            }}
          >
            {user.timeEntries.map((timeEntry, index) => (
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
            ))}
            <View style={styles.editUserIconView}>
              <Icon
                name="edit"
                type="material"
                size={25}
                containerStyle={styles.editUserIcon}
                onPress={() => {
                  // navigation.navigate("EditUser")
                }}
              />
            </View>
          </ListItem.Accordion>
        ))}
      </View>
    </View>
  );
};

export default MyUsers;

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
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
  sortDropdownContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    zIndex: 2,
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
  lastItemStyle: {
    paddingBottom: 100,
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
