import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { CheckBox, ListItem } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const ConfirmActivities = () => {
  const [checkAll, setCheckAll] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [myUsers, setMyUsers] = useState([]);
  const [userIDs, setUserIDs] = useState([]);
  const [usersFullName, setUsersFullName] = useState([]);

  useEffect(() => {
    setMyUsers([]);
    setUsersFullName([]);

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
      if (userIDs.length != 0) {
        let nameArr = [];
        for (let i = 0; i < userIDs.length; i++) {
          try {
            const response = await firestore()
              .collection("Users")
              .doc(userIDs[i])
              .collection("personal_information")
              .get();

            let data = response.docs.map((doc) => doc.data());
            let fullName = data[0].first_name + " " + data[0].last_name;
            nameArr.push(fullName);
            if (nameArr.length === userIDs.length) {
              setUsersFullName(nameArr);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      // try {
      //   firestore()
      //     .collection("Users")
      //     .doc(userIDs[i])
      //     .collection("time_entries")
      //     .orderBy("date", "asc")
      //     .get()
      // } catch (error) {
      //   console.log(error)
      // }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (usersFullName.length != 0) {
      console.log(usersFullName);
    }
  }, [usersFullName]);

  // if (!getUserPersonalInfo.empty) {
  //   let userNameData = getUserPersonalInfo.docs.map((doc) => doc.data());
  //   let fullName =
  //     userNameData[0].first_name + " " + userNameData[0].last_name;
  //   setUserFullName((prev) => [...prev, fullName]);
  // }
  // if (!userTimeEntriesFb.empty) {
  //   let userTimeEntryData = userTimeEntriesFb.docs.map((doc) => doc.data());
  //   setUserTimeEntriesfromFB((prev) => [...prev, userTimeEntryData]);
  // }

  // useEffect(() => {
  //   const getActivityName = async (i, j) => {
  //     const response = await firestore()
  //       .collection("Activities")
  //       .doc(userTimeEntriesFromFB[i][j].activity_id)
  //       .get();
  //     console.log("AAAAAAAAAAAAAAAAAAA", response.data().activity_title);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (checkAll) {
  //     myUsers.map((user) => {
  //       user.checked = true;
  //       // console.log(user.checked);
  //     });
  //   } else {
  //     myUsers.map((user) => {
  //       user.checked = false;
  //       // console.log(user.checked);
  //     });
  //   }
  // }, [checkAll]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Att godkänna</Text>
        <CheckBox
          title="Markera alla"
          iconRight
          containerStyle={styles.checkBoxStyle}
          checked={checkAll}
          checkedColor="#84BD00"
          onPress={() => {
            setCheckAll(!checkAll);
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
                    {user.latestTimeEntryDate}
                  </Text>
                  <Text style={styles.listItemHourStyle}>
                    {user.totalRegisteredHours} tim
                  </Text>
                  <CheckBox
                    iconRight
                    containerStyle={styles.listItemCheckBoxStyle}
                    checked={user.checked}
                    checkedColor="#84BD00"
                    onPress={() => {
                      // set the clicked checkbox status to true
                    }}
                  />
                </View>
              </>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
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
                    {timeEntry.date}
                  </Text>
                </View>
                <View style={styles.listItemContentHourView}>
                  <Text style={styles.listItemContentHourStyle}>
                    {timeEntry.time} tim
                  </Text>
                </View>
              </View>
            ))}
          </ListItem.Accordion>
        ))}
      </View>
      <TouchableNativeFeedback
        onPress={() => {
          // Code to run when pressed
        }}
        disabled={checkAll ? false : true}
      >
        <View
          style={
            checkAll
              ? styles.confirmButton
              : [styles.confirmButton, { backgroundColor: "#B7B7B7" }]
          }
        >
          <Text
            style={
              checkAll
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
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  listItemContainerStyle: { padding: 0 },
  listItemStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    margin: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemNameStyle: { fontWeight: "bold" },
  listItemDateStyle: {},
  listItemHourStyle: {},
  listItemCheckBoxStyle: { padding: 0 },
  listItemContentStyle: {
    backgroundColor: "#F5F5F5",
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
