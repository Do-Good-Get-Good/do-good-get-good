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
import { Icon, Dialog } from "react-native-elements";
import functions from "@react-native-firebase/functions";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

import Menu from "../components/Menu";
import DatePicker from "../components/DatePicker";

const DownloadUserData = ({ navigation }) => {
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
    alertPopUp();
    let datePeriod;
    if (!choseDate) {
      datePeriod = {
        startDate: new Date(oneYearBack),
        endDate: new Date(today),
      };
    } else {
      datePeriod = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };
    }

    console.log(datePeriod);

    setDataDownloaded(true);
    let downloadData = functions().httpsCallable("downloadData");
    downloadData(datePeriod).then((res) => {
      console.log(res.data.downloadURL);
      setExcelDownloadURL(res.data.downloadURL);
    });
  };

  function alertPopUp() {
    let alertTitle = "Exportera data";
    let alertMessage =
      "Exporteringen av tidrapporteringsdata har påbörjats!\n" +
      "Du kan nu välja att vänta kvar eller fortsätta att använda appen.\n" +
      "När allt är klart får du ett mail.";

    Alert.alert(alertTitle, alertMessage, [
      { text: "Vänta kvar" },
      {
        text: "Gå till startsidan",
        onPress: () => navigation.navigate("HomePage"),
      },
    ]);
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
          {choseDate === false && (
            <View style={styles.continuousDateStyle}>
              <Text style={{ ...typography.b2 }}>
                Kommer att ladda ned data mellan följade datum
              </Text>
              <Text>{rollingYear}</Text>
            </View>
          )}
        </View>
        <View style={styles.downloadButtonWrapper}>
          {!dataDownloaded && (
            <TouchableOpacity
              disabled={
                choseDate === null ||
                (choseDate == true && IsDatePeriodValid() === false)
                  ? true
                  : false
              }
              onPress={() => exportData()}
            >
              <View
                style={[
                  styles.downloadButton(choseDate),
                  {
                    backgroundColor:
                      choseDate === null ||
                      (choseDate == true && IsDatePeriodValid() === false)
                        ? colors.disabled
                        : colors.primary,
                  },
                ]}
              >
                <Text style={{ ...typography.button.lg }}>Exportera data</Text>
              </View>
            </TouchableOpacity>
          )}
          {dataDownloaded && (
            <TouchableOpacity
              disabled={excelDownloadURL === null ? true : false}
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
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 16,
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
