import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { subYears, format, toDate, parseISO } from "date-fns";
import { Icon, Dialog } from "@rneui/base";
import functions from "@react-native-firebase/functions";
import crashlytics from "@react-native-firebase/crashlytics";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

import Menu from "../components/Menu";
import DatePicker from "../components/DatePicker";
import OutsidePressHandler from "react-native-outside-press";

import Config from "react-native-config";
const project =
  Config.NODE_ENV === "prod"
    ? "do-good-get-good-2f6cc"
    : "dev-do-good-get-good";

const DownloadUserData = ({ navigation }) => {
  const date = new Date();
  const [exportType, setExportType] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [startDate, setStartDate] = useState(format(date, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(date, "yyyy-MM-dd"));
  const [downloadingData, setDownloadingData] = useState(false);
  const [excelDownloadURL, setExcelDownloadURL] = useState(null);

  const oneYearBack = format(subYears(date, 1), "yyyy-MM-dd");
  const today = format(date, "yyyy-MM-dd");
  const rollingYear = `${oneYearBack} - ${today}`;
  const downloadData = functions().httpsCallableFromUrl(
    `https://europe-north1-${project}.cloudfunctions.net/downloadDataSecondGen`,
  );

  const IsDatePeriodValid = () => {
    if (toDate(parseISO(endDate)) < toDate(parseISO(startDate))) {
      return false;
    }
    if (toDate(parseISO(endDate)) === toDate(parseISO(startDate))) {
      return true;
    }
    return true;
  };

  const exportData = () => {
    setExcelDownloadURL(null);
    let datePeriod;
    switch (exportType) {
      case "rolling-year": {
        datePeriod = {
          startDate: oneYearBack,
          endDate: today,
        };
        break;
      }
      case "date-period": {
        datePeriod = {
          startDate: startDate,
          endDate: endDate,
        };
        break;
      }
      case "all-data": {
        datePeriod = {
          startDate: "1970-01-01",
          endDate: today,
        };
      }
      default:
        break;
    }
    alertPopUp(datePeriod);
    setDownloadingData(true);
  };

  async function stayInAppAndExportData(datePeriod) {
    await downloadData(datePeriod)
      .then((res) => {
        if (res.data.downloadURL !== "") {
          setExcelDownloadURL(res.data.downloadURL);
        } else {
          Alert.alert("", `${res.data.message}`);
          setDownloadingData(false);
        }
      })
      .catch((error) => {
        crashlytics().log(error);
        setDownloadingData(false);
        Alert.alert(
          "Ett fel har inträffat!",
          `Vänligen försök igen eller kontakta supporten på dggg@technogarden.se\n${error.message}`,
        );
      });
  }

  function alertPopUp(datePeriod) {
    stayInAppAndExportData(datePeriod);

    // TODO: Right now it doesn't work to send data with email. Uncomment this part when the problem with email is solved

    // let alertTitle = "Exportera data";
    // let alertMessage =
    //   "Exporteringen av tidrapporteringsdata har påbörjats!\n" +
    //   "Du kan nu välja att vänta kvar eller fortsätta att använda appen.\n" +
    //   "När allt är klart får du ett mail.";

    // Alert.alert(alertTitle, alertMessage, [
    //   {
    //     text: "Vänta kvar",
    //     onPress: () => {
    //       stayInAppAndExportData(datePeriod);
    //     },
    //   },
    //   {
    //     text: "Gå till startsidan",
    //     onPress: () => {
    //       downloadData(datePeriod);
    //       navigation.navigate("HomePage");
    //     },
    //   },
    // ]);
  }

  function closeDropDown(value) {
    setOpenDropDown(false);
    setExportType(value);
    setDownloadingData(false);
    setExcelDownloadURL(null);
  }

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
                {exportType === null && "Välj typ av exportering"}
                {exportType === "all-data" && "All data"}
                {exportType === "date-period" && "Välj datum"}
                {exportType === "rolling-year" && "Löpande 12 månader"}
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
              <OutsidePressHandler
                onOutsidePress={() => setOpenDropDown(false)}
                style={styles.dropdownItemBackground}
              >
                <TouchableOpacity
                  onPress={() => closeDropDown("all-data")}
                  style={styles.dropdownItemStyle}
                >
                  <Text style={{ ...typography.button.sm }}>All data</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => closeDropDown("rolling-year")}
                  style={styles.dropdownItemStyle}
                >
                  <Text style={{ ...typography.button.sm }}>
                    Löpande 12 månader
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => closeDropDown("date-period")}
                  style={styles.dropdownItemStyle}
                >
                  <Text style={{ ...typography.button.sm }}>Välj datum</Text>
                </TouchableOpacity>
              </OutsidePressHandler>
            )}
          </View>
          {exportType === "date-period" && (
            <>
              <View style={styles.pickDateViewStyle}>
                <View>
                  <Text style={{ ...typography.b2 }}>Startdatum</Text>
                  <DatePicker date={startDate} setDate={setStartDate} />
                </View>
                <View>
                  <Text style={{ ...typography.b2 }}>Slutdatum</Text>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </View>
              </View>
              {IsDatePeriodValid() === false && (
                <Text
                  style={{
                    ...typography.b2,
                    marginTop: 8,
                    color: colors.error,
                  }}
                >
                  Slutdatum kan inte vara tidigare än startdatum!
                </Text>
              )}
            </>
          )}
          {exportType === "rolling-year" && (
            <View style={styles.continuousDateStyle}>
              <Text style={{ ...typography.b2 }}>
                Exportering av data kommer att ske mellan följade datum.
              </Text>
              <Text>{rollingYear}</Text>
            </View>
          )}
          {exportType === "all-data" && (
            <View style={styles.continuousDateStyle}>
              <Text style={{ ...typography.b2 }}>
                All data kommer att exporteras
              </Text>
            </View>
          )}
        </View>
        <View style={styles.downloadButtonWrapper}>
          {excelDownloadURL !== null && (
            <TouchableOpacity
              disabled={excelDownloadURL === null ? true : false}
              onPress={() => {
                Linking.openURL(excelDownloadURL);
              }}
              style={{ marginBottom: 6 }}
            >
              <View style={styles.downloadButton(exportType)}>
                <Text style={{ ...typography.button.lg }}>
                  Ladda ned excel-fil
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={
              exportType === null ||
              (exportType === "date-period" && IsDatePeriodValid() === false)
                ? true
                : false
            }
            onPress={() => exportData()}
          >
            <View
              style={[
                styles.downloadButton(exportType),
                {
                  backgroundColor:
                    exportType === null ||
                    (exportType === "date-period" &&
                      IsDatePeriodValid() === false)
                      ? colors.disabled
                      : colors.primary,
                },
              ]}
            >
              {downloadingData && excelDownloadURL === null ? (
                <Dialog.Loading
                  loadingProps={{
                    color: colors.secondary,
                    style: { padding: 0, margin: 0 },
                  }}
                />
              ) : (
                <Text style={{ ...typography.button.lg }}>Exportera data</Text>
              )}
            </View>
          </TouchableOpacity>
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
    flexDirection: "column",
    // alignItems: "center",
    marginHorizontal: 20,
  },
  downloadButtonWrapper: {
    width: "100%",
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  downloadButton: (exportType) => ({
    height: 50,
    backgroundColor: exportType !== null ? colors.primary : colors.disabled,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  }),
});
