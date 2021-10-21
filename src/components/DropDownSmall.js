import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";

export const DropDownSmall = ({}) => {
  const [sortBy, setSortBy] = useState("Datum");
  const [sortArray, setSortArray] = useState(["Favoriter", "Namn", "Plats"]);
  const [openDropDown, setOpenDropDown] = useState(false);

  const pressDropDawn = () => {
    openDropDown === true ? setOpenDropDown(false) : setOpenDropDown(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressDropDawn}>
        <View style={styles.containerInside}>
          <Text style={styles.sortText}>{sortBy}</Text>
          <Icon
            color="#5B6770"
            style={styles.sortIcon}
            name="arrow-drop-down"
            size={30}
          />
        </View>
      </TouchableOpacity>
      <View>
        {openDropDown === true
          ? sortArray.map((sort, index) => (
              <View index={index} key={index} style={styles.insideSortBox}>
                <TouchableOpacity>
                  <Text style={styles.textInsideSortBox}>{sort}</Text>
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
  },
  containerInside: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    marginLeft: 19,

    paddingRight: 15,
    paddingLeft: 14,
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: "white",
    overflow: "hidden",
    borderColor: "white",
  },
  sortText: {
    flex: 3,
    fontSize: 18,

    paddingVertical: 10,
  },
  sortIcon: {
    paddingTop: 5,
  },
  insideSortBox: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 19,
    // paddingVertical: 10,
    paddingRight: 15,
    paddingLeft: 14,
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: "white",
    overflow: "hidden",
    borderColor: "white",
  },
  textInsideSortBox: {
    marginVertical: 5,
    fontSize: 18,
  },
});

//  <Icon
//         color="#5B6770"
//         style={styles.sortIcon}
//         name="arrow-drop-up"
//         size={25}
//       />
