import { useState } from "react";
import { ExportData } from "./utility";
import { AlertQuestion } from "../../components/AlertQuestion ";
import { Alert } from "react-native";
import { format, subYears } from "date-fns";
import { crashlytics } from "firebase-functions/v2/alerts";

const downloadData = functions().httpsCallable("downloadData");

export const useExportData = () => {
  const date = new Date();
  const [downloadingData, setDownloadingData] = useState(false);
  const [excelDownloadURL, setExcelDownloadURL] = useState(null);
  const [exportType, setExportType] = useState<ExportData | undefined>(
    undefined,
  );

  const oneYearBack = format(subYears(date, 1), "yyyy-MM-dd");
  const today = format(date, "yyyy-MM-dd");
  const rollingYear = `${oneYearBack} - ${today}`;
  const [startDate, setStartDate] = useState(format(date, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(date, "yyyy-MM-dd"));

  function stayInAppAndExportData(datePeriod) {
    downloadData(datePeriod)
      .then((res) => {
        console.log(res.data.downloadURL);
        setExcelDownloadURL(res.data.downloadURL);
      })
      .catch((error) => {
        crashlytics().log(error);
        setDownloadingData(false);
        //   Alert.alert(
        //     'Ett fel har inträffat!',
        //     `Vänligen försök igen eller kontakta supporten på dggg@technogarden.se\n${error.message}`,
        //   );
      });
  }

  function alertPopUp(datePeriod) {
    console.log(datePeriod);

    let alertTitle = "Exportera data";
    let alertMessage =
      "Exporteringen av tidrapporteringsdata har påbörjats!\n" +
      "Du kan nu välja att vänta kvar eller fortsätta att använda appen.\n" +
      "När allt är klart får du ett mail.";

    Alert.alert(alertTitle, alertMessage, [
      {
        text: "Vänta kvar",
        onPress: () => {
          stayInAppAndExportData(datePeriod);
        },
      },
      {
        text: "Gå till startsidan",
        onPress: () => {
          downloadData(datePeriod);
          navigation.navigate("HomePage");
        },
      },
    ]);
  }

  const exportData = () => {
    setExcelDownloadURL(null);
    let datePeriod;
    switch (exportType) {
      case ExportData.rollingYear: {
        datePeriod = {
          startDate: oneYearBack,
          endDate: today,
        };
        break;
      }
      case ExportData.datePeriod: {
        datePeriod = {
          startDate: startDate,
          endDate: endDate,
        };
        break;
      }
      case ExportData.allData: {
        datePeriod = {
          startDate: "1970-01-01",
          endDate: today,
        };
      }
      default:
        break;
    }

    setDownloadingData(true);
  };
  return { exportType, setExportType };
};
