import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { CheckBox, ListItem } from "react-native-elements";

const ConfirmActivities = () => {
  const [checkAll, setCheckAll] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Att godkänna</Text>
        <CheckBox
          title="Markera alla"
          iconRight
          containerStyle={styles.checkBoxStyle}
          checked={checkAll}
          checkedColor="#84BD00"
          onPress={() => setCheckAll(!checkAll)}
          textStyle={styles.headerTextSmall}
        />
      </View>
      <View style={styles.content}>
        <ListItem.Accordion
          containerStyle={styles.listItemContainerStyle}
          content={
            <>
              <View style={styles.listItemStyle}>
                <Text style={styles.listItemNameStyle}>Lisa Lisasson</Text>
                <Text style={styles.listItemDateStyle}>2021-10-17</Text>
                <Text style={styles.listItemHourStyle}>1.5h</Text>
                <CheckBox
                  iconRight
                  containerStyle={styles.listItemCheckBoxStyle}
                  checked={checkAll}
                  checkedColor="#84BD00"
                  onPress={() => setCheckAll(!checkAll)}
                />
              </View>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <View style={styles.listItemContentStyle}>
            <Text style={styles.listItemContentNameStyle}>Blodgivning</Text>
            <Text style={styles.listItemContentDateStyle}>2021-10-17</Text>
            <Text style={styles.listItemContentHourStyle}>1.5h</Text>
          </View>
        </ListItem.Accordion>
      </View>
      <TouchableNativeFeedback
        onPress={() => {
          // Code to run when pressed
        }}
        disabled={checkAll ? false : true}
      >
        <View
          style={
            checkAll
              ? styles.confirmButton
              : [styles.confirmButton, { backgroundColor: "#B7B7B7" }]
          }
        >
          <Text
            style={
              checkAll
                ? styles.confirmButtonText
                : [styles.confirmButtonText, { opacity: 0.4 }]
            }
          >
            Godkänn
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ConfirmActivities;

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 6,
  },
  headerText: {
    fontSize: 22,
  },
  headerTextSmall: {
    fontWeight: "400",
  },
  checkBoxStyle: {
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 10,
    right: -15,
    backgroundColor: "#F5F5F5",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  listItemContainerStyle: {
    padding: 0,
  },
  listItemStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    margin: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemNameStyle: {
    fontWeight: "bold",
  },
  listItemDateStyle: {},
  listItemHourStyle: {},
  listItemCheckBoxStyle: {
    padding: 0,
  },
  listItemContentStyle: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  listItemContentNameStyle: { fontWeight: "bold" },
  listItemContentDateStyle: {},
  listItemContentHourStyle: {},
  confirmButton: {
    paddingVertical: 12,
    backgroundColor: "#84BD00",
    borderRadius: 5,
  },
  confirmButtonText: {
    alignSelf: "center",
    fontSize: 20,
  },
});
