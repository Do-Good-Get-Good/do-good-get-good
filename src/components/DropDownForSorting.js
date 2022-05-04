import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { useIsFocused } from "@react-navigation/native";

export function DropDownForSorting({ choice }) {
  const rout = useRoute();
  const sortArrayForTimeEntries = [
    { title: "Datum" },
    { title: "Godkänd" },
    { title: "Inte Godkänd" },
  ];
  const sortArrayForAdminGallery = [
    { title: "Datum" },
    { title: "Favoriter" },
    { title: "Namn" },
    { title: "Plats" },
  ];

  const [showSelection, setShowSelection] = useState([]);

  const [sortBy, setSortBy] = useState("Datum");
  const [openDropDown, setOpenDropDown] = useState(false);
  const isFocused = useIsFocused();

  const pressDropDawn = () => {
    setOpenDropDown(true);
    if (openDropDown === true) {
      setOpenDropDown(false);
    }
  };

  function pressSelectionInsideDropDown(selection) {
    setOpenDropDown(false);
    setSortBy(selection);
    if (rout.name === "MyTimePage") {
      if (selection === "Godkänd") {
        choice(true);
      } else if (selection === "Inte Godkänd") {
        choice(false);
      } else {
        choice(null);
      }
    } else if (rout.name === "AdminActivityGallery") {
      if (selection === "Favoriter" || "Namn" || "Plats") {
        choice(selection);
      } else {
        choice(null);
      }
    }
  }

  useEffect(() => {
    if (rout.name === "MyTimePage") {
      setShowSelection(sortArrayForTimeEntries);
    } else if (rout.name === "AdminActivityGallery") {
      setShowSelection(sortArrayForAdminGallery);
    }
  }, [rout.name, isFocused]);

  useEffect(() => {
    setSortBy("Datum");
    choice(null);
  }, [rout.name, isFocused]);

  const styleForDropDownInsideConrainer = {
    borderColor: openDropDown === true ? colors.dark : colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    ...typography.b1,
    marginLeft: 19,
    paddingRight: 14,
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
          ? showSelection.map((sort, index) => (
              <View index={index} key={index} style={styles.insideSortBox}>
                <TouchableOpacity
                  testID="insideDropDownPressed"
                  onPress={() => {
                    pressSelectionInsideDropDown(sort.title);
                  }}
                >
                  <Text>{sort.title}</Text>
                </TouchableOpacity>
              </View>
            ))
          : null}
      </View>
    </View>
  );
}

export default DropDownForSorting;
const styles = StyleSheet.create({
  container: {
    ...typography.b1,

    overflow: "hidden",
  },

  sortText: {
    ...typography.b1,
    color: colors.dark,
    paddingVertical: 7,
  },
  sortIcon: {
    paddingTop: 5,
  },
  insideSortBox: {
    justifyContent: "space-between",
    marginLeft: 19,
    paddingVertical: 5,

    paddingRight: 15,
    paddingLeft: 14,
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: colors.background,
    overflow: "hidden",

    borderColor: colors.background,
  },
});
