import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { format } from "date-fns";

const ConfirmActivities = () => {
  const [checkAll, setCheckAll] = useState(false);
  const [checked, setChecked] = useState(false);
  const [myUsers, setMyUsers] = useState([]);
  const [userIDs, setUserIDs] = useState([]);
  const [usersFullName, setUsersFullName] = useState([]);
  const [usersTimeEntries, setUsersTimeEntries] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

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
          if (timeEntryData.length === 0) {
            timeEntryArr.push(["NO DATA"]);
          } else {
            timeEntryArr.push(timeEntryData);
          }
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
    if (i === usersTimeEntries.length - 1) {
      fillUsersWithInfo();
    }
  };

  const fillUsersWithInfo = () => {
    let tempArr = [];
    let id = 0;
    for (let i = 0; i < userIDs.length; i++) {
      for (let j = 0; j < usersTimeEntries[i].length; j++) {
        if (usersTimeEntries[i][0] !== "NO DATA") {
          let userInfo = {
            id: id,
            fullName: usersFullName[i],
            timeEntryDate: format(
              usersTimeEntries[i][j].date.toDate(),
              "yyyy-MM-dd"
            ),
            timeEntryHours: usersTimeEntries[i][j].time,
            timeEntryActivityName: usersTimeEntries[i][j].activityName,
            checked: false,
            isOpen: false,
          };
          tempArr.push(userInfo);
          id++;
        }
      }
    }
    setMyUsers(tempArr);
  };

  // Check/uncheck the selected users checkbox
  const markSelected = (selectedUser) => {
    const newUsersArr = myUsers.map((user) => {
      return {
        ...user,
        checked: user.id === selectedUser.id ? !user.checked : user.checked,
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
        isOpen: user.id === pressedUser.id ? !user.isOpen : user.isOpen,
      };
    });
    setMyUsers(newUsersArr);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Att godkänna</Text>
        <CheckBox
          title="Markera alla"
          iconRight
          containerStyle={styles.checkBoxStyle}
          checked={checked}
          checkedColor="#84BD00"
          onPress={() => {
            selectAll(!checkAll);
          }}
          textStyle={styles.headerTextSmall}
        />
      </View>
      <View style={styles.content}>
        {myUsers.map((user, index) => (
          <ListItem.Accordion
            key={index}
            containerStyle={styles.listItemContainerStyle}
            content={
              <>
                <View style={styles.listItemStyle}>
                  <Text style={styles.listItemNameStyle}>{user.fullName}</Text>
                  <Text style={styles.listItemDateStyle}>
                    {user.timeEntryDate}
                  </Text>
                  <Text style={styles.listItemHourStyle}>
                    {user.timeEntryHours} tim
                  </Text>
                  <CheckBox
                    iconRight
                    containerStyle={styles.listItemCheckBoxStyle}
                    checked={user.checked}
                    checkedColor="#84BD00"
                    onPress={() => {
                      markSelected(user);
                    }}
                  />
                </View>
              </>
            }
            isExpanded={user.isOpen}
            onPress={() => {
              openSelectedUser(user);
            }}
          >
            <View style={styles.listItemContentStyle}>
              <View style={styles.listItemContentNameView}>
                <Text style={styles.listItemContentNameStyle}>
                  {user.timeEntryActivityName}
                </Text>
              </View>
              <View style={styles.listItemContentDateView}>
                <Text style={styles.listItemContentDateStyle}>
                  {user.timeEntryDate}
                </Text>
              </View>
              <View style={styles.listItemContentHourView}>
                <Text style={styles.listItemContentHourStyle}>
                  {user.timeEntryHours} tim
                </Text>
              </View>
            </View>
          </ListItem.Accordion>
        ))}
      </View>
      <TouchableNativeFeedback
        onPress={() => {
          // Logs the selected users full name to console
          let selectedUsers = myUsers.filter((user) => {
            if (user.checked) {
              return user;
            }
          });
          for (let i = 0; i < selectedUsers.length; i++) {
            // console.log(selectedUsers[i].fullName);
          }
        }}
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
              : [styles.confirmButton, { backgroundColor: "#B7B7B7" }]
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
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 6,
  },
  headerText: { fontSize: 22 },
  headerTextSmall: { fontWeight: "400" },
  checkBoxStyle: {
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 10,
    right: -15,
    backgroundColor: "#F5F5F5",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  listItemContainerStyle: { padding: 0 },
  listItemStyle: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 6,
  },
  listItemNameStyle: {
    fontWeight: "bold",
    // paddingVertical: 10,
    fontSize: 15,
    flex: 3,
  },
  listItemDateStyle: {
    flex: 2,
    textAlign: "center",
    fontSize: 15,
  },
  listItemHourStyle: {
    flex: 1.75,
    textAlign: "center",
    paddingRight: 15,
    fontSize: 15,
  },
  listItemCheckBoxStyle: {
    padding: 0,
    right: -20,
    position: "absolute",
  },
  listItemContentStyle: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
  },
  listItemContentNameView: { flex: 1 },
  listItemContentDateView: { flex: 1 },
  listItemContentHourView: { flex: 1 },
  listItemContentNameStyle: { fontWeight: "bold", fontSize: 15 },
  listItemContentDateStyle: { textAlign: "center", fontSize: 15 },
  listItemContentHourStyle: { textAlign: "center", fontSize: 15 },
  confirmButton: {
    paddingVertical: 12,
    backgroundColor: "#84BD00",
    borderRadius: 5,
  },
  confirmButtonText: {
    alignSelf: "center",
    fontSize: 20,
  },
});
