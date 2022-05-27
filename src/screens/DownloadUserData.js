import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { subYears, format } from "date-fns";
import { Icon, Dialog } from "react-native-elements";
import functions from "@react-native-firebase/functions";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

import Menu from "../components/Menu";
import DatePicker from "../components/DatePicker";

const DownloadUserData = () => {
  const date = new Date();
  const [choseDate, setChoseDate] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [startDate, setStartDate] = useState(format(date, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(date, "yyyy-MM-dd"));
  const [dataDownloaded, setDataDownloaded] = useState(false);
  const [excelDownloadURL, setExcelDownloadURL] = useState(null);

  const oneYearBack = format(subYears(date, 1), "yyyy-MM-dd");
  const today = format(date, "yyyy-MM-dd");
  const rollingYear = `${oneYearBack} - ${today}`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <View style={styles.container}>
        <View style={styles.userChoiceWrapper}>
          <Text style={styles.headerText}>Exportera data</Text>
          <View style={{ marginBottom: 16, minWidth: 200, zIndex: 1 }}>
            <TouchableOpacity
              onPress={() => setOpenDropDown(!openDropDown)}
              style={styles.dropdownStyle(openDropDown)}
            >
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
            </TouchableOpacity>
            {openDropDown && (
              <View style={styles.dropdownItemBackground}>
                <TouchableOpacity
                  onPress={() => {
                    setOpenDropDown(false);
                    setChoseDate(false);
                  }}
                  style={styles.dropdownItemStyle}
                >
                  <Text style={{ ...typography.button.sm }}>
                    Löpande 12 månader
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOpenDropDown(false);
                    setChoseDate(true);
                  }}
                  style={styles.dropdownItemStyle}
                >
                  <Text style={{ ...typography.button.sm }}>Välj datum</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {choseDate && (
            <View style={styles.pickDateViewStyle}>
              <View>
                <Text>Startdatum</Text>
                <DatePicker date={startDate} setDate={setStartDate} />
              </View>
              <View>
                <Text>Slutdatum</Text>
                <DatePicker date={endDate} setDate={setEndDate} />
              </View>
            </View>
          )}
          {choseDate === false && (
            <View style={styles.continuousDateStyle}>
              <Text>Kommer att ladda ned data mellan följade datum</Text>
              <Text>{rollingYear}</Text>
            </View>
          )}
        </View>
        <View style={styles.downloadButtonWrapper}>
          {!dataDownloaded && (
            <TouchableOpacity
              disabled={choseDate === null ? true : false}
              onPress={async () => {
                setDataDownloaded(true);
                let downloadData = functions().httpsCallable("downloadData");
                await downloadData().then((res) => {
                  setExcelDownloadURL(res.data.excel[0]);
                });
              }}
            >
              <View style={styles.downloadButton(choseDate)}>
                <Text style={{ ...typography.button.lg }}>Exportera data</Text>
              </View>
            </TouchableOpacity>
          )}
          {dataDownloaded && (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(excelDownloadURL);
              }}
            >
              <View style={styles.downloadButton(choseDate)}>
                {excelDownloadURL === null ? (
                  <Dialog.Loading
                    loadingProps={{
                      color: colors.secondary,
                      style: { padding: 0, margin: 0 },
                    }}
                  />
                ) : (
                  <Text style={{ ...typography.button.lg }}>
                    Ladda ned excel-fil
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
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
  }),
  dropdownItemBackground: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  dropdownItemStyle: {
    paddingVertical: 10,
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
