import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import Menu from "../components/Menu";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { Icon } from "react-native-elements";

const DownloadUserData = () => {
  const [choseDate, setChoseDate] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <View style={styles.container}>
        <View style={styles.userChoiceWrapper}>
          <Text style={styles.headerText}>Exportera data</Text>
          <View style={{ marginBottom: 16 }}>
            <TouchableNativeFeedback
              onPress={() => setOpenDropDown(!openDropDown)}
            >
              <View style={styles.dropdownStyle(openDropDown)}>
                <Text style={{ ...typography.button.lg }}>
                  {choseDate === null && "Välj typ av nedladdning"}
                  {choseDate && choseDate != null && "Välj datum"}
                  {!choseDate && choseDate != null && "Löpande 12 månader"}
                </Text>
                <Icon
                  color={colors.dark}
                  name={
                    openDropDown === true ? "arrow-drop-up" : "arrow-drop-down"
                  }
                  size={30}
                />
              </View>
            </TouchableNativeFeedback>
            {openDropDown && (
              <View style={styles.dropdownItemBackground}>
                <TouchableNativeFeedback
                  onPress={() => {
                    setOpenDropDown(false);
                    setChoseDate(false);
                  }}
                >
                  <View style={styles.dropdownItemStyle}>
                    <Text style={{ ...typography.button.sm }}>
                      Löpande 12 månader
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    setOpenDropDown(false);
                    setChoseDate(true);
                  }}
                >
                  <View style={styles.dropdownItemStyle}>
                    <Text style={{ ...typography.button.sm }}>Välj datum</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            )}
          </View>

          {choseDate && (
            <View style={styles.pickDateViewStyle}>
              <View>
                <Text>Startdatum</Text>
                <TextInput style={styles.datePicker} />
              </View>
              <View>
                <Text>Startdatum</Text>
                <TextInput style={styles.datePicker} />
              </View>
            </View>
          )}
          {choseDate === false && (
            <View style={styles.continuousDateStyle}>
              <Text>Kommer att ladda ned data mellan följade datum</Text>
              <Text>2021-05-09 - 2022-05-09</Text>
            </View>
          )}
        </View>
        <View style={styles.downloadButtonWrapper}>
          <TouchableNativeFeedback disabled={choseDate === null ? true : false}>
            <View style={styles.downloadButton(choseDate)}>
              <Text style={{ ...typography.button.lg }}>Exportera data</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DownloadUserData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  userChoiceWrapper: {
    flex: 1,
    width: "100%",
    paddingTop: 16,
    alignItems: "center",
  },
  headerText: {
    alignSelf: "center",
    ...typography.title,
    marginBottom: 16,
  },
  dropdownStyle: (openDropDown) => ({
    flexDirection: "row",
    height: 50,
    backgroundColor: colors.background,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: openDropDown ? colors.dark : colors.background,
  }),
  dropdownItemBackground: {
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownItemStyle: {
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  pickDateViewStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  datePicker: {
    backgroundColor: colors.background,
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: 125,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  continuousDateStyle: {
    ...typography.b2,
    flexDirection: "column",
    alignItems: "center",
  },
  downloadButtonWrapper: {
    width: "100%",
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  downloadButton: (chooseDate) => ({
    height: 50,
    backgroundColor: chooseDate != null ? colors.primary : colors.disabled,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  }),
});
