import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

export const DropDownSmall = ({}) => {
  const creactActivityContext = useCreateActivityFunction();
  const rout = useRoute();

  const [sortBy, setSortBy] = useState("");
  const [sortArray, setSortArray] = useState([]);
  const [mainWordAdminGallery, setMainWordAdminGallery] = useState("Datum");
  const [mainWordCreateActivity, setMainWordCreateActivity] =
    useState("Aktivitet");
  const sortingAdminGallery = ["Favoriter", "Namn", "Plats"];
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    if (rout.name === "CreateActivity") {
      let newArray = [];
      newArray.push({ title: "Skapa ny aktivitet" });
      setSortBy(mainWordCreateActivity);

      for (let i = 0; i < creactActivityContext.activeActivities.length; i++) {
        let activityTitle = {
          title: creactActivityContext.activeActivities[i].title,
        };
        newArray.push(activityTitle);
      }
      setSortArray(newArray);
    } else if (rout.name === "AdminActivityGallery") {
      setSortBy(mainWordAdminGallery);
      setSortArray(sortingAdminGallery);
    } else {
      console.log("No rout");
    }
  }, [rout.name]);

  const pressDropDawn = () => {
    setOpenDropDown(true);
    if (openDropDown === true) {
      setOpenDropDown(false);
    }
  };

  toStileTitle = function (title, index) {
    return {
      marginVertical: 5,
      fontSize: 18,
      color: "#333333",
      fontStyle:
        title === "Skapa ny aktivitet" && index === 0 ? "italic" : "normal",
    };
  };

  function pressSelectionInsideDropDown(selection, index) {
    if (rout.name === "CreateActivity") {
      setOpenDropDown(false);
      creactActivityContext.chooseInDropDown(selection);
      setSortBy(selection);
    } else if (rout.name === "AdminActivityGallery") {
      // let newArray = sortArray;
      // newArray.splice(index, 0, sortBy);
      // setSortArray(newArray);

      // newArray = [];

      // sortArray((prev) => {
      //   const components = prev.components.slice(index);
      //   components.splice(index, 0, sortBy);
      //   setSortArray(components);
      // });

      setSortBy(selection);

      // if (sortArray.length < 4) {
      //   setSortArray((prev) => [...prev, "Datum"]);
      // }
    } else {
      console.log("No rout");
    }
  }

  const styleForDropDownInsideConrainer = {
    borderColor: openDropDown === true ? "#333333" : "white",

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,

    marginLeft: 19,

    paddingRight: 15,
    paddingLeft: 14,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: "white",
    overflow: "hidden",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressDropDawn}>
        <View style={styleForDropDownInsideConrainer}>
          <Text style={styles.sortText}>{sortBy}</Text>
          <Icon
            color="#5B6770"
            style={styles.sortIcon}
            name={openDropDown === true ? "arrow-drop-up" : "arrow-drop-down"}
            size={30}
          />
        </View>
      </TouchableOpacity>
      <View>
        {openDropDown === true
          ? sortArray.map((sort, index) => (
              <View index={index} key={index} style={styles.insideSortBox}>
                <TouchableOpacity
                  onPress={() => {
                    pressSelectionInsideDropDown(sort.title, index);
                  }}
                >
                  <Text style={toStileTitle(sort.title, index)}>
                    {sort.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },

  sortText: {
    flex: 3,
    fontSize: 18,
    color: "#333333",
    paddingVertical: 7,
  },
  sortIcon: {
    paddingTop: 5,
  },
  insideSortBox: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 19,
    paddingVertical: 5,
    overflow: "hidden",
    paddingRight: 15,
    paddingLeft: 14,
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: "white",
    overflow: "hidden",
    borderColor: "white",
  },
});
