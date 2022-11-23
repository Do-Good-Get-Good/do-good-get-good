const {
  autoWidth,
  printNoDataFound,
  makeRowTextBold,
} = require("./utilities/worksheetUtilities");
const {
  months,
  filterTimeEntries,
  sortArrayByDate,
} = require("./utilities/dataUtilities");

function groupTimeEntriesByYear(arr) {
  return arr.reduce((prev, current) => {
    let currentYear = new Date(current["date"].toDate()).getFullYear();

    if (!prev[currentYear]) {
      prev[currentYear] = [];
    }
    prev[currentYear].push(current);
    return prev;
  }, {});
}

function perYearExcelView(worksheet, activities, users, timeEntries) {
  let yearArr = Object.keys(timeEntries);
  yearArr.map((year, index) => {
    if (index === 0) {
      const columns = [
        { header: `Aktivitet - ${yearArr[index]}`, key: "activity" },
      ];

      months.long.map((month) => {
        const column = {
          header: month,
          key: month,
        };
        columns.push(column);
      });

      worksheet.columns = columns;
      makeRowTextBold(worksheet, 1);
    } else {
      worksheet.addRow();
      worksheet.addRow();
      const row = { activity: `Aktivitet - ${yearArr[index]}` };
      months.long.map((month) => {
        row[month] = month;
      });
      worksheet.addRow(row).font = { bold: true };
    }

    activities.map((activity) => {
      let wsObj = {};

      months.long.map((month) => {
        wsObj[month] = 0;
      });

      users.map((user) => {
        let prevMonth = "";
        timeEntries[year].map((timeEntry) => {
          if (user.id === timeEntry.user_id) {
            if (activity.id === timeEntry.activity_id) {
              const date = timeEntry.date.toDate();
              const month = months.long[date.getMonth()];

              if (prevMonth === month) return;
              prevMonth = month;

              if (timeEntry.status_confirmed) {
                wsObj[month]++;
              }
            }
          }
        });
      });
      const wsRow = {
        activity: activity.activity_title,
        ...wsObj,
      };
      worksheet.addRow(wsRow);
    });
  });
}

function populateExcelSheetWithActivityData(worksheet, excelData) {
  let { activities, timeEntries, users } = excelData;

  let confirmedTimeEntries = filterTimeEntries(timeEntries, true);

  if (confirmedTimeEntries.length === 0) {
    printNoDataFound(
      "Finns inga godkända tidregistreringar för det valda tidsspannet!",
      worksheet
    );
  } else {
    let activeActivities = activities.filter((activity) => {
      if (activity.active_status === true) return activity;
    });

    sortArrayByDate(confirmedTimeEntries, "long");

    let timeEntryArr = groupTimeEntriesByYear(confirmedTimeEntries);

    perYearExcelView(worksheet, activeActivities, users, timeEntryArr);
  }
}

exports.createWorksheet = (workbook, excelData) => {
  const worksheet = workbook.addWorksheet("Personer per aktivitet");
  populateExcelSheetWithActivityData(worksheet, excelData);
  autoWidth(worksheet, 8);
};
