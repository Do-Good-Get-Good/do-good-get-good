import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export function DropDownForSorting({ choice }) {
  const rout = useRoute();
  const [sortArrayForTimeEntries, setSortArrayForTimeEntries] = useState([
    { title: "Datum" },
    { title: "Godkänd" },
    { title: "Inte Godkänd" },
  ]);

  const [sortBy, setSortBy] = useState("Datum");
  const [openDropDown, setOpenDropDown] = useState(false);

  const pressDropDawn = () => {
    setOpenDropDown(true);
    if (openDropDown === true) {
      setOpenDropDown(false);
    }
  };

  function pressSelectionInsideDropDown(selection) {
    setOpenDropDown(false);
    setSortBy(selection);
    if (rout.name === "MyTimePage" || rout.name === "HomePage") {
      if (selection === "Godkänd") {
        choice(true);
      } else if (selection === "Inte Godkänd") {
        choice(false);
      } else {
        choice(null);
      }
    }
  }

  const styleForDropDownInsideConrainer = {
    borderColor: openDropDown === true ? colors.dark : colors.background,

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    ...typography.b1,
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
          ? sortArrayForTimeEntries.map((sort, index) => (
              <View index={index} key={index} style={styles.insideSortBox}>
                <TouchableOpacity
                  testID="insideDropDownPressed"
                  onPress={() => {
                    pressSelectionInsideDropDown(sort.title);
                  }}
                >
                  {/* <Text style={toStileTitle(sort.title, index)}> */}
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
    // flex: 1,
    overflow: "hidden",
  },

  sortText: {
    // flex: 3,
    ...typography.b1,
    color: colors.dark,
    paddingVertical: 7,
  },
  sortIcon: {
    paddingTop: 5,
  },
  insideSortBox: {
    /// flex: 1,
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
