import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { Icon, Dialog } from "@rneui/base";
import BottomLogo from "../components/BottomLogo";

import { format } from "date-fns";
import {
  getUserData,
  getActivitiesMatchTimeEntries,
  getConcept,
  getTenLastConfirmedTimeEntries,
} from "../firebase-functions/get";
import { useActivityImages } from "../context/ActivityImagesContext";

const ConceptPage = () => {
  const { getImageForActivity } = useActivityImages();

  const [loadingUserData, setLoadingUserData] = useState(false);
  const [loadingConceptData, setLoadingConceptData] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [concept, setConcept] = useState([]);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [noData, setNoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingUserData(true);
      let usersFetched = 0;

      try {
        let response = await getTenLastConfirmedTimeEntries();

        if (!response || response.size === 0) {
          setLoadingUserData(false);
          setNoData("Det finns för tillfället inga godkända aktiviteter");
          return;
        }

        response.docs.map(async (timeEntry) => {
          try {
            let activity = await getActivitiesMatchTimeEntries(timeEntry);
            let userInfo = await getUserData(timeEntry.data().user_id);
            let fullName = `${userInfo.first_name} ${userInfo.last_name}`;

            const userData = {
              userID: userInfo.id,
              fullName: fullName,
              activityName: activity.title,
              activityPhoto: activity.photo,
              activityCity: activity.city,
              imageUrl: activity.imageUrl,
              timeEntryDate: format(
                timeEntry.data().date.toDate(),
                "yyyy-MM-dd",
              ),
            };
            setAllUsers((prev) => [...prev, userData]);

            usersFetched++;
            if (usersFetched === response.size) {
              setLoadingUserData(false);
            }
          } catch (error) {
            if (error === "no-data") {
              setError("Sorry, something went wrong");
            }
          }
        });
      } catch (error) {
        if (error === "no-data") {
          setError("Sorry, something went wrong");
        }
      }
    };
    fetchData();
    return () => {
      setAllUsers([]);
    };
  }, []);

  useEffect(() => {
    const fetchConceptData = async () => {
      setLoadingConceptData(true);
      try {
        let conceptData = await getConcept();
        setConcept(conceptData.sort((a, b) => a.order_id - b.order_id));
        setLoadingConceptData(false);
      } catch (error) {
        if (error === "no-data") {
          setError2("Sorry, something went wrong");
        }
      }
    };
    fetchConceptData();
    return () => {
      setConcept([]);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          {error2 != null && <Text style={styles.errorText}>{error2}</Text>}
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
              .map((activity, index) => (
                <View key={index} style={styles.insideActivityContainer}>
                  <View style={styles.viewTitleCityFullname}>
                    <Text numberOfLines={2} style={styles.textTitle}>
                      {activity.activityName}
                    </Text>

                    <View
                      style={{
                        marginTop: activity.activityName.length > 16 ? 0 : 25,
                        flexDirection: "row",
                        alignItems: "center",
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
                    testID="image"
                    style={styles.image}
                    source={getImageForActivity(
                      activity.activityPhoto,
                      activity.imageUrl,
                    )}
                  />
                </View>
              ))
          )}
          {noData != null && <Text style={styles.errorText}>{noData}</Text>}
          {error != null && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConceptPage;

const styles = StyleSheet.create({
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
    marginTop: 5,
    marginBottom: 15,
  },
  insideActivityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  viewTitleCityFullname: {
    color: colors.dark,
  },
  iconsAndTextTimeContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  textTitle: {
    ...typography.cardTitle,
    color: colors.dark,
  },
  textCity: {
    ...typography.b1,
    marginLeft: 10,
    color: colors.dark,
  },
  textFullName: {
    ...typography.b1,
    marginLeft: 10,
    color: colors.dark,
  },
  errorText: {
    fontSize: 20,
    color: colors.error,
  },
});
