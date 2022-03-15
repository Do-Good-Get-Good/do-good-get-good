import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
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
import auth from "@react-native-firebase/auth";
import { format } from "date-fns";

const ConceptPage = () => {
  const [expanded, setExpanded] = useState(false);
  const sortOptions = ["Datum", "Plats", "A - Ö", "Ö - A"];
  const [sortBy, setSortBy] = useState("Datum");
  const [loadingData, setLoadingData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
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
          setLoadingData(false);
        }
      });
    };
    fetchData();
    return () => {
      setAllUsers([]);
    };
  }, []);

  const setTheRightPhoto = (activityObjectPhoto) => {
    for (let index = 0; index < Images.length; index++) {
      if (activityObjectPhoto === Images[index].name) {
        return Images[index].image;
      }
    }
  };

  const sortActivities = (sortOption) => {
    if (sortOption === "Datum") {
      allUsers.sort((a, b) => b.timeEntryDate.localeCompare(a.timeEntryDate));
    } else if (sortOption === "Plats") {
      allUsers.sort((a, b) => a.activityCity.localeCompare(b.activityCity));
    } else if (sortOption === "A - Ö") {
      allUsers.sort((a, b) => a.activityName.localeCompare(b.activityName));
    } else if (sortOption === "Ö - A") {
      allUsers.sort((a, b) => b.activityName.localeCompare(a.activityName));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <ScrollView style={{ paddingHorizontal: 18 }}>
        <Text style={styles.headerText}>Om konceptet</Text>
        <Text style={styles.titleText}>
          Technogarden bygger på människor. Vi ÄR våra medarbetare. Därför är
          välmående ett av våra viktigaste mål, tillsammans med att göra gott.
          Nu startar vi en satsning för våra medarbetare där vi ger dem verktyg
          att bidra till ett hållbart samhälle. Det gör vi med hjälp av
          Hållbarhetsfonden och vår nya applikation ”Do good – get good”.
        </Text>
        <Text style={styles.textStyleNormal}>
          Grundtanken bakom satsningen är enkel: Att göra bra saker för andra
          får dig att må bra. När du har en positiv inverkan på din omgivning
          känns livet mer meningsfullt. På köpet lägger vi grunden för ett
          hållbart samhälle genom att hjälpas åt att ta socialt ansvar.
        </Text>
        <Text style={styles.textStyleBold}>Plattform för ideellt arbete</Text>
        <Text style={styles.textStyleNormal}>
          Hållbarhetsfonden är en ekonomisk plattform som gör det möjligt för
          våra medarbetare att arbeta ideellt på sin fritid och ändå få viss
          ersättning. Insatser kan exempelvis vara engagemang i föreningar eller
          frivilligorganisationer, som att träna ungdomar i fotboll, stå i
          soppkök eller lämna blod. {"\n\n"}
          Hållbarhetsfonden byggs upp av inkomster från insatser vi gör utöver
          vår ordinarie verksamhet. Det kan exempelvis vara arvode från en
          föreläsning eller en oväntad bonus från en kund. På sikt vill vi
          utveckla fler finansieringsvägar, exempelvis genom samarbeten med
          företag.
        </Text>
        <Text style={styles.textStyleBold}>Ny mobilapplikation</Text>
        <Text style={styles.textStyleNormal}>
          För att effektivt kunna följa våra medarbetares ideella insatser
          bygger vi nu en mobilapplikation med namnet ”Do good – get good”. Här
          kan du som administratör följa timmar som rapporteras in, samtidigt
          som medarbetare får en överblick på sina egna och andras aktiviteter
          runt om i landet. Applikationen hjälper till att inspirera till nya
          aktiviteter och skapa stolthet över alla de insatser som görs.
        </Text>
        <Text style={styles.textStyleBold}>Tillsammans kan vi göra mer! </Text>
        <Text style={styles.textStyleNormal}>
          Ett naturligt nästa steg är att dela med oss av ”Do good – get good”.
          Tillsammans kan vi göra mycket positivt för samhället. Vi berättar
          gärna om våra erfarenheter och kan erbjuda stöd och anpassning av
          mobilapplikationen för olika behov.
        </Text>
        <View style={styles.header}>
          <Text style={styles.headerText2}>Senaste</Text>

          <TouchableOpacity
            style={styles.sortDropdownStyle}
            onPress={() => setExpanded(!expanded)}
          >
            <View style={styles.styleForDropdown}>
              <Text style={styles.listItemNameStyle}>{sortBy}</Text>
              <Icon
                color={colors.secondary}
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
                    sortActivities(option);
                    setExpanded(false);
                  }}
                >
                  <View style={styles.dropdownItem}>
                    <Text style={styles.textInsideDropdown}>{option}</Text>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.activityContainer}>
          {loadingData ? (
            <Dialog.Loading
              loadingProps={{ color: colors.primary }}
            ></Dialog.Loading>
          ) : (
            allUsers.length > 0 &&
            allUsers.slice(0, 10).map((activity, index) => (
              //   <TouchableOpacity
              //     onPress={() =>
              //       lookDetails(suggestion, suggestion.active, suggestion.popular)
              //     }
              //     index={index}
              //     key={index}
              //   >
              <View style={styles.insideActivityContainer}>
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
              //   </TouchableOpacity>
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
  headerText: {
    ...typography.h2,
    fontWeight: "500",
    marginTop: 30,
    color: colors.dark,
  },
  titleText: {
    ...typography.b2,
    marginBottom: 10,
    fontWeight: "700",
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
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  headerText2: {
    width: "55%",
    ...typography.h2,
    fontWeight: "500",
    color: colors.dark,
  },
  styleForDropdown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  listItemNameStyle: {
    ...typography.b1,
    color: colors.dark,
  },
  dropdown: {
    width: "45%",
    position: "absolute",
    right: 0,
    top: 45,
    backgroundColor: colors.background,
    elevation: 5,
    color: colors.dark,

    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 1 },
  },
  sortDropdownStyle: {
    width: "45%",
    backgroundColor: colors.light,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textInsideDropdown: {
    ...typography.b1,
    color: colors.dark,
  },
  // Allt för activity
  activityContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
    zIndex: -1,
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
    ...Platform.select({
      ios: {
        shadowOffset: {
          hight: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
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
});
