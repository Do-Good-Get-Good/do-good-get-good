const { autoWidth } = require("./utilities/worksheetUtilities");
const { months, filterTimeEntries } = require("./utilities/dataUtilities");

function groupByYear(arr) {
  return arr.reduce((prev, current) => {
    let currentYear = new Date(current["date"].toDate()).getFullYear();

    if (!prev[currentYear]) {
      prev[currentYear] = [];
    }
    prev[currentYear].push(current);
    return prev;
  }, {});
}

function perYearView(worksheet, activities, users, timeEntries) {
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
    worksheet.columns = [
      {
        header: "Meddelande",
        key: "msg",
        width: 10,
        style: {
          font: {
            bold: true,
          },
        },
      },
    ];
    worksheet.addRow({
      msg: "Finns inga godkända tidregistreringar för det valda tidsspannet!",
    });
  } else {
    // Filter out inactive activities
    let activeActivities = activities.filter((activity) => {
      if (activity.active_status === true) return activity;
    });

    // Sort array by month
    confirmedTimeEntries.sort((a, b) => {
      a.year !== b.year
        ? a.year - b.year
        : months.long.indexOf(a.month) - months.long.indexOf(b.month);
    });

    let timeEntriesSortedByYear = groupByYear(confirmedTimeEntries);

    perYearView(worksheet, activeActivities, users, timeEntriesSortedByYear);
  }
}
function makeHeaderBold(worksheet) {
  worksheet.getCell("A1").font = { bold: true };
  worksheet.getCell("B1").font = { bold: true };
  worksheet.getCell("C1").font = { bold: true };
  worksheet.getCell("D1").font = { bold: true };
  worksheet.getCell("E1").font = { bold: true };
  worksheet.getCell("F1").font = { bold: true };
  worksheet.getCell("G1").font = { bold: true };
  worksheet.getCell("H1").font = { bold: true };
  worksheet.getCell("I1").font = { bold: true };
  worksheet.getCell("J1").font = { bold: true };
  worksheet.getCell("K1").font = { bold: true };
  worksheet.getCell("L1").font = { bold: true };
  worksheet.getCell("M1").font = { bold: true };
}

exports.createWorksheet = (workbook, excelData) => {
  const worksheet = workbook.addWorksheet("Personer per aktivitet");
  populateExcelSheetWithActivityData(worksheet, excelData);
  makeHeaderBold(worksheet);
  autoWidth(worksheet, 8);
};
