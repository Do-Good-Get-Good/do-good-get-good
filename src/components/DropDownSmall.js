import { useRoute } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { useCreateActivityFunction } from "../context/CreateActivityContext/CreateActivityContext";

export function DropDownSmall({}) {
  const creactActivityContext = useCreateActivityFunction();
  const rout = useRoute();

  const [sortBy, setSortBy] = useState("");
  const [sortArray, setSortArray] = useState([]);
  const [mainWordAdminGallery, setMainWordAdminGallery] = useState("Datum");
  const [mainWordCreateActivity, setMainWordCreateActivity] =
    useState("Välj aktivitet");
  const sortingAdminGallery = [
    { title: "Favoriter" },
    { title: "Namn" },
    { title: "Plats" },
  ];
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

  const toStileTitle = function (title, index) {
    return {
      marginVertical: 5,
      ...typography.b1,
      color: colors.dark,
      fontStyle:
        title === "Skapa ny aktivitet" && index === 0 ? "italic" : "normal",
    };
  };

  function pressSelectionInsideDropDown(selection) {
    if (rout.name === "CreateActivity") {
      setOpenDropDown(false);
      setSortBy(selection);
    } else {
      console.log("No rout");
    }
  }

  const styleForDropDownInsideConrainer = {
    borderColor: openDropDown === true ? colors.dark : colors.background,

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,

    marginLeft: 19,

    paddingRight: 15,
    paddingLeft: 14,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: colors.background,
    overflow: "hidden",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressDropDawn} testID="dropDownPressed">
        <View style={styleForDropDownInsideConrainer}>
          <Text style={styles.sortText}>{sortBy}</Text>
          <Icon
            color={colors.secondary}
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
                  testID="insideDropDownPressed"
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
}

export default DropDownSmall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },

  sortText: {
    flex: 3,
    ...typography.b1,
    color: colors.dark,
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
    backgroundColor: colors.background,
    overflow: "hidden",
    borderColor: colors.background,
  },
});
