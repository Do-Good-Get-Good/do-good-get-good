const {
  filterTimeEntries,
  autoWidth,
  sortArray,
} = require("./helpers/functions");
const { months } = require("./helpers/data");

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
        : months.indexOf(a.month) - months.indexOf(b.month);
    });

    const columns = [{ header: "Aktivitet", key: "activity" }];

    months.map((month) => {
      const column = {
        header: month,
        key: month,
      };
      columns.push(column);
    });

    worksheet.columns = columns;

    activeActivities.map((activity, index) => {
      let wsObj = {};
      months.map((month) => {
        wsObj[month] = 0;
      });

      users.map((user) => {
        let prevMonth = "";

        confirmedTimeEntries.map((timeEntry) => {
          const date = timeEntry.date.toDate();
          const month = months[date.getMonth()];

          if (prevMonth !== month) {
            prevMonth = month;

            if (activity.id === timeEntry.activity_id) {
              if (user.id === timeEntry.user_id) {
                if (timeEntry.status_confirmed) {
                  wsObj[month] = wsObj[month] + 1;
                }
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
  const worksheet = workbook.addWorksheet("Aktivitet");
  populateExcelSheetWithActivityData(worksheet, excelData);
  makeHeaderBold(worksheet);
  autoWidth(worksheet, 8);
};
