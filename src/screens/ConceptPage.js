import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { Icon, Dialog } from "react-native-elements";
import Images from "../Images";
import BottomLogo from "../components/BottomLogo";

import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";

const ConceptPage = () => {
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [loadingConceptData, setLoadingConceptData] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [concept, setConcept] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingUserData(true);
      let id = 0;
      let usersFetched = 0;
      let response = await firestore().collection("Users").get();

      response.forEach(async (user) => {
        let timeEntries = await firestore()
          .collection("Users")
          .doc(user.id)
          .collection("time_entries")
          .orderBy("date", "desc")
          .where("status_confirmed", "==", true)
          .get();

        timeEntries.forEach(async (timeEntry) => {
          let activity = await firestore()
            .collection("Activities")
            .doc(timeEntry.data().activity_id)
            .get();

          let fullName;
          let userInfo = await firestore()
            .collection("Users")
            .doc(user.id)
            .collection("personal_information")
            .get();

          userInfo.docs.map(
            (doc) =>
              (fullName = `${doc.data().first_name} ${doc.data().last_name}`)
          );

          if (activity.exists) {
            const userData = {
              id: id,
              userID: user.id,
              fullName: fullName,
              activityName: activity.data().activity_title,
              activityPhoto: activity.data().activity_photo,
              activityCity: activity.data().activity_city,
              timeEntryDate: format(
                timeEntry.data().date.toDate(),
                "yyyy-MM-dd"
              ),
            };
            setAllUsers((prev) => [...prev, userData]);
          }
          id++;
        });

        usersFetched++;
        if (usersFetched === response.size) {
          setLoadingUserData(false);
        }
      });
    };
    fetchData();
    return () => {
      setAllUsers([]);
    };
  }, []);

  useEffect(() => {
    const fetchConceptData = async () => {
      setLoadingConceptData(true);
      const tempArray = [];
      await firestore()
        .collection("concept")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            tempArray.push({ ...doc.data() });
          });
        })
        .catch((error) => {
          console.log(error);
          if (error === "no-data") {
            setError("Sorry, something went wrong");
          }
        });
      setConcept(tempArray.sort((a, b) => a.order_id - b.order_id));
      setLoadingConceptData(false);
    };
    fetchConceptData();
    return () => {
      setConcept([]);
    };
  }, []);

  const setTheRightPhoto = (activityObjectPhoto) => {
    for (let index = 0; index < Images.length; index++) {
      if (activityObjectPhoto === Images[index].name) {
        return Images[index].image;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <ScrollView style={{ paddingHorizontal: 18 }}>
        <Text testID="headerText" style={styles.titleText}>
          Om konceptet
        </Text>
        <View style={styles.activityContainer}>
          {loadingConceptData ? (
            <Dialog.Loading
              loadingProps={{ color: colors.primary }}
            ></Dialog.Loading>
          ) : (
            concept.length > 0 &&
            concept.map((item, index) => (
              <View key={index}>
                <Text style={styles.textStyleBold}>{item.heading}</Text>
                <Text style={styles.textStyleNormal}>{item.body}</Text>
              </View>
            ))
          )}
          {error != null && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <Text style={styles.titleText}>Senaste</Text>
        <View style={styles.activityContainer}>
          {loadingUserData ? (
            <Dialog.Loading
              loadingProps={{ color: colors.primary }}
            ></Dialog.Loading>
          ) : (
            allUsers.length > 0 &&
            allUsers
              .sort((a, b) => b.timeEntryDate.localeCompare(a.timeEntryDate))
              .slice(0, 10)
              .map((activity, index) => (
                <View key={index} style={styles.insideActivityContainer}>
                  <View style={styles.photoAndText}>
                    <View style={styles.viewTitleCityFullname}>
                      <Text numberOfLines={2} style={styles.textTitle}>
                        {activity.activityName}
                      </Text>

                      <View
                        style={{
                          marginTop: activity.activityName.length > 16 ? 0 : 25,
                          flex: 1,
                          flexDirection: "row",
                        }}
                      >
                        <Icon
                          type="material-community"
                          name="map-marker-outline"
                          color={colors.dark}
                          size={25}
                        />

                        <Text style={styles.textCity}>
                          {activity.activityCity}
                        </Text>
                      </View>

                      <View style={styles.iconsAndTextTimeContainer}>
                        <Icon
                          type="material-community"
                          name="account-outline"
                          color={colors.dark}
                          size={25}
                        />
                        <Text numberOfLines={2} style={styles.textFullName}>
                          {activity.fullName}
                        </Text>
                      </View>
                    </View>
                    <Image
                      style={styles.image}
                      source={setTheRightPhoto(activity.activityPhoto)}
                    />
                  </View>
                </View>
              ))
          )}
        </View>
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConceptPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    ...typography.h2,
    fontWeight: "500",
    marginTop: 30,
    color: colors.dark,
  },
  textStyleBold: {
    ...typography.b2,
    fontWeight: "700",
    color: colors.dark,
  },
  textStyleNormal: {
    ...typography.b2,
    marginBottom: 10,
    color: colors.dark,
  },
  activityContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
  },
  insideActivityContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 7,
    backgroundColor: colors.background,
    flexWrap: "wrap",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.background,
  },
  image: {
    flex: 1,
    height: 100,
    resizeMode: "contain",
    alignItems: "center",
    marginRight: 12,
    marginTop: 10,
    borderRadius: 5,
  },
  photoAndText: {
    flex: 1,
    flexDirection: "row",
  },
  viewTitleCityFullname: {
    flex: 2,
    marginRight: 7,
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 11,
    color: colors.dark,
  },
  iconsAndTextTimeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
  },
  textTitle: {
    flex: 2,
    ...typography.title,
    color: colors.dark,
  },
  textCity: {
    flex: 1,
    ...typography.b1,
    paddingTop: 5,
    marginLeft: 12,
    color: colors.dark,
  },
  textFullName: {
    flex: 1,
    ...typography.b1,
    paddingTop: 3,
    marginLeft: 12,
    color: colors.dark,
  },
  errorText: {
    fontSize: 20,
    color: colors.error,
  },
});
