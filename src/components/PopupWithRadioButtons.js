import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { ScrollView } from "react-native-gesture-handler";

export function PopupWithRadioButtons({ titleText, arrayList }) {
  console.log("arrayList    ", arrayList);
  const [radioButtonPressed, setRadioButtonPressed] = useState(false);
  return (
    <ScrollView>
      <Text style={styles.textTitle}>{titleText}</Text>
      <View style={{ backgroundColor: colors.background }}>
        {arrayList.map((user, index) => (
          <View style={styles.containerTextAndRadioButtins} key={user.doc_id}>
            <Text>{user.first_name + " " + user.last_name}</Text>
            <TouchableOpacity
              onPress={"nejRadioButtonsPress"}
              style={styles.radioButtons}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  backgroundColor:
                    radioButtonPressed === true
                      ? colors.primary
                      : colors.background,
                  borderColor: colors.dark,
                  borderWidth: 1,
                }}
              >
                {radioButtonPressed === true ? (
                  <View style={styles.smallCircul}></View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default PopupWithRadioButtons;
const styles = StyleSheet.create({
  containerTextAndRadioButtins: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 22,
    color: colors.background,
  },
  textTitle: {
    ...typography.title,
    margin: 12,
  },
  smallCircul: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    margin: 4,
    backgroundColor: colors.dark,
  },
});
