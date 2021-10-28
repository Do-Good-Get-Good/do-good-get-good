import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import Menu from "../components/Menu";
import { Icon } from "react-native-elements";

import Images from "../Images";

export const ActivityCard = ({ navigation }) => {
  const [activity, setActivity] = useState({
    active: "true",
    title: "Katthem",
    photo: "symbol_earth",
    city: "Göteborg",
    description: "Städning, matning och en massa kel!",
    popular: "true",
  });
  const [image, setImage] = useState("symbol_earth");
  const [adminOpenActyvity, setAdminOpenActyvity] = useState(true);
  //   navigation.getParam("admin");
  const [activeActivities, setActiveActivities] = useState(true);
  const [popular, setPopular] = useState(true);
  //   const [city, setCity] = useState;

  function setTheRightPhoto(activityObjectPhoto) {
    for (let i = 0; i < Images.length; i++) {
      if (activityObjectPhoto === Images[i].name) {
        return Images[i].image;
      }
    }
  }

  function deleteActivity() {
    return (
      <View style={styles.containerDeleteAndText}>
        <TouchableOpacity>
          <Icon
            style={styles.iconDelete}
            color="#333333"
            name="delete-outline"
            type="material-community"
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textNearDelete}>Ta bort</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function tgFavourite() {
    if (popular) {
      return (
        <View style={styles.containerIconStarAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconStar}
              color="#333333"
              name="star"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPopular(false)}>
            <Text style={styles.textNearIconStar}>
              Ta bort från TG-favoriter
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.containerIconStarAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconStar}
              color="#333333"
              name="star-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPopular(true)}>
            <Text style={styles.textNearIconStar}>
              Lägg till som TG-favorit
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  function adminActionsForActiveActivities() {
    return (
      <View>
        <View style={styles.containerPancilAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconPencil}
              color="#333333"
              name="pencil-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textNearPencil}>Ändra</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerIconArchiveArrowAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconArchiveArrow}
              color="#333333"
              name="archive-arrow-down-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textNearIconArchiveArrow}>Arkivera</Text>
          </TouchableOpacity>
        </View>
        {deleteActivity()}
        {tgFavourite()}
        <TouchableOpacity>
          <Text style={styles.buttonSeeAllUsers}> Se alla användare</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function adminActionsForInactiveActivities() {
    return (
      <View style={{ marginTop: 15 }}>
        <View style={styles.containerIconArchiveArrowAndText}>
          <TouchableOpacity>
            <Icon
              style={styles.iconArchiveArrow}
              color="#333333"
              name="archive-arrow-up-outline"
              type="material-community"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textNearIconArchiveArrow}>
              Flytta från akkiv
            </Text>
          </TouchableOpacity>
        </View>
        {deleteActivity()}
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerArrowAndText}>
            <Icon
              style={styles.arrowIcon}
              name="arrow-back"
              color="#333333"
              size={25}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.textNearArrow}> Gå tillbaka</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textTitle}>Katthem</Text>
          <Image
            style={styles.image}
            source={setTheRightPhoto(activity.photo)}
          ></Image>
          <View style={styles.containerIconAndCity}>
            <Icon
              type="material-community"
              name="map-marker-outline"
              color="#333333"
              size={25}
            />
            <Text style={styles.textCity}>{activity.city}</Text>
          </View>
          <View style={styles.iconsAndTextTimeContainer}>
            <Icon
              type="material-community"
              name="information-outline"
              color="#333333"
              size={25}
            />
            <Text numberOfLines={2} style={styles.textDescription}>
              {activity.description}
            </Text>
          </View>
          {adminOpenActyvity === true && activeActivities === true
            ? adminActionsForActiveActivities()
            : null}
          {adminOpenActyvity === true && activeActivities === false
            ? adminActionsForInactiveActivities()
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  containerArrowAndText: {
    flex: 1,
    flexDirection: "row",
    marginLeft: -5,
    marginTop: 30,
  },
  arrowIcon: { flex: 1 },
  textNearArrow: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#333333",
    fontWeight: "bold",
  },
  textTitle: {
    flex: 1,
    fontSize: 34,
    color: "#333333",
    marginTop: 32,
  },
  image: {
    flex: 1,
    resizeMode: "contain",

    marginTop: 22,
    height: 98,
    width: 107,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "white",
  },
  textCity: {
    fontSize: 18,
    paddingTop: 5,
    marginLeft: 5,
    color: "#333333",
  },
  containerIconAndCity: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
    marginLeft: -3,
    color: "#333333",
  },
  textDescription: {
    flex: 1,
    fontSize: 18,
    paddingTop: 3,
    marginLeft: 3,
    color: "#333333",
  },

  iconsAndTextTimeContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
    color: "#333333",
  },
  containerPancilAndText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 37,
  },
  textNearPencil: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  iconPencil: {
    flex: 1,
    marginRight: 7,
  },
  containerIconArchiveArrowAndText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 23,
  },
  iconArchiveArrow: {
    flex: 1,
    marginRight: 7,
  },
  textNearIconArchiveArrow: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  containerDeleteAndText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 23,
  },
  iconDelete: { flex: 1, marginRight: 7 },

  textNearDelete: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  containerIconStarAndText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 23,
  },
  iconStar: {
    flex: 1,
    marginRight: 7,
  },
  textNearIconStar: {
    flex: 1,
    color: "#333333",
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  buttonSeeAllUsers: {
    flex: 1,
    marginTop: 32,
    paddingVertical: 13,
    fontSize: 20,
    backgroundColor: "#84BD00",
    textAlign: "center",
    letterSpacing: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "#84BD00",
    overflow: "hidden",
  },
});
