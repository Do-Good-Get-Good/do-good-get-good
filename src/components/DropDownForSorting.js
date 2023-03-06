import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "@rneui/base";
import { useRoute } from "@react-navigation/native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { useIsFocused } from "@react-navigation/native";

export function DropDownForSorting({ choice }) {
  const rout = useRoute();
  const sortArrayForTimeEntries = [
    { title: "Datum" },
    { title: "Godkända" },
    { title: "Inte godkända" },
  ];
  const sortArrayForAdminGallery = [
    { title: "Favoriter" },
    { title: "Namn" },
    { title: "Plats" },
  ];

  const [showSelection, setShowSelection] = useState([]);

  const [sortBy, setSortBy] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const isFocused = useIsFocused();

  const pressDropDawn = () => {
    setOpenDropDown(!openDropDown);
  };

  function pressSelectionInsideDropDown(selection) {
    setOpenDropDown(false);
    setSortBy(selection);
    if (rout.name === "MyTimePage") {
      choice(selection);
    } else if (rout.name === "AdminActivityGallery") {
      if (selection === "Favoriter" || "Namn" || "Plats") {
        choice(selection);
      }
    }
  }

  useEffect(() => {
    if (rout.name === "MyTimePage") {
      setShowSelection(sortArrayForTimeEntries);
      setSortBy("Datum");
      choice(null);
    } else if (rout.name === "AdminActivityGallery") {
      setShowSelection(sortArrayForAdminGallery);
      setSortBy("Name");
      choice(null);
    } else {
      setOpenDropDown(false);
      choice(null);
    }
  }, [rout.name, isFocused]);

  const styleForDropDownInsideConrainer = {
    borderWidth: 1,
    borderColor: openDropDown ? colors.dark : colors.background,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 14,
    ...typography.b1,
    borderRadius: 3,
    backgroundColor: colors.background,
    overflow: "hidden",
    alignItems: "center",
  };

  return (
    <View>
      <TouchableOpacity onPress={pressDropDawn} testID="dropDownPressed">
        <View style={styleForDropDownInsideConrainer}>
          <Text testID="sortByText" style={styles.sortText}>
            {sortBy}
          </Text>
          <Icon
            color={colors.secondary}
            style={styles.sortIcon}
            name={openDropDown === true ? "arrow-drop-up" : "arrow-drop-down"}
            size={30}
          />
        </View>
      </TouchableOpacity>
      {openDropDown === true && (
        <View style={styles.sortBox}>
          {showSelection.map((sort, index) => (
            <TouchableOpacity
              index={index}
              key={index}
              style={styles.insideSortBox}
              testID={`dropdownItem${index}`}
              onPress={() => {
                pressSelectionInsideDropDown(sort.title);
              }}
            >
              <Text>{sort.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default DropDownForSorting;
const styles = StyleSheet.create({
  sortText: {
    ...typography.b1,
    color: colors.dark,
    paddingVertical: 7,
  },
  sortBox: {
    position: "absolute",
    top: 45,
    right: 0,
    left: 0,
    backgroundColor: colors.background,
    ...Platform.select({
      ios: {
        shadowOffset: {
          hight: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  insideSortBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    overflow: "hidden",
    elevation: 3,
  },
});
